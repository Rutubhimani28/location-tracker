
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SuperAdminRoute = ({ children }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // This route is for superadmins.
  if (userRole !== 'superadmin') {
     // Redirect employees to their dashboard, admins to theirs
    if (userRole === 'employee') return <Navigate to="/employee/dashboard" replace />;
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/login" replace />; // Fallback
  }
  
  return children;
};

export default SuperAdminRoute;
