import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight, FiChevronLeft } from 'react-icons/fi';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './CartPage.css';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, cartSubtotal, cartShippingFee, cartTotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">
            <FiShoppingBag />
          </div>
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p>Có vẻ như bạn chưa chọn được sản phẩm ưng ý. Hãy tiếp tục khám phá các bộ sưu tập mới nhất nhé!</p>
          <Link to="/" className="btn-shop-now">
            Tiếp tục mua sắm <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="cart-page-title">Giỏ hàng của bạn <span>({items.length} sản phẩm)</span></h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="cart-summary-panel">
          <h3 className="summary-title">Tóm tắt đơn hàng</h3>
          <div className="summary-details">
            <div className="summary-row">
              <span className="summary-lbl">Tạm tính</span>
              <span className="summary-val">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-lbl">Phí vận chuyển</span>
              <span className="summary-val shipping">
                {cartShippingFee === 0 ? 'Miễn phí' : formatPrice(cartShippingFee)}
              </span>
            </div>
            {cartSubtotal < 500000 && (
              <div className="shipping-promo-alert">
                <span>Miễn phí vận chuyển cho đơn hàng từ <strong>500.000đ</strong>. Mua thêm <strong>{formatPrice(500000 - cartSubtotal)}</strong></span>
              </div>
            )}
            <div className="summary-total-row">
              <span className="total-lbl">Tổng thanh toán</span>
              <span className="total-val">{formatPrice(cartTotal)}</span>
            </div>
          </div>
          <button type="button" className="btn-proceed-checkout" onClick={() => navigate('/checkout')}>
            Tiến hành thanh toán <FiArrowRight />
          </button>
          <Link to="/" className="btn-return-shopping">
            <FiChevronLeft /> Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
