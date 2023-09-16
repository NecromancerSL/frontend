import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import axios from 'axios';


export default function CadastroProduto (){

  const produtoModel = {
    nome: "",
    descricao: "",
    categoria: "",
    preco: 0,
    imagem: "",
    qntEstoque: 0,
  }
  

  const [produto, setProduto] = useState(produtoModel);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const cadastrarProduto = async () => {
    try {
      // Enviar os dados do produto para o servidor
      const response = await axios.post('http://localhost:8080/criarproduto', produto);
      console.log('Produto cadastrado com sucesso:', response.data);

      // Limpar o formulário após o cadastro bem-sucedido, se necessário
      setProduto({
        nome: '',
        descricao: '',
        categoria: '',
        preco: 0,
        imagem: '',
        qntEstoque: 0,
      });
    } catch (error) {
      console.error('Erro ao cadastrar o produto:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <form>
        <Typography variant="h4" component="h1" align="center">
          Cadastro de Produto
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                variant="outlined"
                value={produto.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="descricao"
                variant="outlined"
                value={produto.descricao}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Categoria"
                name="categoria"
                variant="outlined"
                value={produto.categoria}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Preço"
                name="preco"
                variant="outlined"
                type="number"
                value={produto.preco}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Imagem (Link)"
                name="imagem"
                variant="outlined"
                value={produto.imagem}
                onChange={handleChange}
              />
              {produto.imagem && (
                <div>
                  <a href={produto.imagem} target="_blank" rel="noopener noreferrer">
                    Link da Imagem
                  </a>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quantidade no Estoque"
                name="qntEstoque"
                variant="outlined"
                type="number"
                value={produto.qntEstoque}
                onChange={handleChange}
              />
            </Grid>
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={cadastrarProduto} // Chame a função de teste de conexão
            >
              Cadastrar Produto
            </Button>
        </Grid>
        
      </form>
    </Container>
  );
}

