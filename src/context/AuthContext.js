import React, { createContext, useContext, useEffect, useState } from 'react';
import { hasPermission } from '../permissions';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const ROLE_CONFIG = {
  customer: {
    label: 'Khach hang',
    dashboardPath: '/dashboard/customer',
  },
  staff: {
    label: 'Nhan vien ban hang',
    dashboardPath: '/dashboard/staff',
  },
  shipper: {
    label: 'Nhan vien giao hang',
    dashboardPath: '/dashboard/shipper',
  },
  manager: {
    label: 'Quan ly van hanh',
    dashboardPath: '/dashboard/manager',
  },
  admin: {
    label: 'Quan tri vien',
    dashboardPath: '/dashboard/admin',
  },
};

export const getDashboardPathForRole = (role = 'customer') =>
  ROLE_CONFIG[role]?.dashboardPath || ROLE_CONFIG.customer.dashboardPath;

export const canAccessRouteForRole = (role = 'customer', path = '/') => {
  if (!path || path === '/login') {
    return false;
  }

  if (path.startsWith('/admin')) {
    return role === 'admin';
  }

  if (path === '/dashboard') {
    return true;
  }

  if (path.startsWith('/dashboard/')) {
    return path === getDashboardPathForRole(role);
  }

  return true;
};

const DEMO_USERS = [
  {
    id: 1,
    email: 'demo@spreex.vn',
    password: '123456',
    name: 'Nguyen Van Demo',
    phone: '0901234567',
    address: '123 Nguyen Hue, Quan 1, TP.HCM',
    role: 'customer',
  },
  {
    id: 2,
    email: 'staff@spreex.vn',
    password: 'staff123',
    name: 'Le Minh Staff',
    phone: '0903334455',
    address: '15 Vo Van Tan, Quan 3, TP.HCM',
    role: 'staff',
  },
  {
    id: 3,
    email: 'shipper@spreex.vn',
    password: 'shipper123',
    name: 'Pham Duc Shipper',
    phone: '0904445566',
    address: '210 Phan Xich Long, Phu Nhuan, TP.HCM',
    role: 'shipper',
  },
  {
    id: 4,
    email: 'manager@spreex.vn',
    password: 'manager123',
    name: 'Tran Thi Manager',
    phone: '0902223344',
    address: '88 Cach Mang Thang 8, Quan 3, TP.HCM',
    role: 'manager',
  },
  {
    id: 5,
    email: 'admin@spreex.vn',
    password: 'admin123',
    name: 'Admin SpreeX',
    phone: '0909876543',
    address: '456 Le Loi, Quan 1, TP.HCM',
    role: 'admin',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('shoestore_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('shoestore_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { user, token } = await api.auth.login(email, password);
    setUser(user);
    localStorage.setItem('shoestore_user', JSON.stringify(user));
    localStorage.setItem('shoestore_token', token);
    return user;
  };

  const register = async (name, email, password, phone, address) => {
    const { user, token } = await api.auth.register(name, email, password, phone, address);
    setUser(user);
    localStorage.setItem('shoestore_user', JSON.stringify(user));
    localStorage.setItem('shoestore_token', token);
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shoestore_user');
    localStorage.removeItem('shoestore_token');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('shoestore_user', JSON.stringify(updated));
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        hasPermission: (permission) => hasPermission(user?.role, permission),
        roleConfig: ROLE_CONFIG,
        getDashboardPathForRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
