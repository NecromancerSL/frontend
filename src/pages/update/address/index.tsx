import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function EditAddress() {
  const { enderecoId } = useParams(); // Recebe o ID do endereço a partir das rotas
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [address, setAddress] = useState({
    cep: '',
    rua: '',
    numero: '',
    apelido: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    // Verifique se o usuário está logado
    const loggedInUserId = Cookies.get('userId');
    if (!loggedInUserId) {
      console.error('O usuário não está logado. Redirecione-o para fazer o login.');
      navigate('/login');
      return;
    }

    // Carrega os detalhes do endereço atual para edição
    const fetchAddressDetails = async () => {
      try {
        const response = await api.get(`/getendereco/${enderecoId}`);
        const enderecoData = response.data;

        setAddress(enderecoData);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do endereço:', error);
        setError('Erro ao buscar os detalhes do endereço. Tente novamente mais tarde.');
      }
    };

    fetchAddressDetails();
  }, [navigate, enderecoId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleEditAddress = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    // Valide se os campos obrigatórios foram preenchidos
    if (!address.cep || !address.rua || !address.numero || !address.bairro || !address.cidade || !address.estado) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const loggedInUserId = Cookies.get('userId');

      const response = await api.post(`/editaddress/${enderecoId}`, {
        ...address,
        userId: loggedInUserId,
      });

      console.log(response);
      navigate('/'); // Redirecione para a página desejada após a edição do endereço.
    } catch (error) {
      console.error('Erro ao editar endereço:', error);
      setError('Erro ao editar endereço. Tente novamente mais tarde.');
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
                  value={address.cep}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rua"
                  name="rua"
                  variant="outlined"
                  value={address.rua}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número"
                  name="numero"
                  variant="outlined"
                  value={address.numero}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Apelido Endereço"
                  name="apelido"
                  variant="outlined"
                  value={address.apelido}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Complemento"
                  name="complemento"
                  variant="outlined"
                  value={address.complemento}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bairro"
                  name="bairro"
                  variant="outlined"
                  value={address.bairro}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="cidade"
                  variant="outlined"
                  value={address.cidade}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Estado"
                  name="estado"
                  variant="outlined"
                  value={address.estado}
                  onChange={handleInputChange}
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
