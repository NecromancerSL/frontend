import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export default function NotFound() {
  const notFoundStyle: React.CSSProperties = {
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

  const buttonStyle = {
    marginTop: '20px',
  };

  return (
    <div style={notFoundStyle}>
      <Container>
        <Typography variant="h4" style={{ fontSize: '36px', marginBottom: '10px' }}>
          Página não encontrada
        </Typography>
        <Typography variant="h6" style={{ fontSize: '24px', marginBottom: '20px' }}>
          A página que você está procurando não existe.
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary" style={buttonStyle}>
            Voltar para a Página Inicial
          </Button>
        </Link>
      </Container>
    </div>
  );
}
