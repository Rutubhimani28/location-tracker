
import React, { useState, useEffect } from 'react';
import SuperAdminSidebar from '@/components/super_admin/SuperAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutDashboard, Building, Users, Activity as ActivityIcon } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { motion } from 'framer-motion';
import { useLocation } from '@/contexts/LocationContext';

const SuperAdminDashboard = () => {
  const { getAllActivities, getAllLocations } = useLocation();
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const companies = JSON.parse(localStorage.getItem('companies')) || [];
    setTotalCompanies(companies.length);
    setTotalAdmins(companies.length); 

    const employees = JSON.parse(localStorage.getItem('mockUsers')) || [];
    setTotalEmployees(employees.filter(user => user.role === 'employee').length);

  }, [getAllActivities, getAllLocations]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <SuperAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-slate-800"
          >
            Superadmin Dashboard
        </motion.h1>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <StatCard title="Total Companies" value={totalCompanies.toString()} icon={<Building />} color="indigo" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Total Admins" value={(totalAdmins + 1).toString()} icon={<Users />} color="sky" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Total Employees" value={totalEmployees.toString()} icon={<Users />} color="teal" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="System Status" value="Operational" icon={<ActivityIcon />} color="emerald" />
            </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><LayoutDashboard /> System Overview</CardTitle>
                <CardDescription>High-level overview of the Office Management System.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Welcome to the Superadmin dashboard. Manage companies and system-wide settings.</p>
                <p className="mt-4 text-sm text-gray-500">This area is for platform-level administration. You can create and manage company administrator accounts, configure global system parameters, and monitor overall platform health. Detailed employee activity logs are available within each company's admin panel.</p>
            </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
};
export default SuperAdminDashboard;
