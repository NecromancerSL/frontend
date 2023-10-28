import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { Typography, Paper, Box, Divider, Grid, Button, CardContent } from '@mui/material';
import { User } from '../../types/User';
import { Endereco } from '../../types/endereco';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]); 
  const userId = Cookies.get('userId');
  const [error, setError] = useState<string | null>();

  const fetchUserData = useCallback(() => {
    if (userId) {
      api.get(`/listarusuario/${userId}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Erro na solicitação à API');
          }
          return response.data;
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          setError('Erro ao buscar dados do usuário. Por favor, tente novamente mais tarde.');
          console.error('Erro ao buscar dados do usuário', error);
        });

      api.get(`/listarenderecos/${userId}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Erro na solicitação à API');
          }
          return response.data;
        })
        .then((data) => {
          setEnderecos(data);
        })
        .catch((error) => {
          setError('Erro ao buscar endereços do usuário. Por favor, tente novamente mais tarde.');
          console.error('Erro ao buscar endereços do usuário', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const editarEndereco = (enderecoId: number) => {
    navigate(`/edit/address/${enderecoId}`);
  };

  const deletarEndereco = async (enderecoId: number) => {
    try {
      await api.delete(`/deletarendereco/${enderecoId}`);
      // Atualize os dados do usuário após a exclusão
      fetchUserData();
    } catch (error) {
      setError('Erro ao excluir endereço. Por favor, tente novamente mais tarde.');
      console.error('Erro ao excluir endereço', error);
    }
  };
   

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>Perfil do Usuário</Typography>
      <Paper elevation={3} style={{ padding: '16px', borderRadius: '10px' }}>
        {error ? (
          <Typography variant="body1" color="error" paragraph>{error}</Typography>
        ) : user ? (
          <div>
            <CardContent>
              <Typography variant="body1" paragraph><strong>Nome:</strong> {user.name}</Typography>
              <Typography variant="body1" paragraph><strong>E-mail:</strong> {user.email}</Typography>
              <Typography variant="body1" paragraph><strong>CPF:</strong> {user.cpf}</Typography>
              <Typography variant="body1" paragraph><strong>Telefone:</strong> {user.telefone}</Typography>
            </CardContent>

            <Divider style={{ margin: '16px 0' }} />

            <Typography variant="h6" gutterBottom>Endereços do Usuário</Typography>
            {enderecos && enderecos.length > 0 ? (
              <Grid container spacing={2}>
                {enderecos.map((endereco, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper style={{ padding: '8px', borderRadius: '10px' }}>
                      <div>
                        <Typography variant="body1">
                          <strong>{endereco.apelido}</strong><br />
                          <strong>CEP:</strong> {endereco.cep}<br />
                          <strong>Rua:</strong> {endereco.rua}<br />
                          <strong>Número:</strong> {endereco.numero}<br />
                          <strong>Complemento:</strong> {endereco.complemento}<br />
                          <strong>Bairro:</strong> {endereco.bairro}<br />
                          <strong>Cidade:</strong> {endereco.cidade}<br />
                          <strong>Estado:</strong> {endereco.estado}
                        </Typography>
                        <div style={{ display: 'flex' }}>
                          <IconButton color="primary" onClick={() => editarEndereco(endereco.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => deletarEndereco(endereco.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" paragraph>Nenhum endereço encontrado.</Typography>
            )}
          </div>
        ) : (
          <Typography variant="body1" paragraph>Carregando...</Typography>
        )}
      </Paper>
      <Link to={`/profile/${user?.id}/edit`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginTop: '16px', marginRight: '8px' }}>
          Editar Perfil
        </Button>
      </Link>
      <Link to="/register/address" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Criar Endereço
        </Button>
      </Link>

    </Box>
  );
}
