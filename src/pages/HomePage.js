import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../context/ProductContext';
import Spline from '@splinetool/react-spline';
import './HomePage.css';

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  const featuredProducts = useMemo(
    () => products.slice(0, 4),
    [products]
  );

  const scrollToProducts = () => {
    document.getElementById('products-explore').scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="home-page">
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

          <div className="hero-spline-container">
            {!splineLoaded && !splineError && (
              <div className="spline-loader">
                <div className="spinner"></div>
                <p>Đang tải mô hình 3D...</p>
              </div>
            )}
            
            {splineError ? (
              <div className="spline-fallback">
                <div className="fallback-glow"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" 
                  alt="3D Sneaker Showcase" 
                  className="fallback-image"
                />
                <div className="fallback-badge">Mô hình sản phẩm 3D</div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: splineLoaded ? 1 : 0, scale: splineLoaded ? 1 : 0.95 }}
                transition={{ duration: 0.8 }}
                className="spline-wrapper"
              >
                <Spline 
                  scene="https://prod.spline.design/yqZYQAuhDrtDuWvl/scene.splinecode" 
                  onLoad={() => setSplineLoaded(true)}
                  onError={() => setSplineError(true)}
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="products-section" id="products-explore">
        <div className="featured-header">
          <h2>Sản phẩm nổi bật</h2>
          <p>Những thiết kế sneakers hot nhất được cộng đồng săn đón.</p>
        </div>

        {error && <p className="api-warning">{error}</p>}

        {loading ? (
          <div className="loading-products">
            <div className="spinner" />
            <p>Đang tải sản phẩm...</p>
          </div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="products-grid"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="view-all-container">
              <Link to="/products" className="btn-view-all-products">
                Xem tất cả sản phẩm <FiArrowRight />
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
