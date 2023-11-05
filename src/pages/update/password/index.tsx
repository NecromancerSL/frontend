import { useState } from 'react';
import { Typography, Paper, Button, TextField, Box } from '@mui/material';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function EditUserPassword() {
  const navigate = useNavigate();
  const userId = Cookies.get('userId');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePassword = () => {
    if (userId && currentPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setErrorMessage('As senhas não coincidem.');
        return;
      }
  
      console.log('Dados a serem enviados para o servidor:', {
        userId,
        currentPassword,
        newPassword,
      });

      const id = parseInt(userId);
  
      api
        .post(`/atualizarsenha/${userId}`, {
            id,
            currentPassword,
            newPassword,
        })
        .then((response) => {
          if (response.status === 200) {
            setSuccessMessage('Senha alterada com sucesso.');
            setErrorMessage('');
            navigate(`/profile/${userId}`);
          } else {
            throw new Error('Erro na solicitação à API');
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar senha', error);
          setSuccessMessage(''); // Limpa a mensagem de sucesso
          setErrorMessage('Erro ao atualizar senha.');
        });
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5">Editar Senha</Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <TextField
          label="Senha Atual"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nova Senha"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmar Nova Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {errorMessage && (
          <Typography variant="body1" style={{ color: 'red' }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body1" style={{ color: 'green' }}>
            {successMessage}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleUpdatePassword}>
          Salvar Senha
        </Button>
      </Paper>
    </Box>
  );
}