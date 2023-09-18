import { useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material"; // Importar componentes do Material UI
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [error, setError] = useState(""); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: name === "isAdmin" ? e.target.checked : value });
  };

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/loginadmin", credentials);
      console.log("Login de administrador bem-sucedido:", response.data);
      navigate("/homeadmin");
    } catch (error) {
      console.error("Erro no login de administrador:", error);
      setError("Email ou senha incorretos. Por favor, tente novamente.");
      setCredentials({
        ...credentials,
        email: "",
        password: "",
        isAdmin: false,
      });
      
    }
  };

  const handleUserLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/loginusuario", credentials);
      console.log("Login de usuário comum bem-sucedido:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Erro no login de usuário comum:", error);
      setError("Email ou senha incorretos. Por favor, tente novamente.");
      setCredentials({
        ...credentials,
        email: "",
        password: "",
        isAdmin: false,
      });
    }
  };

  const handleLogin = async () => {
    setError("");

    if (credentials.isAdmin) {
      handleAdminLogin();
    } else {
      handleUserLogin();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" name="isAdmin" checked={credentials.isAdmin} onChange={handleChange} />}
            label="Sou administrador"
          />
          {error && <Typography variant="body2" color="error">{error}</Typography>} {/* Exibir mensagem de erro se houver erro */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Logar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/cadastroUsuario">Não tem uma conta? Cadastre-se</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const styles = {
  box: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
