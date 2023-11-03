import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#3e474c', // Alterado para a cor #3e474c
  padding: '10px 0',
  color: 'white',
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <Container maxWidth={false}>
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Essencial - Produtos Ortopédicos. Todos os direitos reservados.
        </Typography>
      </Container>
    </footer>
  );
}
