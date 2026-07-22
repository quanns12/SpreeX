import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, getDashboardPathForRole } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import RoleRoute from './components/auth/RoleRoute';
import HomePage from './pages/Home/HomePage';
import ScrollToTop from './components/layout/ScrollToTop';
import LoginPage from './pages/Login/LoginPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import InvoicePage from './pages/Invoice/InvoicePage';
import OrdersPage from './pages/Orders/OrdersPage';
import PaymentDemoPage from './pages/Payment/PaymentDemoPage';
import PaymentReturnPage from './pages/Payment/PaymentReturnPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import ShipperDashboard from './pages/dashboard/ShipperDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';
import AdminRoleDashboard from './pages/dashboard/AdminRoleDashboard';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import InfoPage from './pages/Info/InfoPage';
import ProductsPage from './pages/Products/ProductsPage';
import './App.css';

const DashboardRedirect = () => {
  const saved = localStorage.getItem('shoestore_user');
  if (!saved) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(saved);
    return <Navigate to={getDashboardPathForRole(user?.role)} replace />;
  } catch {
    localStorage.removeItem('shoestore_user');
    return <Navigate to="/login" replace />;
  }
};

const AppLayout = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/payment') ||
    location.pathname.startsWith('/dashboard');

  return (
    <div className="app">
      {!hideLayout && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/info/:pageId" element={<InfoPage />} />
          <Route path="/payment/demo" element={<PaymentDemoPage />} />
          <Route path="/payment/return/vnpay" element={<PaymentReturnPage />} />
          <Route path="/payment/return/momo" element={<PaymentReturnPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice/:orderId"
            element={
              <ProtectedRoute>
                <InvoicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/customer"
            element={
              <RoleRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/customer/orders"
            element={
              <RoleRoute allowedRoles={['customer']}>
                <DashboardLayout role="customer">
                  <OrdersPage />
                </DashboardLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/customer/cart"
            element={
              <RoleRoute allowedRoles={['customer']}>
                <DashboardLayout role="customer">
                  <CartPage />
                </DashboardLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/staff"
            element={
              <RoleRoute allowedRoles={['staff']}>
                <StaffDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/shipper"
            element={
              <RoleRoute allowedRoles={['shipper']}>
                <ShipperDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/manager"
            element={
              <RoleRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminRoleDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <AppLayout />
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
