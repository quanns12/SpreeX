import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/product/ProductCard';
import ProductSearch from '../../components/product/ProductSearch';
import { useProducts } from '../../context/ProductContext';
import { searchProducts } from '../../data/products';
import './ProductsPage.css';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProducts = useMemo(
    () => searchProducts(products, query, category),
    [products, query, category]
  );

  return (
    <div className="page-container products-page-container">
      <div className="products-page-header">
        <h1>Tất cả sản phẩm</h1>
        <p>Khám phá bộ sưu tập sneakers thời thượng nhất từ SpreeX.</p>
      </div>

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

      {error && <p className="api-warning">{error}</p>}

      {loading ? (
        <div className="loading-products">
          <div className="spinner" />
          <p>Đang tải sản phẩm...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <div className="empty-icon-wrap">🔍</div>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Vui lòng thử lại với từ khóa khác hoặc xóa bộ lọc danh mục.</p>
          <button
            type="button"
            className="btn-reset-filters"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
