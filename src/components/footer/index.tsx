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
  zIndex: 10, // Defina uma ordem z para garantir que o rodapé seja exibido acima dos outros elementos
};

const pageContentStyle: React.CSSProperties = {
  paddingBottom: '60px', // Defina um preenchimento inferior para criar espaço para o rodapé
};

export default function Footer() {
  return (
    <>
      <div style={pageContentStyle}>
        {/* Conteúdo da página */}
      </div>
      <footer style={footerStyle}>
        <Container maxWidth={false}>
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} Essencial - Produtos Ortopédicos. Todos os direitos reservados.
          </Typography>
        </Container>
      </footer>
    </>
  );
}
