import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slice/cartReducer';
import { Product } from '../../../types/product';
import api from '../../../services/api';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Snackbar,
} from '@mui/material';

const cardMediaStyle: React.CSSProperties = {
  width: 150,
  height: 150,
  objectFit: 'cover',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar a mensagem de confirmação
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get<Product[]>('/listarprodutos')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    if (quantityToAdd <= 0) {
      alert('A quantidade deve ser maior que zero.');
      return;
    } else if (quantityToAdd > product.qntEstoque) {
      alert('Quantidade desejada maior que a quantidade em estoque');
      return;
    }

    dispatch(addToCart({ ...product, amount: quantityToAdd }));
    setSelectedProduct(product);
    setQuantityToAdd(1);
    setShowConfirmation(true);
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
                  onClick={() => handleAddToCart(product)}
                  fullWidth
                  style={{ marginTop: '16px' }}
                >
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {showConfirmation && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showConfirmation}
          autoHideDuration={3000}
          onClose={() => setShowConfirmation(false)}
          message={`Produto "${selectedProduct?.nome}" adicionado ao carrinho.`}
        />
      )}
    </div>
  );
}
  