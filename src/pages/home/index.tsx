import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  const homeStyle: React.CSSProperties = {
    background: 'url("/ortopedia.png") right/contain no-repeat', 
    backgroundSize: '30%', 
    backgroundPosition: 'right', 
    backgroundColor: 'rgba(245, 245, 245, 0.85)', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative', 
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '20px', 
  };


  return (
    <div style={homeStyle}>
      <Container>
        <Typography variant="h4" style={{ fontSize: '36px', marginBottom: '10px' }}>
          Bem-vindo à Loja Essencial
        </Typography>
        <Typography variant="h6" style={{ fontSize: '24px', marginBottom: '20px' }}>
            Soluções Ortopédicas para um Futuro Mais Forte.
        </Typography> 
        <Link to="/dashboard/user">
            <Button variant="contained" color="primary" style={buttonStyle}>
                Ir para Produtos
            </Button>
        </Link>
        <br />
        <Link to="/login">
          <Button variant="contained" className="header-button" style={buttonStyle}>
            Login
          </Button>
        </Link>
      </Container>
    </div>
  );
}
