import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { canAccessAdminArea } from '../permissions';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user, getDashboardPathForRole } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/admin' }} replace />;
  }

  if (!canAccessAdminArea(user?.role)) {
    return <Navigate to={getDashboardPathForRole(user?.role)} replace />;
  }

  return children;
};

export default AdminRoute;
