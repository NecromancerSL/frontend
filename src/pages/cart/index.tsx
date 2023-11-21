import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import api from '../../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductWithAmount, clearCart, decrementQuantity, incrementQuantity, removeItem } from '../../redux/slice/cartReducer';
import { Alert, Button, Card, CardActions, CardContent, IconButton, List, ListItem, ListItemText, Modal, RadioGroup, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import './cart.css';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('dinheiro');
  const [selectedDelivery, setSelectedDelivery] = useState('retirada');
  const [isOrderSuccessAlertOpen, setIsOrderSuccessAlertOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPixModal = () => {
    setIsPixModalOpen(true);
  };

  const closePixModal = () => {
    setIsPixModalOpen(false);
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

    const userId = Cookies.get('userId');

    try {
      console.log('Enviando solicitação para criar pedido...');
      const response = await api.post('/criarpedido', {
        usuarioId: userId,
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

  const renderPaymentModal = () => {
    if (selectedPayment === 'Pix') {
      return (
        <Card className="card" variant="outlined">
          <CardContent>
            <Typography variant="h6">Pagamento via Pix</Typography>
            {/* ... (conteúdo omitido para brevidade) ... */}
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.amount, 0);

  useEffect(() => {
    Cookies.set('nomeUsuario', 'SeuNomeDeUsuarioAqui');
  }, []);

  return (
    <div className="cart-container">
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
            <Card className="card" variant="outlined">
              <CardContent className="cart-item">
                <div className="item-info">
                  <ListItemText primary={`${item.nome}`} />
                </div>
                <div className="item-info">
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
                  <Typography className="total-price">
                    R$ {(item.preco * item.amount).toFixed(2)}
                  </Typography>
                  <IconButton
                    color="error"
                    aria-label="Remover"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <DeleteIcon className="icon" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Card className="card" variant="outlined">
        <CardContent>
          <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h6">Total de Itens: {totalItems}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={selectedPayment === 'Pix' ? openPixModal : openModal}
          >
            {selectedPayment === 'Pix' ? 'Próximo' : 'Finalizar Pedido'}
          </Button>
        </CardActions>
      </Card>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="modal">
          <Typography variant="h5" gutterBottom>
            Escolha a forma de pagamento e entrega
          </Typography>
          <Card className="card" variant="outlined">
            <CardContent>
              <Typography variant="h6">Forma de pagamento</Typography>
              <RadioGroup value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
                {/* ... (conteúdo omitido para brevidade) ... */}
              </RadioGroup>
            </CardContent>
          </Card>
          {renderPaymentModal()}
          <Card className="card" variant="outlined">
            <CardContent>
              <Typography variant="h6">Forma de entrega</Typography>
              <RadioGroup value={selectedDelivery} onChange={(e) => setSelectedDelivery(e.target.value)}>
                {/* ... (conteúdo omitido para brevidade) ... */}
              </RadioGroup>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" onClick={finalizarCompra}>
            Finalizar Compra
          </Button>
        </div>
      </Modal>

      <Modal open={isPixModalOpen} onClose={closePixModal}>
        <div className="modal">
          <Typography variant="h5" gutterBottom>
            Faça o Pix
          </Typography>
          <Button variant="contained" color="primary" onClick={finalizarCompra}>
            Finalizar Compra
          </Button>
        </div>
      </Modal>
    </div>
  );
}
