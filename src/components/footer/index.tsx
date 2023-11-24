import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#3e474c',
  padding: '10px 0',
  color: 'white',
  zIndex: 10,
};

const pageContentStyle: React.CSSProperties = {
  paddingBottom: '60px',
};

const contactStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row', // Alteração aqui para manter na mesma linha
  marginTop: '10px',
};

const whatsappIconStyle: React.CSSProperties = {
  marginRight: '5px',
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
          <div style={contactStyle}>
            <Typography variant="body1">Dúvidas - Entre em contato via:</Typography>
            <WhatsAppIcon style={whatsappIconStyle} />
            <Typography variant="body1">(11) 99999-9999</Typography>
          </div>
        </Container>
      </footer>
    </>
  );
}
