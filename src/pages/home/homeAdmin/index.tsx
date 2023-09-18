import { useState, useEffect } from "react";
import { Button, Card, CardActions, CardContent, CardMedia,  Grid, Paper, Tab, Tabs, Typography, } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

interface ProdutoInterface {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  imagem: string;
  qntEstoque: number;
}

export default function HomeAdmin() {
  const [products, setProducts] = useState<ProdutoInterface[]>([]);
  const [category, setCategory] = useState<string>("");
  useEffect(() => {
    axios
      .get<ProdutoInterface[]>("http://localhost:8080/listarprodutos")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

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

  

  const handleEditProduct = (productId: number) => {
    // Implemente a lógica para editar um produto com base no ID
    // Isso pode incluir a navegação para uma página de edição de produto ou um modal de edição.
    console.log("Editar produto com o ID:", productId);
  };

  return (
    <div>
      <Paper square>
        <Tabs centered>
          <Tab label="Todos" onClick={() => setCategory("")} />
          <Tab
            label="Produtos Ortopédicos"
            onClick={() => setCategory("Produtos Ortopédicos")}
          />
          <Tab
            label="Produtos Médicos"
            onClick={() => setCategory("Produtos Médicos")}
          />
        </Tabs>
      </Paper>
      <Typography variant="h5" component="div" mt={2}>
        {category ? `Produtos na categoria: ${category}` : "Todos os Produtos"}
      </Typography>
      <Grid container spacing={2} mt={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.nome}
                className="product-image" // Adicione a classe product-image aqui
                title={product.nome}
                src={product.imagem} // Use a propriedade src para a imagem
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
