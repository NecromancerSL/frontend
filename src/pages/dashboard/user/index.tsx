import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Product } from '../../../types/product';
import { Paper, Typography, Grid, Card, CardMedia, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();

  useEffect(() => {
    api
      .get<Product[]>('http://localhost:8080/listarprodutos')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <div>
      <Paper square>
        <Typography variant="h5" component="div" mt={2}>
          Produtos Disponíveis
        </Typography>
      </Paper>
      <Grid container spacing={2} mt={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.nome}
                className="product-image"
                title={product.nome}
                src={product.imagem}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Categoria: {product.categoria}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Marca: {product.marca}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Preço: R$ {product.preco.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantidade em Estoque: {product.qntEstoque}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openProductModal(product)}
                  fullWidth
                  style={{ marginTop: '16px' }}
                >
                  Detalhes do Produto
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedProduct && (
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Detalhes do Produto</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedProduct.nome}</Typography>
            <Typography variant="body2">
              Preço: R$ {selectedProduct.preco.toFixed(2)}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
