import { Box, AppBar, Button , Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Essencial - Produtos Médicos e Ortopédicos
          </Typography>
            <Link to="/login" style={linkStyle}>
              <Button color="inherit">Login</Button>
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


