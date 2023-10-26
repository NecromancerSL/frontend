import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Typography, Paper, Button, CardContent } from '@mui/material';
import { User } from '../../types/user';
import api from '../../services/api'; // Importe sua configuração de API
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>();
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (userId) {
      // Fazer uma chamada à API para buscar os dados do usuário usando api.get
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
          console.error('Erro ao buscar dados do usuário', error);
        });
    }
  }, [userId]);

  return (
    <div>
      <Typography variant="h5">Perfil do Usuário</Typography>
      <Paper elevation={3}>
        {user ? (
          <div>
            <CardContent>
              <Typography variant="body1">Nome: {user.name}</Typography>
              <Typography variant="body1">E-mail: {user.email}</Typography>
              <Typography variant="body1">CPF: {user.cpf}</Typography>
              <Typography variant="body1">Telefone: {user.telefone}</Typography>
            </CardContent>
          </div>
        ) : (
          <Typography variant="body1">Carregando...</Typography>
        )}
      </Paper>
      <Link to={`/profile/${user?.id}/edit`}>
      <Button variant="contained" color="primary">
        Editar Perfil
      </Button>
      </Link>
    </div>
  );
}