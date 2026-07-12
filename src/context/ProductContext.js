import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { products as fallbackProducts } from '../data/products';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.products.getAll();
      setProducts(data);
      setError(null);
    } catch {
      setProducts(fallbackProducts);
      setError('Không kết nối được server, dùng dữ liệu offline');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === Number(id)),
    [products]
  );

  const createProduct = async (product) => {
    const created = await api.products.create(product);
    await fetchProducts();
    return created;
  };

  const updateProduct = async (id, updates) => {
    const updated = await api.products.update(id, updates);
    await fetchProducts();
    return updated;
  };

  const deleteProduct = async (id) => {
    await api.products.delete(id);
    await fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};
