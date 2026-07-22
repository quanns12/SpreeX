import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiStar, FiMinus, FiPlus, FiShoppingCart, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById, loading } = useProducts();
  const product = getProductById(id);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, setBuyNow } = useCart();

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (product) {
      setSize(product.sizes[0] || '');
      setColor(product.colors[0] || '');
      setQuantity(1);
      setImgSrc(product.image);
    }
  }, [product]);

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80');
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner" />
          <p>Đang tải chi tiết sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container">
        <div className="not-found-card">
          <h2>Sản phẩm không tồn tại</h2>
          <Link to="/" className="btn-back-home">
            <FiChevronLeft /> Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const requireAuth = (action) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/${id}` } });
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    addToCart(product, size, color, quantity);
    setMessage('Đã thêm vào giỏ hàng thành công!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleBuyNow = () => {
    if (!requireAuth()) return;
    setBuyNow(product, size, color, quantity);
    navigate('/checkout');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="page-container">
      <div className="product-detail-layout">
        {/* Breadcrumb back */}
        <div className="detail-breadcrumb">
          <Link to="/" className="breadcrumb-back">
            <FiChevronLeft /> Quay lại danh sách sản phẩm
          </Link>
        </div>

        <div className="product-detail-grid">
          {/* Product Image Column */}
          <div className="detail-image-sec">
            <div className="image-card">
              <img 
                src={imgSrc} 
                alt={product.name} 
                className="main-product-img" 
                onError={handleImageError} 
              />
              {discount > 0 && <span className="detail-discount-tag">-{discount}% Off</span>}
            </div>
          </div>

          {/* Product Info Column */}
          <div className="detail-info-sec">
            <span className="info-brand">{product.brand}</span>
            <h1 className="info-title">{product.name}</h1>
            
            <div className="info-rating-row">
              <div className="rating-badge">
                <FiStar className="star-icon-filled" />
                <span>{product.rating}</span>
              </div>
              <span className="divider">•</span>
              <span className="sold-count">Đã bán {product.sold} sản phẩm</span>
            </div>

            <div className="info-prices-row">
              <span className="info-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="info-original-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="info-desc">{product.description}</p>

            {/* Select Options */}
            <div className="detail-options-container">
              {product.sizes && product.sizes.length > 0 && (
                <div className="option-select-group">
                  <label className="option-label">Chọn Kích Thước (Size)</label>
                  <div className="option-pills">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`pill-btn ${size === s ? 'selected' : ''}`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="option-select-group">
                  <label className="option-label">Chọn Màu Sắc</label>
                  <div className="option-pills">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`pill-btn ${color === c ? 'selected' : ''}`}
                        onClick={() => setColor(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="option-select-group">
                <label className="option-label">Số Lượng Mua</label>
                <div className="qty-control">
                  <button 
                    type="button" 
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="qty-num">{quantity}</span>
                  <button 
                    type="button" 
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>

            {message && (
              <div className="toast-success-message">
                <FiCheckCircle className="toast-icon" />
                <span>{message}</span>
              </div>
            )}

            <div className="detail-action-buttons">
              <button type="button" className="btn-add-to-cart" onClick={handleAddToCart}>
                <FiShoppingCart /> Thêm vào giỏ hàng
              </button>
              <button type="button" className="btn-buy-now-lg" onClick={handleBuyNow}>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
