// Cart.js
import CartItem from './carrinhoItem';
import { IProdutoInterface } from '../../interfaces/Produto';

interface CartProps {
  cart: IProdutoInterface[];
  onRemoveFromCart: (product: IProdutoInterface) => void;
}

export default function Cart({ cart, onRemoveFromCart }: CartProps) {
  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {cart.map((product) => (
        <CartItem key={product.id} product={product} onRemove={() => onRemoveFromCart(product)} />
      ))}
    </div>
  );
}
