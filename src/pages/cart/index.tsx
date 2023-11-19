import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import api from '../../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  removeItem,
  clearCart,
  ProductWithAmount,
  incrementQuantity,
  decrementQuantity,
} from '../../redux/slice/cartReducer';
import {
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  ListItemText,
  IconButton,
  CardActions,
  Button,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from '@mui/material';
import Cookies from 'js-cookie';

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '20px',
};

const iconStyle: React.CSSProperties = {
  color: 'red',
  cursor: 'pointer',
  fontSize: 24,
};

const cartContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const cartItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid #e0e0e0',
  padding: '10px',
  borderRadius: '5px',
};

const itemInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const totalPriceStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 'bold',
};

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('dinheiro');
  const [selectedDelivery, setSelectedDelivery] = useState('retirada');
  const [isOrderSuccessAlertOpen, setIsOrderSuccessAlertOpen] = useState(false);

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
      nomeUsuario: Cookies.get('userName'),
    };

    const itensPedido = cartItems.map((item) => ({
      produtoId: item.id,
      qntProduto: item.amount,
    }));

    try {
      console.log('Enviando solicitação para criar pedido...');
      const response = await api.post('/criarpedido', {
        usuarioId: 1,
        produtos: itensPedido,
        formaPagamento: pedido.formaPagamento,
        formaEntrega: pedido.formaEntrega,
        nomeUsuario: pedido.nomeUsuario,
      });

      console.log('Resposta da API:', response.data);
      console.log('Pedido criado com sucesso!');

      closeModal();
      setIsOrderSuccessAlertOpen(true);

      dispatch(clearCart());
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.amount, 0);

  useEffect(() => {
    Cookies.set('nomeUsuario', 'SeuNomeDeUsuarioAqui');
  }, []);

  return (
    <div style={cartContainerStyle}>
      {isOrderSuccessAlertOpen && (
        <Alert severity="success" onClose={() => setIsOrderSuccessAlertOpen(false)}>
          Pedido realizado com sucesso!
        </Alert>
      )}

      <br />
      <Typography variant="h4" gutterBottom>
        Carrinho de Compras
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <Card style={cardStyle} variant="outlined">
              <CardContent style={cartItemStyle}>
                <div style={itemInfoStyle}>
                  <ListItemText primary={`${item.nome}`} />
                </div>
                <div style={itemInfoStyle}>
                  <IconButton
                    color="primary"
                    aria-label="Diminuir"
                    onClick={() => handleDecrementQuantity(item.id)}
                  >
                    -
                  </IconButton>
                  <Typography>Quantidade: {item.amount}</Typography>
                  <IconButton
                    color="primary"
                    aria-label="Aumentar"
                    onClick={() => handleIncrementQuantity(item)}
                  >
                    +
                  </IconButton>
                  <Typography style={totalPriceStyle}>
                    R$ {(item.preco * item.amount).toFixed(2)}
                  </Typography>
                  <IconButton
                    color="error"
                    aria-label="Remover"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <DeleteIcon style={iconStyle} />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Card style={cardStyle} variant="outlined">
        <CardContent>
          <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h6">Total de Itens: {totalItems}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={openModal}>
            Finalizar Pedido
          </Button>
        </CardActions>
      </Card>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div style={modalStyle}>
          <Typography variant="h5" gutterBottom>
            Escolha a forma de pagamento e entrega
          </Typography>
          <Card style={cardStyle} variant="outlined">
            <CardContent>
              <Typography variant="h6">Forma de pagamento</Typography>
              <RadioGroup value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
                <FormControlLabel value="Dinheiro" control={<Radio />} label="Dinheiro" />
                <FormControlLabel value="Cartão" control={<Radio />} label="Cartão" />
                <FormControlLabel value="Pix" control={<Radio />} label="PIX" />
              </RadioGroup>
            </CardContent>
          </Card>
          <Card style={cardStyle} variant="outlined">
            <CardContent>
              <Typography variant="h6">Forma de entrega</Typography>
              <RadioGroup value={selectedDelivery} onChange={(e) => setSelectedDelivery(e.target.value)}>
                <FormControlLabel value="Retirada" control={<Radio />} label="Retirada na loja" />
                <FormControlLabel value="Entrega" control={<Radio />} label="Entrega a domicílio (somente Taquarituba)" />
                <FormControlLabel value="Frete" control={<Radio />} label="Envio por correio (combinar frete com vendedor)" />
              </RadioGroup>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" onClick={finalizarCompra}>
            Finalizar Compra
          </Button>
        </div>
      </Modal>
    </div>
  );
}
