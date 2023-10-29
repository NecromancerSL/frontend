import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import api from '../../../services/api';

export default function UserRegister() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  const cadastrarUsuario = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/cadastrarusuario', { name, email, password, cpf, telefone });
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário. Tente novamente mais tarde.');
      setName('');
      setEmail('');
      setPassword('');
      setCpf('');
      setTelefone('');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <form onSubmit={cadastrarUsuario}>
          <br />
          <Typography variant="h4" align="center">
            Cadastro
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  variant="outlined"
                  value={cpf}
                  onChange={(event) => setCpf(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  variant="outlined"
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
