import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IProdutoInterface } from '../../../interfaces/IProduto';

export default function HomeUser() {
  const [products, setProducts] = useState<IProdutoInterface[]>([]);
  const [category, setCategory] = useState<string>('');
  const [cart, setCart] = useState<IProdutoInterface[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProdutoInterface | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [warningMessage, setWarningMessage] = useState<string>('');
  

  useEffect(() => {
    axios
      .get<IProdutoInterface[]>('http://localhost:8080/listarprodutos')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const filteredProducts = category
    ? products.filter((product) => {
        if (category === 'Produtos Ortopédicos') {
          return product.categoria.toLowerCase().includes('ortopédico');
        } else if (category === 'Produtos Médicos') {
          return product.categoria.toLowerCase().includes('médico');
        } else {
          return product.categoria === category;
        }
      })
    : products;

  const addToCart = (product: IProdutoInterface) => {
    setSelectedProduct(product);
    setOpenModal(true);
    setWarningMessage(''); // Limpar qualquer mensagem de aviso anterior.
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const updatedProduct = { ...selectedProduct, quantidade: quantityToAdd };
      const totalQuantityInCart = cart.reduce((total, item) => total + item.qntEstoque, 0);

      if (totalQuantityInCart + quantityToAdd > selectedProduct.qntEstoque) {
        // Verificar se a quantidade no carrinho excede o estoque.
        setWarningMessage('A quantidade selecionada excede o estoque disponível.');
      } else {
        setCart([...cart, updatedProduct]);
        setOpenModal(false);
        setWarningMessage(''); // Limpar qualquer mensagem de aviso anterior.
      }
    }
  };

  return (
    <div>
      <Paper square>
        <Tabs centered>
          <Tab label="Todos" onClick={() => setCategory('')} />
          <Tab
            label="Produtos Ortopédicos"
            onClick={() => setCategory('Produtos Ortopédicos')}
          />
          <Tab label="Produtos Médicos" onClick={() => setCategory('Produtos Médicos')} />
        </Tabs>
      </Paper>
      <Typography variant="h5" component="div" mt={2}>
        {category ? `Produtos na categoria: ${category}` : 'Todos os Produtos'}
      </Typography>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(product)}
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

      
      {selectedProduct && (
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Adicionar ao Carrinho</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedProduct.nome}</Typography>
            <Typography variant="body2">
              Preço: R$ {selectedProduct.preco.toFixed(2)}
            </Typography>
            <TextField
              label="Quantidade"
              type="number"
              value={quantityToAdd}
              onChange={(e) => setQuantityToAdd(parseInt(e.target.value, 10))}
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 1 } }}
            />
            {warningMessage && (
              <Typography variant="body2" color="error">
                {warningMessage}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={handleAddToCart}
              color="primary"
              startIcon={<AddShoppingCartIcon />}
            >
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
