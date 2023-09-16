import { useState } from "react";
import { Avatar, Button, TextField, Grid, Container, Typography, FormControlLabel, Box, Checkbox, Link } from "@mui/material";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function Login () {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: name === "isAdmin" ? e.target.checked : value });
  };

  const handleAdminLogin = async () => {
    try {
      // Enviar os dados de login de administrador para o servidor
      const response = await axios.post("http://localhost:8080/loginadmin", credentials);
      console.log("Login de administrador bem-sucedido:", response.data);

      // Redirecionar o usuário ou executar outras ações após o login bem-sucedido
    } catch (error) {
      console.error("Erro no login de administrador:", error);
    }
  };

  const handleUserLogin = async () => {
    try {
      // Enviar os dados de login de usuário comum para o servidor
      const response = await axios.post("http://localhost:8080/loginusuario", credentials);
      console.log("Login de usuário comum bem-sucedido:", response.data);

      // Redirecionar o usuário ou executar outras ações após o login bem-sucedido
    } catch (error) {
      console.error("Erro no login de usuário comum:", error);
    }
  };

  const handleLogin = async () => {
    if (credentials.isAdmin) {
      handleAdminLogin();
    } else {
      handleUserLogin();
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" name="isAdmin" checked={credentials.isAdmin} onChange={handleChange}/>}
              label="Admin Login"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


