import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiChevronLeft,
  FiInfo,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from 'react-icons/fi';
import {
  canAccessRouteForRole,
  getDashboardPathForRole,
  useAuth,
} from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const getLandingPath = (role) => {
    if (canAccessRouteForRole(role, from)) {
      return from;
    }
    return getDashboardPathForRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let account;
      if (isRegister) {
        if (!form.name || !form.email || !form.password) {
          throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
        }
        account = await register(
          form.name,
          form.email,
          form.password,
          form.phone,
          form.address
        );
      } else {
        account = await login(form.email, form.password);
      }

      navigate(getLandingPath(account.role), { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-glow-1" />
      <div className="login-bg-glow-2" />

      <div className="login-card-container">
        <div className="login-card">
          <div className="login-logo-container">
            <Link to="/">
              <img src="/logo-transparent.png" alt="SpreeX Logo" className="login-mockup-logo" />
            </Link>
          </div>

          <h1 className="login-title">
            {isRegister ? 'Đăng ký tài khoản' : 'Chào mừng trở lại'}
          </h1>
          <p className="login-subtitle">
            {isRegister
              ? 'Tạo tài khoản mới. Tài khoản đăng ký sẽ mặc định là khách hàng.'
              : 'Đăng nhập tài khoản để vào đúng dashboard theo role.'}
          </p>

          {!isRegister && (
            <div className="demo-credentials-card">
              <div className="demo-header">
                <FiInfo className="info-icon" />
                <span>Tài khoản demo theo role</span>
              </div>
              <div className="demo-body">
                <div className="demo-item">
                  <span className="role-lbl">Customer:</span>
                  <code>demo@spreex.vn</code>
                  <span className="separator">/</span>
                  <code>123456</code>
                </div>
                <div className="demo-item">
                  <span className="role-lbl">Staff:</span>
                  <code>staff@spreex.vn</code>
                  <span className="separator">/</span>
                  <code>staff123</code>
                </div>
                <div className="demo-item">
                  <span className="role-lbl">Shipper:</span>
                  <code>shipper@spreex.vn</code>
                  <span className="separator">/</span>
                  <code>shipper123</code>
                </div>
                <div className="demo-item">
                  <span className="role-lbl">Manager:</span>
                  <code>manager@spreex.vn</code>
                  <span className="separator">/</span>
                  <code>manager123</code>
                </div>
                <div className="demo-item">
                  <span className="role-lbl">Admin:</span>
                  <code>admin@spreex.vn</code>
                  <span className="separator">/</span>
                  <code>admin123</code>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {isRegister && (
              <div className="form-input-group">
                <label htmlFor="name">Họ và tên *</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-input-group">
              <label htmlFor="email">Email *</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-input-group">
              <label htmlFor="password">Mật khẩu *</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            {isRegister && (
              <>
                <div className="form-input-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <div className="input-with-icon">
                    <FiPhone className="input-icon" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0901234567"
                    />
                  </div>
                </div>
                <div className="form-input-group">
                  <label htmlFor="address">Địa chỉ giao hàng</label>
                  <div className="input-with-icon">
                    <FiMapPin className="input-icon" />
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Đường ABC, Quận 1, TP.HCM"
                    />
                  </div>
                </div>
              </>
            )}

            {error && <div className="login-form-error">{error}</div>}

            <button type="submit" className="btn-login-submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </form>

          <div className="login-switch-footer">
            <span>{isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}</span>
            <button
              type="button"
              className="btn-toggle-register"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Đăng nhập tại đây' : 'Đăng ký tài khoản mới'}
            </button>
          </div>

          <Link to="/" className="btn-login-back">
            <FiChevronLeft /> Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
