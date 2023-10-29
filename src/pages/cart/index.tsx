
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  ProductWithAmount,
} from '../../redux/slice/cartReducer';

import { Button, List, ListItem, ListItemText, Typography, Card, CardContent, CardActions } from '@mui/material';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrementQuantity = (item: ProductWithAmount) => {
    if (item.amount < item.qntEstoque) {
      dispatch(incrementQuantity(item.id));
    } else {
      alert('A quantidade em estoque foi excedida.');
    }
  };

  const handleDecrementQuantity = (itemId: number) => {
    dispatch(decrementQuantity(itemId));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <Card>
              <CardContent>
                <ListItemText
                  primary={`${item.nome} - Quantity: ${item.amount} - Price: R$ ${item.preco.toFixed(2)}`}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDecrementQuantity(item.id)}
                >
                  -
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleIncrementQuantity(item)}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Resumo do Pedido
          </Typography>
          <Typography variant="body1">Total: R$ {total.toFixed(2)}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            // Adicione a função para finalizar o pedido
          >
            Finalizar Pedido
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
