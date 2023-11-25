import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slice/cartReducer';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { Product } from '../../../types/product';
import { Button, Card, CardContent, CardMedia, Grid, MenuItem, Paper, Select, Snackbar, Typography, } from '@mui/material';

const cardMediaStyle: React.CSSProperties = {
  width: 150,
  height: 150,
  objectFit: 'cover',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const brands = ['Mercur', 'Hidrolight', 'Orthopauher', 'Dilepé', 'Chantal'];
const types = ['Botas', 'Tipoias', 'Cintas', 'Corretor', 'Meias'];
const priceRanges = [
  'Todos os Preços',
  'R$ 0 - R$50.00',
  'R$ 51.00 - R$100.00',
  'R$ 101.00 - R$150.00',
  'R$ 151.00 - R$200.00',
  'R$ 201.00 +',
];

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('Todos os Produtos');
  const [selectedType, setSelectedType] = useState('Tipos de Produtos');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('Todos os Preços');
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get<Product[]>('/listarprodutos')
      .then((response) => {
        // Sort products alphabetically by name
        const sortedProducts = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setProducts(sortedProducts);
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

  const checkPriceRange = (price: number): boolean => {
    switch (selectedPriceRange) {
      case 'R$ 0 - R$50.00':
        return price >= 0 && price <= 50;
      case 'R$ 51.00 - R$100.00':
        return price > 50 && price <= 100;
      case 'R$ 101.00 - R$150.00':
        return price > 100 && price <= 150;
      case 'R$ 151.00 - R$200.00':
        return price > 150 && price <= 200;
      case 'R$ 201.00 +':
        return price > 200;
      default:
        return true;
    }
  };

  const filterProducts = () => {
    let filtered = products
      .filter(
        (product) =>
          (selectedBrand === 'Todos os Produtos' || product.marca === selectedBrand) &&
          (selectedType === 'Tipos de Produtos' || product.categoria === selectedType) &&
          (selectedPriceRange === 'Todos os Preços' || checkPriceRange(product.preco))
      )
      .sort((a, b) => a.nome.localeCompare(b.nome)); // Sort filtered products alphabetically

    if (selectedPriceRange !== 'Todos os Preços') {
      // If price range is selected, sort by price in ascending order
      filtered = filtered.sort((a, b) => a.preco - b.preco);
    }

    return filtered;
  };

  const filteredProducts = filterProducts();

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
            <Select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)}>
              <MenuItem value="Todos os Produtos">Todos os Produtos</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
            <Select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              <MenuItem value="Tipos de Produtos">Tipos de Produtos</MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedPriceRange}
              onChange={(event) => setSelectedPriceRange(event.target.value as string)}
            >
              {priceRanges.map((range) => (
                <MenuItem key={range} value={range}>
                  {range}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Paper>

      {filteredProducts.length === 0 ? (
        <Typography variant="h6" component="div" mt={2}>
          Nenhum produto encontrado.
        </Typography>
      ) : (
        <Grid container spacing={2} mt={2}>
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
                  <Link to={`/product/${product.id}`}>
                    <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                      Ver Detalhes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
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