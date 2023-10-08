import { useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material"; // Importar componentes do Material UI
import { useNavigate, Link } from "react-router-dom";
import  {  useAuthUser } from "../../contexts/AuthUserProvider/useAuthUser"; // Importar contexto de autenticação]
import  {  useAuthAdmin } from "../../contexts/AuthAdminProvider/useAuthAdmin"; // Importar contexto de autenticação

export default function Login() {
  
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [error, setError] = useState("");

  const { loginuser, erroruser } = useAuthUser();

  const { loginadmin, erroradmin } = useAuthAdmin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: name === "isAdmin" ? e.target.checked : value });
  };

  const handleAdminLogin = async () => {
    try {
      await loginadmin(credentials); 
      navigate("/");
    } catch (error) {
      console.error("Erro no login de administrador", erroradmin);

    }
  };
  
  const handleUserLogin = async () => {
    try {
      await loginuser(credentials); 
      navigate("/");
    } catch (error) {
      console.error("Erro no login de usuário comum:", erroruser);

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
          {error && <Typography variant="body2" color="error">{error}</Typography>}
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
              <Link to="/cadastrousuario">Não tem uma conta? Cadastre-se</Link>
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


