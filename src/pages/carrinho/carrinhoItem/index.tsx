
import { IProdutoInterface } from '../../../types/Produto';

interface CartItemProps {
  product: IProdutoInterface;
  onRemove: () => void;
}

export default function CartItem({ product, onRemove }: CartItemProps) {
  return (
    <div>
      <h3>{product.nome}</h3>
      <p>Preço: R$ {product.preco}</p>
      <button onClick={onRemove}>Remover do Carrinho</button>
    </div>
  );
}
