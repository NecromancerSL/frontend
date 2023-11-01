import React, { useState } from 'react';
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

  // Função para formatar o CPF
  const formatCPF = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedCPF = numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formattedCPF;
  };

  // Função para formatar o telefone
  const formatTelefone = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length === 11) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
    } else {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
    }
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(event.target.value);
    setCpf(formattedCPF);
  };

  const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedTelefone = formatTelefone(event.target.value);
    setTelefone(formattedTelefone);
  };

  const cadastrarUsuario = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/cadastrarusuario', {
        name,
        email,
        password,
        cpf: cpf.replace(/\D/g, ''), // Remove a formatação para o envio
        telefone: telefone.replace(/\D/g, ''), // Remove a formatação para o envio
      });
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
                  onChange={handleCpfChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  variant="outlined"
                  value={telefone}
                  onChange={handleTelefoneChange}
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
