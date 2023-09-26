import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HomeUser from './pages/home/homeUser';
import Login from './pages/login';
import CadastroUsuario from './pages/cadastroUsuario';
import CadastroProduto from './pages/cadastroProduto';
import HomeAdmin from './pages/home/homeAdmin';
import EditarProduto from './pages/editarProduto';
import CarrinhoPage from './pages/carrinho';
import { IProdutoInterface } from './interfaces/IProduto';
export default function AppRouter() {
  // Defina o estado cart e a função removerDoCarrinho aqui
  const [cart, setCart] = useState([] as IProdutoInterface[]);
  
  const removerDoCarrinho = (produto: IProdutoInterface) => {
    // Implemente a lógica para remover um produto do carrinho
    // Certifique-se de atualizar o estado do carrinho (cart) corretamente
    setCart((prevCart) => prevCart.filter((item) => item.id !== produto.id));
  };

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        <Route path="/cadastroproduto" element={<CadastroProduto />} />
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/editarproduto/:id" element={<EditarProduto />} />
        /* <CarrinhoPage
      carrinho={cart as IProdutoInterface[]} // Especifique o tipo corretamente
      removerDoCarrinho={removerDoCarrinho as (produto: IProdutoInterface) => void} // Especifique o tipo corretamente
    /> */
      </Routes>

      <Footer />
    </Router>
  );
}