
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { LocationProvider } from '@/contexts/LocationContext';
import { TaskProvider } from '@/contexts/TaskContext'; // Added TaskProvider
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import SuperAdminRoute from '@/components/SuperAdminRoute';

import Login from '@/pages/Login';

// Employee (formerly MobileApp)
import EmployeeDashboard from '@/pages/employee/EmployeeDashboard'; 

// Company Admin (formerly Dashboard/Admin)
import CompanyAdminDashboard from '@/pages/company_admin/CompanyAdminDashboard';
import EmployeeManagement from '@/pages/company_admin/EmployeeManagement';
import AdminLocationHistory from '@/pages/company_admin/AdminLocationHistory';
import CompanySettings from '@/pages/company_admin/CompanySettings';
import TaskManagementPage from '@/pages/company_admin/TaskManagementPage';
import ResourceManagementPage from '@/pages/company_admin/ResourceManagementPage';
import DocumentManagementPage from '@/pages/company_admin/DocumentManagementPage';
import ReportingPage from '@/pages/company_admin/ReportingPage';


// Superadmin
import SuperAdminDashboard from '@/pages/super_admin/SuperAdminDashboard';
import CompanyManagement from '@/pages/super_admin/CompanyManagement';
import SystemSettings from '@/pages/super_admin/SystemSettings';


function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <TaskProvider> {/* Wrapped routes with TaskProvider */}
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Employee Routes */}
            <Route path="/employee/dashboard" element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            
            {/* Company Admin Routes */}
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <CompanyAdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/employees" element={
              <AdminRoute>
                <EmployeeManagement />
              </AdminRoute>
            } />
            <Route path="/admin/employee-activity" element={ 
              <AdminRoute>
                <AdminLocationHistory />
              </AdminRoute>
            } />
             <Route path="/admin/tasks" element={
              <AdminRoute>
                <TaskManagementPage />
              </AdminRoute>
            } />
            <Route path="/admin/resources" element={
              <AdminRoute>
                <ResourceManagementPage />
              </AdminRoute>
            } />
            <Route path="/admin/documents" element={
              <AdminRoute>
                <DocumentManagementPage />
              </AdminRoute>
            } />
            <Route path="/admin/reports" element={
              <AdminRoute>
                <ReportingPage />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <CompanySettings />
              </AdminRoute>
            } />

            {/* Superadmin Routes */}
            <Route path="/superadmin/dashboard" element={
              <SuperAdminRoute>
                <SuperAdminDashboard />
              </SuperAdminRoute>
            } />
            <Route path="/superadmin/companies" element={
              <SuperAdminRoute>
                <CompanyManagement />
              </SuperAdminRoute>
            } />
            <Route path="/superadmin/system-settings" element={
              <SuperAdminRoute>
                <SystemSettings />
              </SuperAdminRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </TaskProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
