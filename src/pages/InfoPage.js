import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiHelpCircle,
  FiTruck,
  FiRefreshCw,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiMapPin,
  FiGift,
  FiChevronDown,
  FiMail,
  FiPhone,
  FiClock,
} from 'react-icons/fi';
import './InfoPage.css';

const INFO_MENU = [
  { id: 'faq', label: 'Câu hỏi thường gặp', icon: FiHelpCircle, category: 'support' },
  { id: 'shipping', label: 'Phương thức vận chuyển', icon: FiTruck, category: 'support' },
  { id: 'returns', label: 'Chính sách đổi trả 30 ngày', icon: FiRefreshCw, category: 'support' },
  { id: 'warranty', label: 'Chính sách bảo hành', icon: FiAward, category: 'support' },
  { id: 'about', label: 'Câu chuyện thương hiệu', icon: FiBookOpen, category: 'about' },
  { id: 'careers', label: 'Cơ hội nghề nghiệp', icon: FiBriefcase, category: 'about' },
  { id: 'stores', label: 'Hệ thống cửa hàng', icon: FiMapPin, category: 'about' },
  { id: 'news', label: 'Tin tức khuyến mãi', icon: FiGift, category: 'about' },
];

const InfoPage = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  // Default to faq if pageId is not matched
  const currentPage = INFO_MENU.find((item) => item.id === pageId) ? pageId : 'faq';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const renderFaq = () => {
    const faqs = [
      { q: 'Làm thế nào để tôi chọn đúng size giày?', a: 'SpreeX khuyến khích bạn đo chiều dài bàn chân và đối chiếu với Bảng quy đổi Size ở trang chi tiết sản phẩm. Nếu chân của bạn bè hoặc bè dày, nên chọn tăng 0.5 đến 1 size để có trải nghiệm đi thoải mái nhất.' },
      { q: 'Shop có giao hàng COD (Thanh toán khi nhận hàng) không?', a: 'Có, SpreeX hỗ trợ thanh toán COD trên toàn quốc. Bạn được kiểm tra hàng trước khi nhận và thanh toán trực tiếp cho shipper.' },
      { q: 'Sau bao lâu thì tôi nhận được hàng?', a: 'Nội thành TP.HCM và Hà Nội: 1 - 2 ngày làm việc. Các tỉnh thành khác: 3 - 5 ngày làm việc tùy khu vực.' },
      { q: 'Tôi có thể đổi size nếu giày đi không vừa không?', a: 'Hoàn toàn được. SpreeX hỗ trợ đổi size miễn phí trong vòng 30 ngày kể từ khi nhận hàng với điều kiện sản phẩm còn nguyên tem mác, hộp và chưa qua sử dụng.' },
    ];

    return (
      <div className="info-content-section">
        <h2>Câu hỏi thường gặp (FAQ)</h2>
        <p className="section-intro">Giải đáp nhanh những thắc mắc phổ biến của khách hàng về SpreeX.</p>
        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => toggleFaq(idx)}>
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <FiChevronDown className="faq-arrow" />
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderShipping = () => {
    return (
      <div className="info-content-section">
        <h2>Phương thức vận chuyển</h2>
        <p className="section-intro">SpreeX liên kết với các đơn vị vận chuyển hàng đầu để mang sản phẩm đến tay bạn nhanh nhất.</p>
        
        <div className="shipping-methods-grid">
          <div className="ship-card">
            <div className="ship-header h-fast">Giao Hàng Hỏa Tốc</div>
            <div className="ship-body">
              <div className="ship-price">45.000đ</div>
              <div className="ship-time">Nhận hàng trong 2h - 4h</div>
              <p>Áp dụng cho nội thành khu vực TP.HCM và Hà Nội.</p>
            </div>
          </div>
          
          <div className="ship-card popular">
            <div className="ship-tag">Khuyên Dùng</div>
            <div className="ship-header h-standard">Giao Hàng Tiêu Chuẩn</div>
            <div className="ship-body">
              <div className="ship-price">30.000đ</div>
              <div className="ship-time">Nhận hàng trong 2 - 4 ngày</div>
              <p>Miễn phí vận chuyển cho mọi đơn hàng từ 500.000đ trở lên.</p>
            </div>
          </div>
        </div>

        <div className="info-sub-box">
          <h4>Lưu ý khi giao hàng:</h4>
          <ul>
            <li>Thời gian giao hàng không tính các ngày Chủ nhật và ngày lễ.</li>
            <li>Khách hàng được quyền đồng kiểm (kiểm tra hàng) trước khi nhận.</li>
            <li>Mọi trường hợp hàng giao trễ do bất khả kháng (thiên tai, bão lũ) bộ phận CSKH sẽ chủ động liên hệ báo trước.</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderReturns = () => {
    return (
      <div className="info-content-section">
        <h2>Chính sách đổi trả 30 ngày</h2>
        <p className="section-intro">Chúng tôi muốn bạn hoàn toàn tự tin khi mua sắm tại SpreeX. Chính sách đổi trả linh hoạt lên tới 30 ngày.</p>
        
        <div className="return-steps">
          {[
            { step: '1', title: 'Yêu cầu đổi trả', desc: 'Liên hệ Hotline hoặc Zalo CSKH để thông báo size/sản phẩm muốn đổi.' },
            { step: '2', title: 'Đóng gói hàng', desc: 'Đóng gói giày còn nguyên vẹn tem, tag và hộp giày gốc như ban đầu.' },
            { step: '3', title: 'Gửi hàng về shop', desc: 'Bưu tá sẽ qua lấy hàng tại nhà bạn hoặc bạn mang ra bưu cục gần nhất.' },
            { step: '4', title: 'Nhận hàng mới', desc: 'SpreeX sẽ gửi lại sản phẩm đổi trả mới ngay khi nhận được hàng cũ.' }
          ].map((s) => (
            <div className="return-step" key={s.step}>
              <div className="return-num">{s.step}</div>
              <div className="return-step-body">
                <h5>{s.title}</h5>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="info-sub-box warning-box">
          <h4>Điều kiện chấp nhận đổi trả:</h4>
          <p>Sản phẩm chưa qua sử dụng (đế giày sạch, không bị nhăn rách), còn đầy đủ tem nhãn mác, hộp giày đi kèm nguyên vẹn và hóa đơn mua hàng.</p>
        </div>
      </div>
    );
  };

  const renderWarranty = () => {
    return (
      <div className="info-content-section">
        <h2>Chính sách bảo hành</h2>
        <p className="section-intro">Mọi đôi giày được mua tại SpreeX đều đi kèm với chế độ bảo hành chất lượng chu đáo.</p>
        
        <div className="warranty-grid">
          <div className="warranty-card">
            <h4>Bảo hành keo & chỉ</h4>
            <div className="w-duration">Bảo hành 6 tháng</div>
            <p>Khắc phục miễn phí mọi lỗi bung keo, sứt chỉ do lỗi nhà sản xuất.</p>
          </div>
          
          <div className="warranty-card">
            <h4>Đổi mới sản phẩm</h4>
            <div className="w-duration">Trong 7 ngày đầu</div>
            <p>Đổi mới 1-1 nếu sản phẩm phát sinh lỗi nghiêm trọng về cấu trúc ngay khi nhận.</p>
          </div>
        </div>

        <div className="info-sub-box">
          <h4>Quy trình bảo hành:</h4>
          <p>Bạn chỉ cần gửi sản phẩm về địa chỉ cửa hàng gần nhất hoặc gửi bưu điện. Kỹ thuật viên của SpreeX sẽ xử lý và gửi trả lại tận nhà bạn trong vòng 3 - 5 ngày làm việc.</p>
        </div>
      </div>
    );
  };

  const renderAbout = () => {
    return (
      <div className="info-content-section">
        <h2>Câu chuyện thương hiệu</h2>
        <div className="about-brand-wrap">
          <div className="about-brand-img-container">
            <img src="/logo-mockup.png" alt="SpreeX Streetwear" className="about-brand-logo-img" />
          </div>
          <div className="about-brand-text">
            <h3>SpreeX — Khởi nguồn phong cách Streetwear</h3>
            <p>
              Được thành lập từ năm 2024 bởi những người trẻ đam mê văn hóa đường phố và sneakers, <strong>SpreeX</strong> không chỉ là một cửa hàng giày dép, mà là nơi định hình phong cách sống năng động, cá tính cho thế hệ mới.
            </p>
            <p>
              Tên gọi <strong>SpreeX</strong> đại diện cho tinh thần tự do, bứt phá mọi giới hạn (chữ X đại diện cho Extreme và Exploration). Mỗi sản phẩm tại SpreeX đều được tuyển chọn kỹ lưỡng, đảm bảo tính thẩm mỹ thời thượng nhất cùng chất lượng hoàn hảo.
            </p>
          </div>
        </div>

        <div className="brand-values">
          <div className="value-item">
            <h5>Chính Hãng 100%</h5>
            <p>Cam kết chất lượng tuyệt đối từ các thương hiệu hàng đầu thế giới.</p>
          </div>
          <div className="value-item">
            <h5>Bắt Nhịp Xu Hướng</h5>
            <p>Liên tục cập nhật những mẫu mã mới nhất, phối màu hot trend trên thế giới.</p>
          </div>
          <div className="value-item">
            <h5>Đặt Khách Hàng Làm Trung Tâm</h5>
            <p>Dịch vụ hậu mãi đổi trả 30 ngày, bảo hành dài hạn chu đáo.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCareers = () => {
    const jobs = [
      { title: 'Nhân Viên Tư Vấn Bán Hàng', dept: 'Retail Store', loc: 'TP.HCM', type: 'Full-time / Part-time' },
      { title: 'Fashion Designer (Streetwear Footwear)', dept: 'R&D Product', loc: 'TP.HCM', type: 'Full-time' },
      { title: 'Chuyên Viên Chăm Sóc Khách Hàng (CSKH)', dept: 'Customer Experience', loc: 'Hà Nội', type: 'Full-time' },
    ];

    return (
      <div className="info-content-section">
        <h2>Cơ hội nghề nghiệp</h2>
        <p className="section-intro">Hãy gia nhập đội ngũ trẻ trung, năng động và bứt phá sự nghiệp cùng SpreeX.</p>
        
        <div className="careers-list">
          {jobs.map((job, idx) => (
            <div key={idx} className="career-card">
              <div className="career-info">
                <h4>{job.title}</h4>
                <div className="career-meta">
                  <span className="c-tag">{job.dept}</span>
                  <span className="c-meta-item"><FiMapPin /> {job.loc}</span>
                  <span className="c-meta-item"><FiClock /> {job.type}</span>
                </div>
              </div>
              <a href="mailto:careers@spreex.vn" className="db-btn db-btn-primary">Ứng tuyển ngay</a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStores = () => {
    const stores = [
      {
        name: 'SpreeX Quận 10 (Flagship Store)',
        addr: '123 Đường Ba Tháng Hai, Phường 11, Quận 10, TP. Hồ Chí Minh',
        phone: '1900 1234 - ext 1',
        time: '8:00 - 22:00 (Tất cả các ngày)',
      },
      {
        name: 'SpreeX Hoàn Kiếm',
        addr: '45 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
        phone: '1900 1234 - ext 2',
        time: '8:30 - 22:00 (Tất cả các ngày)',
      }
    ];

    return (
      <div className="info-content-section">
        <h2>Hệ thống cửa hàng</h2>
        <p className="section-intro">Ghé thăm trực tiếp hệ thống cửa hàng của SpreeX để trải nghiệm và mang thử những đôi giày yêu thích.</p>
        
        <div className="stores-list">
          {stores.map((s, idx) => (
            <div key={idx} className="store-address-card">
              <div className="store-header-icon">
                <FiMapPin />
                <h4>{s.name}</h4>
              </div>
              <div className="store-detail-rows">
                <p><strong>Địa chỉ:</strong> {s.addr}</p>
                <p><strong>Số điện thoại:</strong> {s.phone}</p>
                <p><strong>Giờ mở cửa:</strong> {s.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNews = () => {
    const posts = [
      {
        title: 'SpreeX Summer Drop 2026: Bộ Sưu Tập Sneakers Mới Lên Kệ',
        date: '10/07/2026',
        desc: 'Đón chào mùa hè năng động với 5 phối màu sneakers phong cách Streetwear độc đáo vừa được SpreeX chính thức công bố.',
        badge: 'New Drop'
      },
      {
        title: 'Khuyến Mãi Lớn Giữa Năm: Giảm Giá Lên Tới 30% Toàn Cửa Hàng',
        date: '01/07/2026',
        desc: 'Chương trình tri ân khách hàng lớn nhất năm. Cơ hội sở hữu những mẫu giày hot trend với giá ưu đãi cực sâu.',
        badge: 'Ưu Đãi'
      }
    ];

    return (
      <div className="info-content-section">
        <h2>Tin tức khuyến mãi</h2>
        <p className="section-intro">Cập nhật nhanh nhất những sự kiện thời trang, mẫu giày sắp ra mắt và ưu đãi lớn từ SpreeX.</p>
        
        <div className="news-list">
          {posts.map((p, idx) => (
            <div key={idx} className="news-card">
              <div className="news-badge-wrap">
                <span className="news-date">{p.date}</span>
                <span className="news-pill">{p.badge}</span>
              </div>
              <h4>{p.title}</h4>
              <p className="news-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getContent = () => {
    switch (currentPage) {
      case 'faq':
        return renderFaq();
      case 'shipping':
        return renderShipping();
      case 'returns':
        return renderReturns();
      case 'warranty':
        return renderWarranty();
      case 'about':
        return renderAbout();
      case 'careers':
        return renderCareers();
      case 'stores':
        return renderStores();
      case 'news':
        return renderNews();
      default:
        return renderFaq();
    }
  };

  return (
    <div className="page-container info-root-container">
      <div className="info-layout">
        {/* Left Sidebar Menu */}
        <aside className="info-sidebar">
          <div className="info-sidebar-group">
            <h5>Hỗ trợ khách hàng</h5>
            <div className="info-sidebar-links">
              {INFO_MENU.filter((item) => item.category === 'support').map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={`/info/${item.id}`}
                    className={`info-sidebar-link ${currentPage === item.id ? 'active' : ''}`}
                  >
                    <Icon className="info-link-icon" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="info-sidebar-group">
            <h5>Về chúng tôi</h5>
            <div className="info-sidebar-links">
              {INFO_MENU.filter((item) => item.category === 'about').map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={`/info/${item.id}`}
                    className={`info-sidebar-link ${currentPage === item.id ? 'active' : ''}`}
                  >
                    <Icon className="info-link-icon" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <main className="info-main">
          {getContent()}
        </main>
      </div>
    </div>
  );
};

export default InfoPage;
