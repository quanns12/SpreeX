import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { CATEGORIES } from '../../data/products';
import './ProductSearch.css';

const ProductSearch = ({ query, onQueryChange, category, onCategoryChange }) => (
  <div className="product-search">
    <div className="search-input-container">
      <div className="search-input-wrap">
        <FiSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm giày, dép, thương hiệu..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button type="button" className="search-clear" onClick={() => onQueryChange('')} aria-label="Xóa tìm kiếm">
            <FiX />
          </button>
        )}
      </div>
    </div>
    
    <div className="category-filters-container">
      <div className="category-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-btn ${category === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default ProductSearch;
