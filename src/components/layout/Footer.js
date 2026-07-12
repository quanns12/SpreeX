import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiYoutube, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-grid">
        <div className="footer-col brand-col">
          <span className="footer-logo">
            <div className="footer-logo-mockup-wrap">
              <img src="/logo-transparent.png" alt="SpreeX Logo" className="footer-brand-logo" />
            </div>
            Spree<span className="logo-accent">X</span>
          </span>
          <p className="footer-desc">
            Chúng tôi cam kết cung cấp các sản phẩm giày dép & thời trang chính hãng 100%, bảo hành uy tín, giao hàng tốc hành toàn quốc.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon">
              <FiFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="Youtube" className="social-icon">
              <FiYoutube />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Hỗ trợ khách hàng</h4>
          <ul className="footer-list">
            <li><Link to="/info/faq">Câu hỏi thường gặp</Link></li>
            <li><Link to="/info/shipping">Phương thức vận chuyển</Link></li>
            <li><Link to="/info/returns">Chính sách đổi trả 30 ngày</Link></li>
            <li><Link to="/info/warranty">Chính sách bảo hành</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Về chúng tôi</h4>
          <ul className="footer-list">
            <li><Link to="/info/about">Câu chuyện thương hiệu</Link></li>
            <li><Link to="/info/careers">Cơ hội nghề nghiệp</Link></li>
            <li><Link to="/info/stores">Hệ thống cửa hàng</Link></li>
            <li><Link to="/info/news">Tin tức khuyến mãi</Link></li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h4>Liên hệ</h4>
          <ul className="footer-contact-list">
            <li>
              <FiMapPin className="contact-icon" />
              <span>123 Đường Ba Tháng Hai, Quận 10, TP. Hồ Chí Minh</span>
            </li>
            <li>
              <FiPhone className="contact-icon" />
              <span>1900 1234 (8:00 - 22:00)</span>
            </li>
            <li>
              <FiMail className="contact-icon" />
              <span>support@spreex.vn</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2026 SpreeX. Tất cả các quyền được bảo lưu.</p>
        <div className="footer-payment-methods">
          <span className="payment-badge">COD</span>
          <span className="payment-badge">VNPay</span>
          <span className="payment-badge">MoMo</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
