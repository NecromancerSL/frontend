import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AppBar, Toolbar, Typography, Button, Modal, Card, CardContent, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Função para obter o nome do usuário do cookie
const getUserNameFromCookie = () => {
  return Cookies.get('userName');
}

export default function Header() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userNameFromCookie = getUserNameFromCookie();
    if (userNameFromCookie) {
      setUserName(userNameFromCookie);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('userName');
    setUserName('');
    setIsModalOpen(false);
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Essencial - Produtos Ortopédicos
          </Link>
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {userName ? (
            <div>
              <Button onClick={() => setIsModalOpen(true)} style={{ textDecoration: 'none', color: 'inherit' }}>
                Olá, {userName}
              </Button>
              <IconButton>
                <ShoppingCartIcon />
              </IconButton>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              Login
            </Link>
          )}
        </div>
      </Toolbar>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Olá, {userName}</Typography>
              <Button variant="contained" onClick={handleLogout}>Logout</Button>
              <Link to={`/profile/${Cookies.get('userId')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="contained">Acessar Perfil</Button>
              </Link>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </AppBar>
  );
}

