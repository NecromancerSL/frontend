import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export default function DashboardAdmin() {
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
          Bem-vindo Administrador
        </Typography>
        <Link to="/dashboard/admin/products">
            <Button variant="contained" color="primary" style={buttonStyle}>
                Ver Produtos
            </Button>
        </Link>
        <br />
        <Link to="/login">
          <Button variant="contained" className="header-button" style={buttonStyle}>
            Ver Pedidos
          </Button>
        </Link>
      </Container>
    </div>
  );
}
