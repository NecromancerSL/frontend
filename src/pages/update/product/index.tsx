import { useState, useEffect } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import api from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    id: id,
    nome: "",
    descricao: "",
    categoria: "",
    marca: "",
    preco: 0,
    imagem: "",
    qntEstoque: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };
  

  const editarProduto = async () => {
    try {
      // Enviar os dados do produto para o servidor
      const response = await api.post(
        `http://localhost:8080/atualizarproduto/${produto.id}`,
        produto
      );
      console.log("Produto editado com sucesso:", response.data);
      navigate("/dashboard/admin");
    } catch (error) {
      console.error("Erro ao editar o produto:", error);
    }
  };

  useEffect(() => {
    // Função para buscar os dados do produto com base no ID
    const buscarProdutoPorID = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/listarproduto/${id}`
        );
        const produtoData = response.data;

        // Atualiza o estado do produto com os dados recebidos da API
        setProduto(produtoData);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    // Chama a função para buscar os dados do produto assim que o componente for montado
    buscarProdutoPorID();
  }, [id]);

  return (
    <Container maxWidth="lg">
      <form>
        <Typography variant="h4" component="h1" align="center">
          Editar Produto
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
              label="Marca"
              name="marca"
              variant="outlined"
              value={produto.marca}
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
            onClick={editarProduto}
          >
            Editar Produto
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
