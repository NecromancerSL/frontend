import { useState } from 'react';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import api from '../../services/api';

export default function CadastroUsuario() {
  const usuarioModel = {
    name: '',
    email: '',
    password: '',
    cpf: '',
    telefone: '',
  };

  const [user, setUser] = useState(usuarioModel);
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const cadastrarUsuario = async () => {
    setError(''); // Limpa erros anteriores

  if (!user.name || !user.email || !user.password) {
    setError('Preencha todos os campos obrigatórios.');
    return;
  }

  // Adicione uma validação para o formato de email, se necessário

  try {
    const response = await api.post('/cadastrarusuario', { user });

    if (response.status === 201) {
      // O usuário foi criado com sucesso (status 201 Created)
      console.log('Usuário cadastrado com sucesso:', response.data);
      setUser(usuarioModel); // Limpa o formulário
    } else {
      // Tratamento de outros possíveis cenários de erro da API
      setError('Erro ao registrar usuário. Tente novamente mais tarde.');
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    setError('Erro ao registrar usuário. Tente novamente mais tarde.');
  }
};

  return (
    <Container maxWidth="lg">
      <Box>
        <form>
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
                  value={user.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={user.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={user.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  variant="outlined"
                  value={user.cpf}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  variant="outlined"
                  value={user.telefone}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={cadastrarUsuario}
          >
            Cadastrar
          </Button>
        </form>
      </Box>
    </Container>
  );
}
