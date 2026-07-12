import React from 'react';
import { formatPrice } from '../../data/products';
import './InvoiceView.css';

const PAYMENT_LABELS = {
  cod: 'Thanh toán khi nhận hàng (COD)',
  vnpay: 'VNPay',
  momo: 'Ví MoMo',
  bank: 'Chuyển khoản ngân hàng',
};

const STATUS_LABELS = {
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
  pending: 'Đang xử lý',
  pending_payment: 'Chờ thanh toán',
  processing: 'Đang xử lý',
};

const InvoiceView = ({ order, user, showPrint = true }) => {
  const date = new Date(order.createdAt).toLocaleString('vi-VN');

  const handlePrint = () => window.print();

  return (
    <div className="invoice">
      <div className="invoice-header">
        <div>
          <h1 className="invoice-title">HÓA ĐƠN BÁN HÀNG</h1>
          <p className="invoice-store">SpreeX — Giày dép & Thời trang</p>
        </div>
        <div className="invoice-meta">
          <p><strong>Mã đơn:</strong> {order.id}</p>
          <p><strong>Ngày:</strong> {date}</p>
          <span className={`invoice-status status-${order.status}`}>
            {STATUS_LABELS[order.status] || order.status}
          </span>
        </div>
      </div>

      <div className="invoice-parties">
        <div>
          <h3>Người mua</h3>
          <p>{order.shippingInfo.name || user?.name}</p>
          <p>{order.shippingInfo.phone}</p>
          <p>{order.shippingInfo.address}</p>
        </div>
        <div>
          <h3>Thanh toán</h3>
          <p>{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Size / Màu</th>
            <th>SL</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx}>
              <td>
                <div className="invoice-product">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.brand}</span>
                  </div>
                </div>
              </td>
              <td>{item.size} / {item.color}</td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.price)}</td>
              <td>{formatPrice(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-summary">
        <div className="summary-row">
          <span>Tạm tính</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Phí vận chuyển</span>
          <span>{order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}</span>
        </div>
        <div className="summary-row total">
          <span>Tổng cộng</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <p className="invoice-thanks">Cảm ơn bạn đã mua hàng tại SpreeX!</p>

      {showPrint && (
        <button type="button" className="btn-print no-print" onClick={handlePrint}>
          🖨️ In hóa đơn
        </button>
      )}
    </div>
  );
};

export default InvoiceView;
