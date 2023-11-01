import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, InputBase, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useCookies } from 'react-cookie';

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cookies, , removeCookie] = useCookies(['userName', 'userId']);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userNameFromCookie = cookies.userName;
    setUserName(userNameFromCookie || '');
  }, [cookies.userName]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    removeCookie('userName');
    removeCookie('userId');
    setUserName('');
    handleCloseMenu();
    navigate('/');
  }

  const handleSearch = () => {
    // Redirecione para a página de resultados de pesquisa com a consulta
    navigate(`/search?q=${searchQuery}`);
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Essencial - Produtos Ortopédicos
          </Link>
        </Typography>
        <Paper component="form" style={{ display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="Pesquisar..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <IconButton aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {userName ? (
            <div>
              <Button onClick={handleOpenMenu} style={{ textDecoration: 'none', color: 'inherit' }}>
                Olá, {userName}
              </Button>
              <IconButton>
                <Link to='/cart' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ShoppingCartIcon />
                </Link>
              </IconButton>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              Login
            </Link>
          )}
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem>
            <Link to={`/profile/${cookies.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              Acessar Perfil
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
