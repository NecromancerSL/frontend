
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import CadastroProduto from "../pages/cadastroProduto";
import CadastroUsuario from "../pages/cadastroUsuario";
import EditarProduto from "../pages/editarProduto";
import Home from "../pages/home";
import DashboardAdmin from "../pages/dashboard/dashboardAdmin";
import DashboardUser from "../pages/dashboard/dashboardUser";
import ProfilePage from "../pages/perfilUsuario";
import Login from "../pages/login";
import Cart from "../pages/carrinho";
import { UserProvider } from "../context/UserContext";
import { CartProvider } from "../context/CartContext"; // Importe o CartProvider

export default function AppRouter() {
  return (
    <UserProvider>
      <CartProvider> {/* Forneça o contexto do carrinho aqui */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboarduser" element={<DashboardUser />} />
            <Route path="/dashboardadmin" element={<DashboardAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrousuario" element={<CadastroUsuario />} />
            <Route path="/cadastroproduto" element={<CadastroProduto />} />
            <Route path="/editarproduto/:id" element={<EditarProduto />} />
            <Route path="/perfilusuario" element={<ProfilePage />} />
            <Route path="/carrinho" element={<Cart />} /> {/* Agora você pode acessar o contexto do carrinho em Cart */}
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

