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
      </Routes>
      <Footer />
    </Router>
  );
}
