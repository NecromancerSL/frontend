
import {
  AppBar,
  Box,
  Button,
  Badge,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';


function Header() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
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
            <Link to="/carrinho" style={linkStyle}>
              <Button color="inherit">
                Carrinho
                <Badge color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
