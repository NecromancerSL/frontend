import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { IProdutoInterface } from '../../interfaces/IProduto';

interface CarrinhoPageProps {
  carrinho: IProdutoInterface[];
  removerDoCarrinho: (produto: IProdutoInterface) => void;
}

function CarrinhoPage({ carrinho, removerDoCarrinho }: CarrinhoPageProps) {
  return (
    <div>
      <Typography variant="h5">Carrinho de Compras</Typography>
      {carrinho.length === 0 ? (
        <Typography variant="body1">Seu carrinho está vazio.</Typography>
      ) : (
        <List>
          {carrinho.map((produto) => (
            <ListItem key={produto.id}>
              <ListItemText
                primary={produto.nome}
                secondary={`Quantidade: ${produto.qntEstoque} - R$ ${(
                  produto.preco * produto.qntEstoque
                ).toFixed(2)}`}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removerDoCarrinho(produto)}
              >
                Remover
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default CarrinhoPage;
