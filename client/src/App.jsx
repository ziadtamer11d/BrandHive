import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, WishlistProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ExploreBrands from './pages/ExploreBrands';
import BrandPage from './pages/BrandPage';
import ListingPage from './pages/ListingPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerRegistration from './pages/SellerRegistration';
import SupportChat from './pages/SupportChat';
import UserDashboard from './pages/dashboards/UserDashboard';
import SellerDashboard from './pages/dashboards/SellerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-navy border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
}

function Layout({ children, noFooter = false }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/explore" element={<Layout><ExploreBrands /></Layout>} />
      <Route path="/brands" element={<Layout><ExploreBrands /></Layout>} />
      <Route path="/brand/:slug" element={<Layout><BrandPage /></Layout>} />
      <Route path="/products" element={<Layout><ListingPage /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductPage /></Layout>} />
      <Route path="/cart" element={<Layout noFooter><CartPage /></Layout>} />
      <Route path="/global" element={<Layout><ListingPage /></Layout>} />
      <Route path="/chat" element={<Layout noFooter><SupportChat /></Layout>} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Seller registration */}
      <Route path="/sell" element={<SellerRegistration />} />

      {/* Protected: Customer */}
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Layout><UserDashboard /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Protected: Seller */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute requiredRole="seller">
            <Layout><SellerDashboard /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Protected: Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <Layout><AdminDashboard /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={
        <Layout>
          <div className="min-h-screen flex items-center justify-center bg-brand-cream">
            <div className="text-center">
              <div className="text-8xl mb-4">🐝</div>
              <h1 className="text-4xl font-display font-bold text-brand-navy mb-2">404</h1>
              <p className="text-gray-500 mb-6">This page doesn't exist.</p>
              <a href="/" className="btn-primary">Back to Home</a>
            </div>
          </div>
        </Layout>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  fontFamily: 'Inter, sans-serif',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
