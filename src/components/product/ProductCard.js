import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { formatPrice } from '../../data/products';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleImageError = () => {
    // Premium fallback sneaker image
    setImgSrc('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image-wrap">
        <img 
          src={imgSrc} 
          alt={product.name} 
          className="product-image" 
          loading="lazy" 
          onError={handleImageError} 
        />
        {discount > 0 && <span className="product-discount">-{discount}%</span>}
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          <div className="product-rating">
            <FiStar className="star-icon" />
            <span>{product.rating}</span>
          </div>
        </div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-bottom">
          <div className="product-prices">
            <span className="product-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="product-original">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <span className="product-sold">Đã bán {product.sold}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
