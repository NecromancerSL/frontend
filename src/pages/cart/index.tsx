import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  ProductWithAmount,
} from '../../redux/slice/cartReducer';
import api from '../../services/api';

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  CardActions,
  Modal,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('dinheiro');
  const [selectedDelivery, setSelectedDelivery] = useState('retirada');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrementQuantity = (item: ProductWithAmount) => {
    if (item.amount < item.qntEstoque) {
      dispatch(incrementQuantity(item.id));
    } else {
      console.error('A quantidade em estoque foi excedida.');
      alert('A quantidade em estoque foi excedida.');
    }
  };

  const handleDecrementQuantity = (itemId: number) => {
    dispatch(decrementQuantity(itemId));
  };

  const finalizarCompra = async () => {
    const pedido = {
      formaPagamento: selectedPayment,
      formaEntrega: selectedDelivery,
      // Outros dados do pedido, se necessário
    };

    console.log('Dados do pedido:', pedido);

    const itensPedido = cartItems.map((item) => ({
      produtoId: item.id,
      qntProduto: item.amount,
    }));

    console.log('Itens do pedido:', itensPedido);

    try {
      console.log('Enviando solicitação para criar pedido...');
      const response = await api.post('/criarpedido', {
        usuarioId: 1, // Substitua pelo ID do usuário que está fazendo o pedido
        produtos: itensPedido,
      });

      console.log('Resposta da API:', response.data);
      console.log('Pedido criado com sucesso!');

      closeModal();
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
    }
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
            onClick={openModal}
          >
            Finalizar Pedido
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
      >
        <div className="modal-content">
          <Typography variant="h5" gutterBottom>
            Escolha a forma de pagamento e entrega
          </Typography>
          <FormControl component="fieldset">
            <Typography variant="h6">Forma de pagamento:</Typography>
            <RadioGroup
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              <FormControlLabel value="dinheiro" control={<Radio />} label="Dinheiro" />
              <FormControlLabel value="cartao" control={<Radio />} label="Cartão" />
              <FormControlLabel value="pix" control={<Radio />} label="PIX" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <Typography variant="h6">Forma de entrega:</Typography>
            <RadioGroup
              value={selectedDelivery}
              onChange={(e) => setSelectedDelivery(e.target.value)}
            >
              <FormControlLabel value="retirada" control={<Radio />} label="Retirada na loja" />
              <FormControlLabel value="vendedor" control={<Radio />} label="Combinação com o vendedor" />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={finalizarCompra}
          >
            Finalizar Compra
          </Button>
        </div>
      </Modal>
    </div>
  );
}