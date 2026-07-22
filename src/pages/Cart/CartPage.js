import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight, FiChevronLeft, FiStar, FiGift } from 'react-icons/fi';
import CartItem from '../../components/cart/CartItem';
import ProductCard from '../../components/product/ProductCard';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';
import './CartPage.css';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, cartSubtotal, cartShippingFee, cartTotal } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  // Free shipping logic
  const FREE_SHIPPING_LIMIT = 500000;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_LIMIT;
  const shippingProgress = Math.min((cartSubtotal / FREE_SHIPPING_LIMIT) * 100, 100);
  const remainingForFree = FREE_SHIPPING_LIMIT - cartSubtotal;

  // Filter 4 recommended products (excluding those already in cart)
  const cartItemIds = items.map(item => item.id);
  const suggestions = products
    ? products.filter(p => !cartItemIds.includes(p.id)).slice(0, 4)
    : [];

  if (items.length === 0) {
    return (
      <div className="page-container empty-cart-page-wrap">
        <div className="empty-cart-card animate-fade-in">
          <div className="empty-cart-icon">
            <FiShoppingBag />
            <div className="empty-cart-icon-pulse"></div>
          </div>
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p>Có vẻ như bạn chưa chọn được sản phẩm ưng ý. Hãy tiếp tục khám phá các bộ sưu tập mới nhất nhé!</p>
          <Link to="/products" className="btn-shop-now">
            Tiếp tục mua sắm <FiArrowRight />
          </Link>
        </div>

        {suggestions.length > 0 && (
          <div className="suggested-section animate-slide-up">
            <div className="suggested-header">
              <FiStar className="suggested-icon" />
              <h3>Có thể bạn sẽ thích</h3>
            </div>
            <div className="suggested-products-grid">
              {suggestions.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="cart-header-row">
        <h1 className="cart-page-title">
          Giỏ hàng của bạn <span>({items.length} sản phẩm)</span>
        </h1>
        <Link to="/products" className="btn-back-to-shop">
          <FiChevronLeft /> Tiếp tục mua sắm
        </Link>
      </div>

      <div className="cart-layout">
        <div className="cart-items animate-fade-in">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="cart-summary-panel animate-slide-up">
          <h3 className="summary-title">Tóm tắt đơn hàng</h3>
          
          {/* Premium Free Shipping Progress Bar */}
          <div className="shipping-progress-card">
            <div className="progress-info">
              {isFreeShipping ? (
                <div className="free-shipping-success">
                  <FiGift className="shipping-gift-icon animate-bounce" />
                  <span>Đơn hàng của bạn đã đủ điều kiện nhận <strong>Miễn phí vận chuyển!</strong></span>
                </div>
              ) : (
                <span className="free-shipping-need">
                  Mua thêm <strong>{formatPrice(remainingForFree)}</strong> để được <strong>Miễn phí vận chuyển</strong>
                </span>
              )}
            </div>
            <div className="progress-track">
              <div 
                className={`progress-fill ${isFreeShipping ? 'success' : ''}`} 
                style={{ width: `${shippingProgress}%` }}
              >
                {!isFreeShipping && <div className="progress-shimmer"></div>}
              </div>
            </div>
          </div>

          <div className="summary-details">
            <div className="summary-row">
              <span className="summary-lbl">Tạm tính</span>
              <span className="summary-val">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-lbl">Phí vận chuyển</span>
              <span className={`summary-val shipping-val ${isFreeShipping ? 'free' : ''}`}>
                {isFreeShipping ? 'Miễn phí' : formatPrice(cartShippingFee)}
              </span>
            </div>
            <div className="summary-total-row">
              <span className="total-lbl">Tổng thanh toán</span>
              <span className="total-val">{formatPrice(cartTotal)}</span>
            </div>
          </div>
          <button type="button" className="btn-proceed-checkout" onClick={() => navigate('/checkout')}>
            Tiến hành thanh toán <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
