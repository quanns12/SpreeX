import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import {
  FiActivity,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiShoppingBag,
  FiSun,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { canAccessAdminArea } from '../../permissions';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated, getDashboardPathForRole } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shoestore_theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('shoestore_theme', nextTheme);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;
  const dashboardPath = getDashboardPathForRole(user?.role);
  const showAdminPanel = canAccessAdminArea(user?.role);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-mockup-wrap">
            <img src="/logo-transparent.png" alt="SpreeX Logo" className="header-brand-logo" />
          </div>
          <span className="logo-text">
            Spree<span className="logo-accent">X</span>
          </span>
        </Link>

        <nav className="nav-desktop">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Sản phẩm
          </Link>
          {isAuthenticated && (
            <Link
              to="/orders"
              className={`nav-link ${isActive('/orders') ? 'active' : ''}`}
            >
              Đơn hàng
            </Link>
          )}
          {showAdminPanel && (
            <Link to="/admin" className="nav-link admin-link">
              <FiActivity className="admin-icon" /> Admin Panel
            </Link>
          )}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
            aria-label="Theme toggle"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          <Link to="/cart" className="cart-btn" aria-label="Giỏ hàng">
            <FiShoppingBag className="cart-icon" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to={dashboardPath}
                className="user-profile-menu"
                title="Dashboard theo vai trò"
              >
                <div className="user-avatar-wrap">
                  <FiUser className="user-icon" />
                </div>
                <span className="user-name">{user.name.split(' ').pop()}</span>
              </Link>
              <button
                type="button"
                className="btn-logout"
                onClick={handleLogout}
                title="Đăng xuất"
              >
                <FiLogOut />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login">
              Đăng nhập
            </Link>
          )}

          <button
            type="button"
            className="btn-menu-mobile"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div className={`nav-mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="nav-mobile">
          <Link
            to="/"
            className={`nav-mobile-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Sản phẩm
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/orders"
                className={`nav-mobile-link ${isActive('/orders') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Đơn hàng
              </Link>
              <Link
                to={dashboardPath}
                className={`nav-mobile-link ${
                  location.pathname.startsWith('/dashboard') ? 'active' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard của tôi
              </Link>
            </>
          )}
          {showAdminPanel && (
            <Link
              to="/admin"
              className="nav-mobile-link admin-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}
          {isAuthenticated ? (
            <button type="button" className="btn-logout-mobile" onClick={handleLogout}>
              <FiLogOut /> Đăng xuất
            </button>
          ) : (
            <Link
              to="/login"
              className="btn-login-mobile"
              onClick={() => setMobileMenuOpen(false)}
            >
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
