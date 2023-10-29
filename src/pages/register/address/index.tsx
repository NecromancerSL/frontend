import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function AddressRegister() {
  
  const [error, setError] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [apelido, setApelido] = useState(''); // [1
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = Cookies.get('userId');

    if (!loggedInUserId) {
      // Caso o cookie não exista, você pode tomar alguma ação, como redirecionar o usuário para fazer o login.
      // Aqui, estou apenas mostrando uma mensagem de erro.
      console.error('O usuário não está logado. Redirecione-o para fazer o login.');
      // Redirecione para a página de login ou outra página apropriada.
      navigate('/login');
    }
  }, [navigate]);

  const cadastrarEndereco = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const loggedInUserId = Cookies.get('userId');

      const response = await api.post('/cadastrarendereco', {
        cep,
        rua,
        numero,
        apelido,
        complemento,
        bairro,
        cidade,
        estado,
        userId: loggedInUserId, // Envie o ID do usuário
      });

      console.log(response);
      navigate('/profile/user'); // Redirecione para a página desejada após a criação do endereço.
    } catch (error) {
      console.error('Erro ao registrar endereço:', error);
      setError('Erro ao registrar endereço. Tente novamente mais tarde.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <form onSubmit={cadastrarEndereco}>
          <Typography variant="h4" align="center">
            Cadastro de Endereço
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="cep"
                  variant="outlined"
                  value={cep}
                  onChange={(event) => setCep(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rua"
                  name="rua"
                  variant="outlined"
                  value={rua}
                  onChange={(event) => setRua(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número"
                  name="numero"
                  variant="outlined"
                  value={numero}
                  onChange={(event) => setNumero(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Apelido Endereço"
                  name="apelido"
                  variant="outlined"
                  value={apelido}
                  onChange={(event) => setApelido(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Complemento"
                  name="complemento"
                  variant="outlined"
                  value={complemento}
                  onChange={(event) => setComplemento(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bairro"
                  name="bairro"
                  variant="outlined"
                  value={bairro}
                  onChange={(event) => setBairro(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="cidade"
                  variant="outlined"
                  value={cidade}
                  onChange={(event) => setCidade(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Estado"
                  name="estado"
                  variant="outlined"
                  value={estado}
                  onChange={(event) => setEstado(event.target.value)}
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
                  Cadastrar Endereço
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
