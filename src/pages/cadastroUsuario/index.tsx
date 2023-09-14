import React, { useState } from "react";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";

interface Address {
  streetName: string;
  number: string;
  complement: string;
  city: string;
  zipCode: string;
  state: string;
}

interface User {
  name: string;
  email: string;
  password: string;
  cpf: string;
  telefone: string;
  address: Address;
}

const initialUser: User = {
  name: "",
  email: "",
  password: "",
  cpf: "",
  telefone: "",
  address: {
    streetName: "",
    number: "",
    complement: "",
    city: "",
    zipCode: "",
    state: "",
  },
};

export default function cadastroUsuario() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState<User>(initialUser);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      address: {
        ...user.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você pode enviar os dados do usuário para o servidor ou realizar qualquer outra ação necessária.
    console.log("Dados do usuário:", user);
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center">
          Cadastro
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              variant="outlined"
              value={user.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              variant="outlined"
              value={user.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              variant="outlined"
              value={user.cpf}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Telefone"
              name="telefone"
              variant="outlined"
              value={user.telefone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome da Rua"
              name="streetName"
              variant="outlined"
              value={user.address.streetName}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Número"
              name="number"
              variant="outlined"
              value={user.address.number}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Complemento"
              name="complement"
              variant="outlined"
              value={user.address.complement}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cidade"
              name="city"
              variant="outlined"
              value={user.address.city}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CEP"
              name="zipCode"
              variant="outlined"
              value={user.address.zipCode}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="UF"
              name="state"
              variant="outlined"
              value={user.address.state}
              onChange={handleAddressChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}


