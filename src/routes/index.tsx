import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* import Footer from "../components/footer"; */
import Header from "../components/header";
import CadastroProduto from "../pages/cadastroProduto";
import CadastroUsuario from "../pages/cadastroUsuario";
import EditarProduto from "../pages/editarProduto";
import Home from "../pages/home";
import DashboardAdmin from "../pages/dashboard/dashboardAdmin";
import DashboardUser from "../pages/dashboard/dashboardUser";
import ProfilePage from "../pages/perfilUsuario";
import Login from "../pages/login";


export default function AppRouter() {
    return (
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
            </Routes>
            {/* <Footer /> */}
        </Router>
  );
} 