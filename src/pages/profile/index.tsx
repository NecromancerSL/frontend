import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Typography, Paper, Button, CardContent, Box, Divider } from '@mui/material';
import { User } from '../../types/user';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>();
  const userId = Cookies.get('userId');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    }
  }, [userId]);

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
      <Divider style={{ margin: '16px 0' }} />
    </Box>
  );
}
