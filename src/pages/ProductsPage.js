import React from 'react';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../context/ProductContext';
import './ProductsPage.css';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="page-container products-page-container">
      <div className="products-page-header">
        <h1>Tất cả sản phẩm</h1>
        <p>Khám phá bộ sưu tập sneakers thời thượng nhất từ SpreeX.</p>
      </div>

      {error && <p className="api-warning">{error}</p>}

      {loading ? (
        <div className="loading-products">
          <div className="spinner" />
          <p>Đang tải sản phẩm...</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
