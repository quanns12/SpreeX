import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiMapPin, FiFileText, FiCreditCard, FiArrowRight } from 'react-icons/fi';
import CartItem from '../../components/cart/CartItem';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { api } from '../../services/api';
import { formatPrice } from '../../data/products';
import './CheckoutPage.css';

const PAYMENT_LABELS = {
  cod: 'Thanh toán khi nhận hàng (COD)',
  vnpay: 'VNPay — Thẻ ATM / Visa / QR',
  momo: 'Ví điện tử MoMo',
  payos: 'Cổng payOS — QR VietQR chuyển khoản',
};

const CheckoutPage = () => {
  const { user } = useAuth();
  const { checkoutItems, subtotal, shippingFee, total, clearCart, clearBuyNow, isBuyNow } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    note: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (checkoutItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      setError('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isOnlinePayment = ['vnpay', 'momo', 'payos'].includes(paymentMethod);

      const order = await createOrder({
        userId: user.id,
        items: checkoutItems,
        subtotal,
        shippingFee,
        total,
        shippingInfo,
        paymentMethod,
        status: isOnlinePayment ? 'pending_payment' : 'processing',
      });

      if (paymentMethod === 'vnpay') {
        const { payUrl } = await api.payment.createVNPay({
          orderId: order.id,
          amount: total,
          orderInfo: `Thanh toan don hang ${order.id}`,
        });
        window.location.href = payUrl;
        return;
      }

      if (paymentMethod === 'momo') {
        const { payUrl } = await api.payment.createMoMo({
          orderId: order.id,
          amount: total,
          orderInfo: `Thanh toan don hang ${order.id}`,
        });
        window.location.href = payUrl;
        return;
      }

      if (paymentMethod === 'payos') {
        const { payUrl } = await api.payment.createPayOS({
          orderId: order.id,
          amount: total,
          orderInfo: `Thanh toan don hang ${order.id}`,
        });
        window.location.href = payUrl;
        return;
      }

      if (isBuyNow) clearBuyNow();
      else clearCart();

      navigate(`/invoice/${order.id}`, { state: { justPaid: true } });
    } catch (err) {
      setError(err.message || 'Thanh toán thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="checkout-page-title">Xác nhận thanh toán</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="checkout-section">
            <h2 className="section-title"><FiUser className="sec-icon" /> Thông tin giao hàng</h2>
            
            <div className="form-grid-row">
              <div className="form-input-group">
                <label htmlFor="name">Họ và tên người nhận *</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input id="name" name="name" value={shippingInfo.name} onChange={handleChange} required placeholder="Nguyễn Văn A" />
                </div>
              </div>
              
              <div className="form-input-group">
                <label htmlFor="phone">Số điện thoại liên hệ *</label>
                <div className="input-with-icon">
                  <FiPhone className="input-icon" />
                  <input id="phone" name="phone" type="tel" value={shippingInfo.phone} onChange={handleChange} required placeholder="0901234567" />
                </div>
              </div>
            </div>

            <div className="form-input-group">
              <label htmlFor="address">Địa chỉ nhận hàng *</label>
              <div className="input-with-icon">
                <FiMapPin className="input-icon" />
                <input id="address" name="address" value={shippingInfo.address} onChange={handleChange} required placeholder="123 Đường số 4, Phường 5, Quận 10, TP.HCM" />
              </div>
            </div>

            <div className="form-input-group">
              <label htmlFor="note">Ghi chú giao hàng</label>
              <div className="input-with-icon">
                <FiFileText className="input-icon-textarea" />
                <textarea id="note" name="note" value={shippingInfo.note} onChange={handleChange} rows={2} placeholder="Ghi chú thêm cho shipper (Ví dụ: giao giờ hành chính, gọi trước khi đến...)" />
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <h2 className="section-title"><FiCreditCard className="sec-icon" /> Phương thức thanh toán</h2>
            <div className="payment-options-grid">
              {[
                { value: 'cod', logoText: '💵', label: PAYMENT_LABELS.cod, desc: 'Thanh toán tiền mặt trực tiếp khi nhận hàng.' },
                { value: 'vnpay', logoText: '🏦', label: PAYMENT_LABELS.vnpay, desc: 'Thanh toán qua ví điện tử VNPay hoặc thẻ ngân hàng nội địa/quốc tế.' },
                { value: 'momo', logoText: '📱', label: PAYMENT_LABELS.momo, desc: 'Thanh toán qua ứng dụng ví điện tử MoMo siêu tốc.' },
                { value: 'payos', logoText: '💳', label: PAYMENT_LABELS.payos, desc: 'Thanh toán bằng chuyển khoản ngân hàng qua mã VietQR siêu tốc.' },
              ].map(({ value, logoText, label, desc }) => (
                <label key={value} className={`payment-option-card ${paymentMethod === value ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="payment-radio-input"
                  />
                  <div className="payment-card-content">
                    <span className="payment-logo-icon">{logoText}</span>
                    <div className="payment-text-info">
                      <span className="payment-label-title">{label}</span>
                      <span className="payment-desc-text">{desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            {['vnpay', 'momo', 'payos'].includes(paymentMethod) && (
              <div className="online-payment-hint">
                <span>Bạn sẽ được tự động chuyển hướng đến cổng thanh toán bảo mật của <strong>{paymentMethod === 'vnpay' ? 'VNPay' : paymentMethod === 'momo' ? 'MoMo' : 'payOS'}</strong> để tiến hành xác thực giao dịch sau khi bấm nút thanh toán.</span>
              </div>
            )}
          </section>

          {error && <div className="checkout-error-alert">{error}</div>}

          <button type="submit" className="btn-submit-order" disabled={loading}>
            {loading ? (
              'Đang xử lý giao dịch...'
            ) : (
              <>
                {paymentMethod === 'cod' ? 'Xác nhận đặt hàng ngay' : `Thanh toán qua ${paymentMethod === 'vnpay' ? 'VNPay' : paymentMethod === 'momo' ? 'MoMo' : 'payOS'}`}
                <span className="btn-total-accent">({formatPrice(total)})</span>
                <FiArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="checkout-summary-sidebar">
          <h3 className="summary-sidebar-title">Đơn hàng của bạn <span>({checkoutItems.length})</span></h3>
          <div className="checkout-items-scrollable">
            {checkoutItems.map((item) => (
              <CartItem key={item.id} item={item} readOnly />
            ))}
          </div>
          <div className="summary-bill-details">
            <div className="bill-row">
              <span>Tạm tính</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="bill-row">
              <span>Phí vận chuyển</span>
              <span className="shipping-fee-val">{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
            </div>
            <div className="bill-row-total">
              <span>Tổng thanh toán</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
