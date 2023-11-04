import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function EditAddress() {
  const { enderecoId } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [apelido, setApelido] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    const loggedInUserId = Cookies.get('userId');
    if (!loggedInUserId) {
      console.error('O usuário não está logado. Redirecione-o para fazer o login.');
      navigate('/login');
      return;
    }

    const fetchAddressDetails = async () => {
      try {
        const response = await api.get(`/getendereco/${enderecoId}`);
        const enderecoData = response.data;

        setCep(enderecoData.cep);
        setRua(enderecoData.rua);
        setNumero(enderecoData.numero);
        setApelido(enderecoData.apelido);
        setComplemento(enderecoData.complemento);
        setBairro(enderecoData.bairro);
        setCidade(enderecoData.cidade);
        setEstado(enderecoData.estado);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do endereço:', error);
        setError('Erro ao buscar os detalhes do endereço. Tente novamente mais tarde.');
      }
    };

    fetchAddressDetails();
  }, [navigate, enderecoId]);

  const handleEditAddress = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    const cepValidation = await verificarCEP(cep);

    if (!cepValidation) {
      return; // Não prossegue com a edição se o CEP for inválido.
    }

    try {
      const loggedInUserId = Cookies.get('userId');

      const response = await api.post(`/atualizarendereco/${enderecoId}`, {
        cep,
        rua,
        numero,
        apelido,
        complemento,
        bairro,
        cidade,
        estado,
        userId: loggedInUserId,
      });

      console.log(response);
      navigate('/profile/user');
    } catch (error) {
      console.error('Erro ao editar endereço:', error);
      setError('Erro ao editar endereço. Tente novamente mais tarde.');
    }
  };

  const verificarCEP = async (cep: string) => {
    try {
      const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.cep) {
        setRua(response.data.logradouro);
        setBairro(response.data.bairro);
        setCidade(response.data.localidade);
        setEstado(response.data.uf);
        setError('');
        return true; // Retorna true se o CEP for válido.
      } else {
        setError('CEP inválido. Verifique o CEP digitado.');
        return false; // Retorna false se o CEP for inválido.
      }
    } catch (error) {
      console.error('Erro ao verificar CEP:', error);
      setError('Erro ao verificar CEP. Tente novamente mais tarde.');
      return false; // Retorna false em caso de erro.
    }
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <form onSubmit={handleEditAddress}>
          <Typography variant="h4" align="center">
            Editar Endereço
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
                  Editar Endereço
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
