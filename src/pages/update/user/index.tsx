import { useState, ChangeEvent, useEffect } from 'react';
import { Typography, Paper, Button, TextField, Box } from '@mui/material';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { User } from '../../../types/user';

const formatCPF = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  const formattedCPF = numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  return formattedCPF;
};

const formatTelefone = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  if (numericValue.length === 11) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
  } else {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
  }
};

export default function EditUserProfile() {
  const navigate = useNavigate();
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
          data.cpf = formatCPF(data.cpf);
          data.telefone = formatTelefone(data.telefone);

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
      let formattedValue = value;
      if (name === 'cpf') {
        formattedValue = formatCPF(value);
      } else if (name === 'telefone') {
        formattedValue = formatTelefone(value);
      }
      setEditedUser({
        ...editedUser,
        [name]: formattedValue,
      });
    }
  };

  const handleUpdateUser = () => {
    if (userId && editedUser) {
     
      editedUser.cpf = editedUser.cpf.replace(/\D/g, '');
      editedUser.telefone = editedUser.telefone.replace(/\D/g, '');

      api.post(`/atualizarusuario/${userId}`, editedUser)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Erro na solicitação à API');
          }
          setUser(editedUser);
          navigate(`/profile/${userId}`);
        })
        .catch((error) => {
          console.error('Erro ao atualizar dados do usuário', error);
        });
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5">Editar Perfil do Usuário</Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        {user ? (
          <div>
            <TextField
              label="Nome"
              name="name"
              value={editedUser ? editedUser.name : ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="E-mail"
              name="email"
              value={editedUser ? editedUser.email : ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CPF"
              name="cpf"
              value={editedUser ? editedUser.cpf : ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Telefone"
              name="telefone"
              value={editedUser ? editedUser.telefone : ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleUpdateUser}>
              Salvar Alterações
            </Button>
          </div>
        ) : (
          <Typography variant="body1">Carregando...</Typography>
        )}
      </Paper>
    </Box>
  );
}