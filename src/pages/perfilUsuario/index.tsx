import { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

const ProfilePage = () => {
  // Dados do usuário (substitua com os seus dados reais)
  const [user, setUser] = useState({
    name: 'Seu Nome',
    email: 'seu.email@example.com',
    address: 'Endereço de exemplo',
  });

  // Estados para controlar a edição
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Perfil do Usuário
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={isEditing ? editedUser.name : user.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={isEditing ? editedUser.email : user.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Endereço"
            name="address"
            value={isEditing ? editedUser.address : user.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={isEditing ? handleSave : handleEdit}
        style={{ marginTop: '16px', marginRight: '16px' }}
      >
        {isEditing ? 'Salvar' : 'Editar'}
      </Button>
      {isEditing && (
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
      )}
    </Container>
  );
};

export default ProfilePage;
