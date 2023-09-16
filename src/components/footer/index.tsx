import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem',
  position: 'absolute',
  bottom: '0',
  width: '100%',
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={footerStyle}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Essencial - Produtos Médicos e Ortopédicos. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}

