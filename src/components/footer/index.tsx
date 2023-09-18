import { Box, Typography } from "@mui/material";

const footerStyle = {
  flexGrow: 1,
  backgroundColor: "#222", // Cor de fundo do footer
  color: "white", // Cor do texto
  padding: "20px", // Espaçamento interno
  position: "static",
  bottom: 0,
};

export default function Footer() {
  return (
    <Box component="footer" sx={footerStyle}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Essencial - Produtos Médicos e Ortopédicos. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}