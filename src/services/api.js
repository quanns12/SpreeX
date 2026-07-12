const API_BASE = process.env.REACT_APP_API_URL || '';

const getAuthHeaders = () => {
  try {
    const token = localStorage.getItem('shoestore_token');
    if (!token) return {};
    return {
      'Authorization': `Bearer ${token}`,
    };
  } catch {
    return {};
  }
};

const request = async (path, options = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Yêu cầu thất bại');
  return data;
};

export const api = {
  auth: {
    login: (email, password) =>
      request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (name, email, password, phone, address) =>
      request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phone, address }),
      }),
  },
  products: {
    getAll: () => request('/api/products'),
    getById: (id) => request(`/api/products/${id}`),
    create: (product) => request('/api/products', { method: 'POST', body: JSON.stringify(product) }),
    update: (id, product) =>
      request(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
    delete: (id) => request(`/api/products/${id}`, { method: 'DELETE' }),
  },
  orders: {
    getAll: () => request('/api/orders'),
    getById: (id) => request(`/api/orders/${id}`),
    create: (order) => request('/api/orders', { method: 'POST', body: JSON.stringify(order) }),
    updateStatus: (id, status) =>
      request(`/api/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    completePayment: (id, transactionId) =>
      request(`/api/orders/${id}/complete-payment`, {
        method: 'POST',
        body: JSON.stringify({ transactionId }),
      }),
  },
  payment: {
    createVNPay: (data) =>
      request('/api/payment/vnpay/create', { method: 'POST', body: JSON.stringify(data) }),
    createMoMo: (data) =>
      request('/api/payment/momo/create', { method: 'POST', body: JSON.stringify(data) }),
    createPayOS: (data) =>
      request('/api/payment/payos/create', { method: 'POST', body: JSON.stringify(data) }),
    completeDemo: (orderId, transactionId) =>
      request('/api/payment/demo/complete', {
        method: 'POST',
        body: JSON.stringify({ orderId, transactionId }),
      }),
    getStats: () => request('/api/payment/stats'),
  },
  users: {
    getAll: () => request('/api/users'),
    getStats: () => request('/api/users/stats'),
    updateRole: (id, role) =>
      request(`/api/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
  },
};
