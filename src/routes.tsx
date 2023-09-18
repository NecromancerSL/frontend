import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './pages/cadastroUsuario';
import Login from './pages/login'
import CadastroProduto from './pages/cadastroProduto'
import Header from './components/header'
import Footer from './components/footer'
import HomeUser from './pages/home';
import HomeAdmin from './pages/home/homeAdmin';

export default function AppRouter() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomeUser />} />
                <Route path="/login" element={<Login />} />
                {<Route path="/cadastroUsuario" element={<CadastroUsuario />} /> }
                {<Route path="/cadastroProduto" element={<CadastroProduto />} /> } 
                {<Route path="/homeadmin" element={<HomeAdmin />} />}
            </Routes>
            <Footer />
        </Router>
    )
}