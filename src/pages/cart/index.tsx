import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import api from '../../services/api';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, List, ListItem, Card, CardContent, IconButton, ListItemText, CardActions, Button, Modal, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { removeItem, ProductWithAmount, incrementQuantity, decrementQuantity } from '../../redux/slice/cartReducer';

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
  width: '100%', // Largura total do card
  marginBottom: '20px', // Espaço entre os cards
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
  fontWeight: 'bold',
};

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
    <div style={cartContainerStyle}>
      <Typography variant="h4" gutterBottom>
        Carrinho de Compras
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <Card style={cardStyle} variant="outlined">
              <CardContent style={cartItemStyle}>
                <div style={itemInfoStyle}>
                  <IconButton
                    color="error"
                    aria-label="Remover"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <CloseIcon style={iconStyle} />
                  </IconButton>
                  <ListItemText
                    primary={`${item.nome}`}
                  />
                </div>
                <div style={itemInfoStyle}>
                  <IconButton
                    color="primary"
                    aria-label="Diminuir"
                    onClick={() => handleDecrementQuantity(item.id)}
                  >
                    -
                  </IconButton>
                  <Typography>
                    Quantidade: {item.amount}
                  </Typography>
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
                </div>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Card style={cardStyle} variant="outlined">
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

      <Modal open={isModalOpen} onClose={closeModal}>
        <div style={modalStyle}>
          <Typography variant="h5" gutterBottom>
            Escolha a forma de pagamento e entrega
          </Typography>
          <Card style={cardStyle} variant="outlined">
            <CardContent>
              <Typography variant="h6">Forma de pagamento</Typography>
              <RadioGroup
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <FormControlLabel value="dinheiro" control={<Radio />} label="Dinheiro" />
                <FormControlLabel value="cartao" control={<Radio />} label="Cartão" />
                <FormControlLabel value="pix" control={<Radio />} label="PIX" />
              </RadioGroup>
            </CardContent>
          </Card>
          <Card style={cardStyle} variant="outlined">
            <CardContent>
              <Typography variant="h6">Forma de entrega</Typography>
              <RadioGroup
                value={selectedDelivery}
                onChange={(e) => setSelectedDelivery(e.target.value)}
              >
                <FormControlLabel value="retirada" control={<Radio />} label="Retirada na loja" />
                <FormControlLabel value="vendedor" control={<Radio />} label="Combinação com o vendedor" />
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