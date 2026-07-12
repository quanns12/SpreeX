import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const OrderContext = createContext(null);
const ORDERS_KEY = 'shoestore_orders';

const generateOrderId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `DH${dateStr}${random}`;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const syncFromServer = useCallback(async () => {
    try {
      const data = await api.orders.getAll();
      setOrders(data);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(data));
    } catch {
      const saved = localStorage.getItem(ORDERS_KEY);
      if (saved) {
        try {
          setOrders(JSON.parse(saved));
        } catch {
          localStorage.removeItem(ORDERS_KEY);
        }
      }
    }
  }, []);

  useEffect(() => {
    syncFromServer();
  }, [syncFromServer]);

  const createOrder = useCallback(async (orderData) => {
    try {
      const order = await api.orders.create(orderData);
      setOrders((prev) => {
        const next = [order, ...prev.filter((o) => o.id !== order.id)];
        localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
        return next;
      });
      return order;
    } catch {
      const order = {
        id: generateOrderId(),
        ...orderData,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => {
        const next = [order, ...prev];
        localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
        return next;
      });
      return order;
    }
  }, []);

  const getOrderById = useCallback(
    (orderId) => orders.find((o) => o.id === orderId),
    [orders]
  );

  const getUserOrders = useCallback(
    (userId) => orders.filter((o) => o.userId === userId),
    [orders]
  );

  const cancelOrder = useCallback(async (orderId) => {
    try {
      await api.orders.updateStatus(orderId, 'cancelled');
    } catch {
      /* fallback local */
    }
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o));
      localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    const updated = await api.orders.updateStatus(orderId, status);
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? updated : o));
      localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
      return next;
    });
    return updated;
  }, []);

  const completePayment = useCallback(async (orderId, transactionId) => {
    try {
      const updated = await api.orders.completePayment(orderId, transactionId);
      setOrders((prev) => {
        const next = prev.map((o) => (o.id === orderId ? updated : o));
        localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
        return next;
      });
      return updated;
    } catch {
      return null;
    }
  }, []);

  const refreshOrders = syncFromServer;

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        getUserOrders,
        cancelOrder,
        updateOrderStatus,
        completePayment,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
