import { useState } from 'react';
import api from '../../services/api';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async () => {
    try {
      const response = isAdmin
        ? await api.post('/loginadmin', { email, password })
        : await api.post('/loginusuario', { email, password });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { token, id, name } = response.data;

      // Armazene o token nos cookies
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('userName', name, { expires: 7 });
      Cookies.set('userId', id, { expires: 7 });

      console.log('Token:', token);
      console.log('ID:', id);
      console.log('Name:', name);

  
      navigate(isAdmin ? '/dashboard/admin' : '/dashboard/user');
    } catch (error) {
      console.error('Erro no login:', error);
      setEmail('');
      setPassword('');
    }
  }
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                color="primary"
                onChange={() => setIsAdmin(!isAdmin)}
              />
            }
            label="Sou administrador"
          />
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
              <Link to="/register/user">Não tem uma conta? Cadastre-se</Link>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
