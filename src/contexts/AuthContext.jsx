
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('omsUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setUserRole(user.role);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Check for superadmin
    if (email === 'vishnu@admin.com' && password === 'vishnuadmin1234') {
      const superAdminUser = { 
        id: 'superadmin001', 
        name: 'Super Admin', 
        email: 'vishnu@admin.com', 
        role: 'superadmin' 
      };
      const userWithSignInTime = { ...superAdminUser, signInTime: new Date().toISOString() };
      setCurrentUser(userWithSignInTime);
      setUserRole('superadmin');
      localStorage.setItem('omsUser', JSON.stringify(userWithSignInTime));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithSignInTime.name}!`,
      });
      return userWithSignInTime;
    }

    // Check for company admins
    const companies = JSON.parse(localStorage.getItem('companies')) || [];
    const companyAdmin = companies.find(company => 
      company.adminEmail === email && company.adminPassword === password
    );

    if (companyAdmin) {
      const adminUser = {
        id: companyAdmin.id,
        name: `${companyAdmin.name} Admin`,
        email: companyAdmin.adminEmail,
        role: 'admin',
        companyId: companyAdmin.id,
        companyName: companyAdmin.name
      };
      const userWithSignInTime = { ...adminUser, signInTime: new Date().toISOString() };
      setCurrentUser(userWithSignInTime);
      setUserRole('admin');
      localStorage.setItem('omsUser', JSON.stringify(userWithSignInTime));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithSignInTime.name}!`,
      });
      return userWithSignInTime;
    }

    // Check for employees
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];
    const foundEmployee = mockUsers.find(u => u.email === email && u.password === password && u.status === 'active');
    
    if (foundEmployee) {
      const employeeUser = { ...foundEmployee, role: 'employee' };
      const userWithSignInTime = { ...employeeUser, signInTime: new Date().toISOString() };
      setCurrentUser(userWithSignInTime);
      setUserRole('employee');
      localStorage.setItem('omsUser', JSON.stringify(userWithSignInTime));
      localStorage.setItem(`signInTime_${userWithSignInTime.id}`, userWithSignInTime.signInTime);
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithSignInTime.name}!`,
      });
      return userWithSignInTime;
    }

    // If no user found
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Invalid email or password, or user is inactive.",
    });
    throw new Error('Invalid email or password, or user is inactive.');
  };

  const logout = () => {
    if(currentUser && currentUser.role === 'employee') {
      localStorage.removeItem(`signInTime_${currentUser.id}`);
    }
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('omsUser');
    localStorage.removeItem('tracking');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const createEmployee = (employeeData, companyId) => {
    const newEmployee = {
      id: `employee${Date.now()}`,
      ...employeeData,
      companyId, // Add company ID to employee data
      role: 'employee',
      status: 'active', 
      lastActive: new Date().toISOString(), 
      created: new Date().toISOString()
    };
    
    toast({
      title: "Employee created",
      description: `New employee ${employeeData.name} has been created`,
    });
    
    const existingUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];
    localStorage.setItem('mockUsers', JSON.stringify([...existingUsers, newEmployee]));

    return newEmployee;
  };

  const value = {
    currentUser,
    userRole,
    login,
    logout,
    createEmployee,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
