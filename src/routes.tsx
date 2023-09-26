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
import { useState } from 'react';

export default function AppRouter() {
    const [cart, setCart] = useState([]); // Define the cart state variable

    const removerDoCarrinho = (produtoId) => {
        // implementation of the function to remove the product from the cart
        setCart(cart.filter((produto) => produto.id !== produtoId));
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
                <Route path="/carrinho" element={<CarrinhoPage carrinho={cart} removerDoCarrinho={removerDoCarrinho} />} />
            </Routes>

            <Footer />
        </Router>
    );
}
