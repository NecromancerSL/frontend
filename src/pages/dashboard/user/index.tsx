import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slice/cartReducer';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/product';
import api from '../../../services/api';
import { Paper, Typography, Select, MenuItem, Grid, Card, CardMedia, CardContent, Button, Snackbar } from '@mui/material';

const cardMediaStyle: React.CSSProperties = {
  width: 150,
  height: 150,
  objectFit: 'cover',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const brands = ['Mercur', 'Marca 2', 'Marca 3', 'Marca 4', 'Marca 5'];
const types = ['Botas', 'Tipo 2', 'Tipo 3', 'Tipo 4', 'Tipo 5'];

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('Todos os Produtos');
  const [selectedType, setSelectedType] = useState('Tipos de Produtos');
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

  const filterProducts = () => {
    if (selectedBrand === 'Todos os Produtos' && selectedType === 'Tipos de Produtos') {
      return products;
    } else if (selectedBrand !== 'Todos os Produtos' && selectedType === 'Tipos de Produtos') {
      return products.filter((product) => product.marca === selectedBrand);
    } else if (selectedBrand === 'Todos os Produtos' && selectedType !== 'Tipos de Produtos') {
      return products.filter((product) => product.categoria === selectedType);
    } else {
      return products.filter((product) => product.marca === selectedBrand && product.categoria === selectedType);
    }
  };

  return (
    <div>
      <br />
      <Paper square>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div" mt={2}>
            {selectedBrand !== 'Todos os Produtos' || selectedType !== 'Tipos de Produtos'
              ? selectedBrand !== 'Todos os Produtos' && selectedType !== 'Tipos de Produtos'
                ? `${selectedBrand} e ${selectedType}`
                : selectedBrand !== 'Todos os Produtos'
                ? selectedBrand
                : selectedType
              : 'Todos os Produtos'}
          </Typography>
          <div style={{ display: 'flex' }}>
            <Select
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
            >
              <MenuItem value="Todos os Produtos">Todos os Produtos</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              <MenuItem value="Tipos de Produtos">Tipos de Produtos</MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Paper>
      <Grid container spacing={2} mt={2}>
        {filterProducts().map((product) => (
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
                  style={{ marginTop: '8px' }}
                >
                  Adicionar ao Carrinho
                </Button>
                <br />
                <Link to={`/product/${product.id}`}> {/* Correção aqui */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '16px' }}
                  >
                    Ver Detalhes
                  </Button>
                </Link>
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
