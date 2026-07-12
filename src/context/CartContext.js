import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'shoestore_cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [buyNowItem, setBuyNowItem] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, size, color, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const setBuyNow = useCallback((product, size, color, quantity = 1) => {
    setBuyNowItem({
      id: `buynow-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity,
    });
  }, []);

  const clearBuyNow = useCallback(() => {
    setBuyNowItem(null);
  }, []);

  const checkoutItems = buyNowItem ? [buyNowItem] : items;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartShippingFee = cartSubtotal >= 500000 ? 0 : 30000;
  const cartTotal = cartSubtotal + cartShippingFee;

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        buyNowItem,
        checkoutItems,
        totalItems,
        cartSubtotal,
        cartShippingFee,
        cartTotal,
        subtotal,
        shippingFee,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setBuyNow,
        clearBuyNow,
        isBuyNow: !!buyNowItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
