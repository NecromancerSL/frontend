import { useState, useEffect, ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { Typography, Paper, Button, TextField } from '@mui/material';
import { User } from '../../../types/user';
import api from '../../../services/api';

export default function EditUserProfile() {
  const [user, setUser] = useState<User | null>();
  const [editedUser, setEditedUser] = useState<User | null>();
  const userId = Cookies.get('userId');

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
          setEditedUser(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do usuário', error);
        });
    }
  }, [userId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  const handleUpdateUser = () => {
    if (userId && editedUser) {
      api.post(`/atualizarusuario/${userId}`, editedUser)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Erro na solicitação à API');
          }
          setUser(editedUser);
        })
        .catch((error) => {
          console.error('Erro ao atualizar dados do usuário', error);
        });
    }
  };

  return (
    <div>
      <Typography variant="h5">Editar Perfil do Usuário</Typography>
      <Paper elevation={3}>
        {user ? (
          <div>
            <TextField
              label="Nome"
              name="name"
              value={editedUser ? editedUser.name : ''}
              onChange={handleInputChange}
            />
            <TextField
              label="E-mail"
              name="email"
              value={editedUser ? editedUser.email : ''}
              onChange={handleInputChange}
            />
            <TextField
              label="CPF"
              name="cpf"
              value={editedUser ? editedUser.cpf : ''}
              onChange={handleInputChange}
            />
            <TextField
              label="Telefone"
              name="telefone"
              value={editedUser ? editedUser.telefone : ''}
              onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateUser}>
              Salvar Alterações
            </Button>
          </div>
        ) : (
          <Typography variant="body1">Carregando...</Typography>
        )}
      </Paper>
    </div>
  );
}