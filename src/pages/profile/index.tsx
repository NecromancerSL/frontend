import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Typography, Paper, Box, Divider, Grid, Button, CardContent } from '@mui/material';
import { User } from '../../types/user';
import { Endereco } from '../../types/endereco';
import api from '../../services/api'; // Certifique-se de que a função "api.get" está corretamente configurada

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

  useEffect(() => {
    if (userId) {
      // Buscar dados do usuário
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

      // Buscar endereços do usuário
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

  // Função para editar o endereço
  const editarEndereco = (enderecoId: number) => {
    navigate(`/edit/address/${enderecoId}`);
  };

  const deletarEndereco = async (enderecoId: number) => {
    console.log("Tentando excluir o endereço com ID:", enderecoId);
    if (isNaN(enderecoId)) {
      console.error("O valor de enderecoId não é um número válido.");
      return;
    }
  
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este endereço?");
  
    if (confirmDelete) {
      try {
        console.log("Tentando excluir o endereço com ID:", enderecoId);
        await api.delete(`/deletarendereco/${enderecoId}`);
        console.log("Endereço excluído com sucesso.");
      } catch (error) {
        console.error("Erro ao excluir o endereço:", error);
      }
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