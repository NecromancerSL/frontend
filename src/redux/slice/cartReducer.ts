import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

interface cartState {
  cartItems: ProductWithAmount[];
  total: number;
  quantity: number;
}

// Defina um novo tipo que inclua a propriedade 'amount'
export interface ProductWithAmount extends Product {
  amount: number;
}

const initialState: cartState = {
  cartItems: [],
  total: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.quantity = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const removedItem = state.cartItems.find((item) => item.id === itemId);
      if (removedItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        state.total -= removedItem.preco * removedItem.amount;
        state.quantity -= removedItem.amount;
      }
    },
    calculateTotal: (state) => {
      let quantity = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        quantity += item.amount;
        total += item.preco * item.amount;
      });
      state.quantity = quantity;
      state.total = total;
    },
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.amount++;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
      state.quantity++;
      state.total += action.payload.preco;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cartItems.find((item) => item.id === action.payload);
      if (itemInCart) {
        // Verifique se a quantidade no carrinho é menor do que a quantidade em estoque
        if (itemInCart.amount < itemInCart.qntEstoque) {
          itemInCart.amount++;
          state.quantity++;
          state.total += itemInCart.preco;
        }
      }
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cartItems.find((item) => item.id === action.payload);
      if (itemInCart) {
        if (itemInCart.amount > 1) {
          itemInCart.amount--;
          state.quantity--;
          state.total -= itemInCart.preco;
        } else {
          // Remova o item se a quantidade for 1
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
          state.quantity--;
          state.total -= itemInCart.preco;
        }
      }
    },
  },
});

export const {
  addToCart,
  calculateTotal,
  clearCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
