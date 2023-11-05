import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/product";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';

const cardMediaStyle: React.CSSProperties = {
  width: 150,
  height: 150,
  objectFit: "cover",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const addButtonStyle: React.CSSProperties = {
  marginTop: "16px",
  marginLeft: "auto", // Move o botão para o canto direito
  marginRight: "16px",
};

export default function DashboardAdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category] = useState("");

  useEffect(() => {
    api
      .get("/listarprodutos")
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" component="div" style={{ marginTop: "16px", flex: 1 }}>
          {category ? `Produtos na categoria: ${category}` : "Todos os Produtos"}
        </Typography>
        <Link to="/register/product" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" style={addButtonStyle}>
            Adicionar Novo Produto
          </Button>
        </Link>
      </div>
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
    </div>
  );
}
