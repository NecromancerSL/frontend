import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, InputBase, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useCookies } from 'react-cookie';
import api from '../../services/api';
import { AxiosResponse } from 'axios';

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

  const handleSearch = async () => {
    try {
      const response: AxiosResponse = await api.get(`/buscarproduto/${encodeURIComponent(searchQuery)}`);

      if (response.status === 200) {
        const data = response.data;
        console.log('Search results:', data);
      } else {
        console.error('Error fetching search results:', response.statusText);
        if (response.status === 404) {
          console.error('Product not found');
        }
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setSearchQuery('');
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(
      event.target.value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#6a9093' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Essencial - Produtos Ortopédicos
          </Link>
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Paper component="form" style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginLeft: '10px' }}>
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
          {userName ? (
            <div>
              <Button onClick={handleOpenMenu} style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>
                Olá, {userName}
              </Button>
              <IconButton>
                <Link to='/cart' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ShoppingCartIcon />
                </Link>
              </IconButton>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>
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