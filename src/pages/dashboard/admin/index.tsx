import { useState, useEffect } from "react";
import api from "../../../services/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/product";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box, // Adicionado Box para espaçamento
} from "@mui/material";

const cardMediaStyle: React.CSSProperties = {
  width: 150, // Define a largura máxima da imagem
  height: 150, // Define a altura máxima da imagem
  objectFit: "cover", // Evita que a imagem seja distorcida
  borderRadius: "50%", // Bordas arredondadas para criar um círculo
  display: "flex",
  alignItems: "center", // Centralize verticalmente
  justifyContent: "center", // Centralize horizontalmente
};

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category] = useState<string>("");

  useEffect(() => {
    api
      .get<Product[]>("/listarprodutos")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleEditProduct = (productId: number) => {
    navigate(`/update/product/${productId}`);
  };

  const handleDeleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este produto?");

    if (confirmDelete) {
      try {
        await api.delete(`/deletarproduto/${productId}`);
        console.log("Produto excluído com sucesso.");

        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Erro ao excluir o produto:", error);
      }
    }
  };

  const filteredProducts = category
    ? products.filter((product) => {
        if (category === "Produtos Ortopédicos") {
          return product.categoria.toLowerCase().includes("ortopédico");
        } else if (category === "Produtos Médicos") {
          return product.categoria.toLowerCase().includes("médico");
        } else {
          return product.categoria === category;
        }
      })
    : products;

  return (
    <div>
      <Typography variant="h5" component="div" style={{ marginTop: "16px" }}>
        {category ? `Produtos na categoria: ${category}` : "Todos os Produtos"}
      </Typography>
      <Grid container spacing={2} style={{ marginTop: "16px" }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.nome}
                className="product-image"
                title={product.nome}
                src={product.imagem}
                style={cardMediaStyle}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Categoria: {product.categoria}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Preço: R$ {product.preco.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantidade em Estoque: {product.qntEstoque}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditProduct(product.id)}
                  fullWidth
                  startIcon={<EditIcon />}
                >
                  Editar Produto
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteProduct(product.id)}
                  fullWidth
                  startIcon={<DeleteIcon />}
                >
                  Excluir Produto
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/register/product")}
          fullWidth
        >
          Cadastrar Novo Produto
        </Button>
      </Box>
    </div>
  );
}
