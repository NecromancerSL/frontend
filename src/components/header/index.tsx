import { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCartContext';

function Header() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const { cart } = useCart();

  const handleOpenCartModal = () => {
    setCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setCartModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Essencial - Produtos Médicos e Ortopédicos
          </Typography>
          <div>
            <Link to="/login" style={linkStyle}>
              <Button color="inherit">Login</Button>
            </Link>
            <Button color="inherit" onClick={handleOpenCartModal}>
              Carrinho
              <Badge color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Dialog open={isCartModalOpen} onClose={handleCloseCartModal}>
        <DialogTitle>Seu Carrinho de Compras</DialogTitle>
        <DialogContent>
          {cart.length === 0 ? (
            <Typography>Seu carrinho está vazio.</Typography>
          ) : (
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  {product.nome} - Quantidade: {product.qntEstoque}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Header;
