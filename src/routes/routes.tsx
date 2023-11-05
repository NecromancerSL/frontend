import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Home from '../pages/home';
import Login from '../pages/login';
import UserDashboard from '../pages/dashboard/user';
import AdminDashboard from '../pages/dashboard/admin';
import UserRegister from '../pages/register/user';
import UserProfile from '../pages/profile';
import EditUserProfile from '../pages/update/user';
import ProductRegister from '../pages/register/product';
import AddressRegister from '../pages/register/address';
import EditProduct from '../pages/update/product';
import EditAddress from '../pages/update/address';
import EditUserPassword from '../pages/update/password';
import DashboardAdminProducts from '../pages/dashboard/admin/product';
import NotFound from '../pages/notfound';
import CartPage from '../pages/cart';
import ProductDetail from '../pages/details';
import PedidoList from '../pages/dashboard/admin/pedido';

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/profile/:id/edit" element={<EditUserProfile />} />
        <Route path="/register/product" element={<ProductRegister />} />
        <Route path="/register/address" element={<AddressRegister />} />
        <Route path="/update/product/:id" element={<EditProduct />} />
        <Route path="/edit/address/:enderecoId" element={<EditAddress />} />
        <Route path="/update/password" element={<EditUserPassword />} />
        <Route path="/dashboard/admin/products" element={<DashboardAdminProducts />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product/:produtoid' element={<ProductDetail />} />
        <Route path='/dashboard/admin/pedidos' element={<PedidoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
