import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import CadastroUsuario from './pages/cadastroUsuario';
//import Login from './pages/login'
import CadastroProduto from './pages/cadastroProduto'
import Header from './components/header'
import Footer from './components/footer'

export default function AppRouter() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<CadastroProduto />} />
            </Routes>
            <Footer />
        </Router>
    )
}