
import {
  AppBar,
  Badge,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Defina uma interface para o tipo de usuário
interface User {
  name: string;
  // Outras propriedades do usuário, se houver
}

interface HeaderProps {
  user: User | null; // Declare o tipo de user como User ou null
}

// eslint-disable-next-line react-refresh/only-export-components
function Header({ user }: HeaderProps) {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            {/* <Link to="/"> */}
              Essencial - Produtos Médicos e Ortopédicos
            {/* </Link> */}
          </Typography>
          <div>
            <Link to="/login" style={linkStyle}>
              <Button color="inherit">Login</Button>
            </Link>
            <Button color="inherit">
              Carrinho
              <Badge color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Button>
            {user && user.name && (
              <Typography variant="subtitle1" color="inherit">
                Bem-vindo, {user.name}!
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state: { user: User | null }) => ({
  user: state.user,
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps)(Header);
