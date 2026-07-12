import React from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { formatPrice } from '../../data/products';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove, readOnly = false }) => (
  <div className="cart-item">
    <div className="cart-item-img-container">
      <img src={item.image} alt={item.name} className="cart-item-image" />
    </div>
    <div className="cart-item-details">
      <span className="cart-item-brand">{item.brand}</span>
      <h4 className="cart-item-name">{item.name}</h4>
      <div className="cart-item-variant">
        <span className="variant-pill">Size: {item.size}</span>
        <span className="variant-pill">Màu: {item.color}</span>
      </div>
      <p className="cart-item-price">{formatPrice(item.price)}</p>
    </div>
    <div className="cart-item-actions">
      {!readOnly ? (
        <>
          <div className="quantity-control-sm">
            <button 
              type="button" 
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
              disabled={item.quantity <= 1}
            >
              <FiMinus />
            </button>
            <span className="qty-val">{item.quantity}</span>
            <button 
              type="button" 
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <FiPlus />
            </button>
          </div>
          <button type="button" className="btn-remove" onClick={() => onRemove(item.id)} title="Xóa sản phẩm">
            <FiTrash2 /> <span>Xóa</span>
          </button>
        </>
      ) : (
        <span className="cart-item-qty">Số lượng: <strong>{item.quantity}</strong></span>
      )}
      <div className="cart-item-total-wrap">
        <span className="total-lbl">Thành tiền:</span>
        <p className="cart-item-total">{formatPrice(item.price * item.quantity)}</p>
      </div>
    </div>
  </div>
);

export default CartItem;
