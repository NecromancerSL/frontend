import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Modal, Card, CardContent, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCookies } from 'react-cookie';

export default function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(['userName', 'userId']);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userNameFromCookie = cookies.userName;
    setUserName(userNameFromCookie || '');
  }, [cookies.userName]);

  const handleLogout = () => {
    removeCookie('userName');
    removeCookie('userId');
    setUserName('');
    setIsModalOpen(false);
    navigate('/');
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Olá, {userName}</Typography>
              <Button variant="contained" onClick={handleLogout}>Logout</Button>
              <Box sx={{ marginTop: '10px' }}> {/* Adiciona margem entre os botões */}
                <Link to={`/profile/${cookies.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button variant="contained" onClick={handleCloseModal}>Acessar Perfil</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </AppBar>
  );
}
