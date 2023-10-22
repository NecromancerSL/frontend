import { createContext, useReducer, ReactNode } from 'react';
import { IProdutoInterface } from '../types/Produto';

interface ICartContext {
  cart: IProdutoInterface[];
  addToCart: (product: IProdutoInterface) => void;
  removeFromCart: (productId: number) => void;
}

export const CartContext = createContext<ICartContext | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: IProdutoInterface }
  | { type: 'REMOVE_FROM_CART'; payload: number };

const cartReducer = (state: IProdutoInterface[], action: CartAction): IProdutoInterface[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);
    // Outras ações do carrinho podem ser adicionadas aqui
    default:
      return state;
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: IProdutoInterface) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
