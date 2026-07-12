import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ProductSearch from '../components/product/ProductSearch';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../context/ProductContext';
import { searchProducts } from '../data/products';
import Spline from '@splinetool/react-spline';
import './HomePage.css';

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  const filteredProducts = useMemo(
    () => searchProducts(products, query, category),
    [products, query, category]
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
        {error && <p className="api-warning">{error}</p>}

        <ProductSearch
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
        />

        <div className="results-meta">
          <p className="results-count">
            Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm
            {query && ` cho "${query}"`}
          </p>
        </div>

        {loading ? (
          <div className="loading-products">
            <div className="spinner" />
            <p>Đang tải sản phẩm...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="products-grid"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="empty-results">
            <div className="empty-icon-wrap">🔍</div>
            <h3>Không tìm thấy sản phẩm</h3>
            <p>Vui lòng thử lại với từ khóa khác hoặc xóa bộ lọc danh mục.</p>
            <button type="button" className="btn-reset-filters" onClick={() => { setQuery(''); setCategory('all'); }}>
              Xóa bộ lọc
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
