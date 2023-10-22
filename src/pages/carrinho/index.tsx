import { Typography } from '@mui/material';
import { useCart } from '../../hooks/useCartContext';
import { IProdutoInterface } from '../../types/Produto';

function CartPage() {
  const { cart } = useCart();

  return (
    <div>
      <Typography variant="h5">Seu Carrinho de Compras</Typography>
      {cart.length === 0 ? (
        <Typography>Seu carrinho está vazio.</Typography>
      ) : (
        <ul>
          {cart.map((product: IProdutoInterface) => ( // Adicione a tipagem aqui
            <li key={product.id}>
              {product.nome} - Quantidade: {product.qntEstoque}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;