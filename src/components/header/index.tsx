import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Header() {
  //onst [value, setValue] = useState(0); // Estado para controlar a aba ativa
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar se o usuário está logado
  const [username, setUsername] = useState(''); // Estado para armazenar o nome do usuário

  // Função para alternar entre as abas

  // Função para fazer login (simulada)
  const handleLogin = () => {
    // Simule um processo de login bem-sucedido
    setLoggedIn(true);
    setUsername('Nome do Usuário'); // Substitua pelo nome real do usuário
  };

  // Função para fazer logout
  const handleLogout = () => {
    // Simule um processo de logout
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo da empresa */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo da Empresa
        </Typography>

        {/* Abas de navegação */}
        <Tabs centered>
          <Tab label="Home" />
          <Tab label="Produtos" />
          <Tab label="Sobre Nós" />
        </Tabs>

        {/* Espaço para login ou exibição do nome do usuário */}
        {loggedIn ? (
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {`Oi, ${username}`}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Typography>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
