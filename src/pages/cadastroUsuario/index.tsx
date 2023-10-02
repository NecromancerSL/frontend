import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import axios from 'axios'; // Importe o Axios

export default function CadastroUsuario() {
  const usuarioModel = {
    name: '',
    email: '',
    password: '',
    cpf: '',
    telefone: '',
  };

  const [user, setUser] = useState(usuarioModel);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const cadastrarUsuario = async() => {
  
    try {
      // Fazer a chamada HTTP para cadastrar o usuário
      const response = await axios.post('http://localhost:8080/cadastrarusuario', {user});
      console.log('Usuário cadastrado com sucesso!', response.data);

      setUser({
        name: '',
        email: '',
        password: '',
        cpf: '',
        telefone: '',
      })

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <form>
          <Typography variant="h4" align="center">
            Cadastro
          </Typography>
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
