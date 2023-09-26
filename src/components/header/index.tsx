import React, { useState, useEffect } from 'react';
import { Box, AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Inicialize o navigate

  useEffect(() => {
    // Recupere a chave "userType" do localStorage para determinar o tipo de usuário
    const userType = localStorage.getItem("userType");
    if (userType === "admin") {
      // Se userType for "admin", então é um administrador
      setIsAdmin(true);
      // Recupere o nome do administrador do localStorage
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setUserName(storedName);
      }
    } else {
      // Caso contrário, é um usuário comum
      setIsAdmin(false);
      // Recupere o nome do usuário comum do localStorage
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, []);

  const handleLogout = () => {
    // Limpe as informações de login ao fazer logout
    localStorage.removeItem("userType");
    localStorage.removeItem("name");
    
    // Redirecione para a página de login (ou início)
    navigate("/login"); // ou a rota apropriada para a página de login
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Essencial - Produtos Médicos e Ortopédicos
          </Typography>
          {isAdmin || userName ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Oi, {isAdmin ? "Admin " + userName : userName}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" style={linkStyle}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}