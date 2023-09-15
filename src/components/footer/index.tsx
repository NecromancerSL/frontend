import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Nome da Sua Empresa. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
