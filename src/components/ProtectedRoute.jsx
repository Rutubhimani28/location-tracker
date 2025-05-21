
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // This route is for employees. Redirect if not an employee.
  if (userRole !== 'employee') {
    // Redirect admins to their dashboard, superadmins to theirs
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'superadmin') return <Navigate to="/superadmin/dashboard" replace />;
    return <Navigate to="/login" replace />; // Fallback
  }
  
  return children;
};

export default ProtectedRoute;
