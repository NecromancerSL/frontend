import { useState } from "react";
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
import Cart from "../pages/carrinho"; // Certifique-se de que o caminho do import está correto
import { IProdutoInterface } from "../interfaces/Produto";
import { UserProvider } from "../context/UserContext";


export default function AppRouter() {
  const [cart, setCart] = useState<IProdutoInterface[]>([]);

  const removeFromCart = (product: IProdutoInterface) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  return (
    <UserProvider>
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
          <Route
            path="/carrinho"
            element={<Cart cart={cart} onRemoveFromCart={removeFromCart} />}
          />
      </Routes>
    </Router>
    </UserProvider>
    
  );
}
