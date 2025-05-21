
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute = ({ children }) => { // This is now CompanyAdminRoute
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // This route is for company admins.
  if (userRole !== 'admin') {
    // Redirect employees to their dashboard, superadmins to theirs
    if (userRole === 'employee') return <Navigate to="/employee/dashboard" replace />;
    if (userRole === 'superadmin') return <Navigate to="/superadmin/dashboard" replace />;
    return <Navigate to="/login" replace />; // Fallback
  }
  
  return children;
};

export default AdminRoute;
