import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';
import './HomePage.css';

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  // Pick top 4 products for the bento showcase
  const bentoProducts = useMemo(() => products.slice(0, 4), [products]);

  const scrollToProducts = () => {
    document.getElementById('products-explore').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-badge"
            >
              Bộ Sưu Tập Mới 2026
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Định Hình Phong Cách<br /><span>Thế Hệ Mới</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle"
            >
              Trải nghiệm các bộ sưu tập sneaker & thời trang chính hãng 100%. Giao hàng siêu tốc toàn quốc cùng đặc quyền đổi trả 30 ngày.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hero-actions"
            >
              <button type="button" className="btn-hero-primary" onClick={scrollToProducts}>
                Khám phá bộ sưu tập <FiArrowRight />
              </button>
              <a href="#products-explore" className="btn-hero-secondary">
                Tìm hiểu thêm
              </a>
            </motion.div>
          </div>

          <div className="hero-media-container">
            <div className="hero-media-wrapper">
              <img 
                src="/images/sports_fashion_hero.png" 
                alt="Spreex Premium Sports Sneaker Campaign" 
                className="hero-media-image"
              />
              <div className="hero-media-overlay">
                <span className="media-tag">SPREEX SPORT / 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Showcase Section */}
      <section className="products-section" id="products-explore">
        <div className="featured-header">
          <h2>Sản phẩm nổi bật</h2>
          <p>Thiết kế sáng tạo mang lại sự đột phá và phong cách đỉnh cao.</p>
        </div>

        {error && <p className="api-warning">{error}</p>}

        {loading ? (
          <div className="loading-products">
            <div className="spinner" />
            <p>Đang tải sản phẩm...</p>
          </div>
        ) : bentoProducts.length >= 4 ? (
          <>
            <div className="bento-grid-container">
              {/* Card 1: Nike Air Max 90 (Hero Landscape, Spans 2 Cols) */}
              <div 
                className="bento-card bento-card-hero"
                onClick={() => navigate(`/products/${bentoProducts[0].id}`)}
              >
                <div className="bento-hero-left">
                  <span className="bento-badge-brand">HOT DROP</span>
                  <h3>{bentoProducts[0].name}</h3>
                  <div className="bento-card-meta">
                    <span className="bento-rating">
                      <FiStar /> {bentoProducts[0].rating}
                    </span>
                    <span className="bento-sold">Đã bán {bentoProducts[0].sold}</span>
                  </div>
                  <p className="bento-hero-desc">{bentoProducts[0].description}</p>
                  <div className="bento-hero-price-row">
                    <span className="bento-price">{formatPrice(bentoProducts[0].price)}</span>
                    <span className="bento-btn-arrow">
                      Chi tiết <FiArrowRight />
                    </span>
                  </div>
                </div>
                <div className="bento-hero-right">
                  <img 
                    src={bentoProducts[0].image} 
                    alt={bentoProducts[0].name} 
                    className="bento-hero-img" 
                  />
                  <div className="bento-hero-img-glow"></div>
                </div>
              </div>

              {/* Card 2: Adidas Ultraboost 22 (Tall Vertical, Spans 2 Rows) */}
              <div 
                className="bento-card bento-card-tall"
                onClick={() => navigate(`/products/${bentoProducts[1].id}`)}
              >
                <div className="bento-tall-top">
                  <span className="bento-badge-brand">PREMIUM RUNNING</span>
                  <span className="bento-rating">
                    <FiStar /> {bentoProducts[1].rating}
                  </span>
                </div>
                <div className="bento-tall-middle">
                  <img 
                    src={bentoProducts[1].image} 
                    alt={bentoProducts[1].name} 
                    className="bento-tall-img" 
                  />
                  <div className="bento-tall-circle-glow"></div>
                </div>
                <div className="bento-tall-bottom">
                  <h3>{bentoProducts[1].name}</h3>
                  <div className="bento-price-row">
                    <span className="bento-price">{formatPrice(bentoProducts[1].price)}</span>
                    <span className="bento-badge-sold-pill dark-sold">Đã bán {bentoProducts[1].sold}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Cao gót Zara Classic (Square Light Card) */}
              <div 
                className="bento-card bento-card-square-light"
                onClick={() => navigate(`/products/${bentoProducts[2].id}`)}
              >
                <div className="bento-square-img-wrap">
                  <img 
                    src={bentoProducts[2].image} 
                    alt={bentoProducts[2].name} 
                    className="bento-square-img" 
                  />
                </div>
                <div className="bento-square-info">
                  <div className="bento-square-top">
                    <span className="bento-mini-brand">{bentoProducts[2].brand}</span>
                    <span className="bento-mini-price">{formatPrice(bentoProducts[2].price)}</span>
                  </div>
                  <h4>{bentoProducts[2].name}</h4>
                </div>
              </div>

              {/* Card 4: Converse Chuck 70 (Square Dark Card) */}
              <div 
                className="bento-card bento-card-square-dark"
                onClick={() => navigate(`/products/${bentoProducts[3].id}`)}
              >
                <div className="bento-square-img-wrap dark-wrap">
                  <img 
                    src={bentoProducts[3].image} 
                    alt={bentoProducts[3].name} 
                    className="bento-square-img" 
                  />
                </div>
                <div className="bento-square-info dark-info">
                  <div className="bento-square-top">
                    <span className="bento-mini-brand text-light">{bentoProducts[3].brand}</span>
                    <span className="bento-mini-price text-coral">{formatPrice(bentoProducts[3].price)}</span>
                  </div>
                  <h4>{bentoProducts[3].name}</h4>
                </div>
              </div>
            </div>

            <div className="view-all-container">
              <Link to="/products" className="btn-view-all-products">
                Xem tất cả sản phẩm <FiArrowRight />
              </Link>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
};

export default HomePage;
