
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import DashboardMap from '@/components/dashboard/DashboardMap';
import RecentActivitiesTable from '@/components/dashboard/RecentActivitiesTable';
import { useLocation } from '@/contexts/LocationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, ListChecks } from 'lucide-react';

const AdminLocationHistory = () => {
  const { getAllLocations, getAllActivities } = useLocation();
  const { currentUser } = useAuth();
  const [companyLocations, setCompanyLocations] = useState([]);
  const [companyActivities, setCompanyActivities] = useState([]);

  useEffect(() => {
    if (!currentUser || !currentUser.companyId) return;

    const allLocationData = getAllLocations();
    const allActivityData = getAllActivities();
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];

    const companyEmployees = mockUsers.filter(user => user.companyId === currentUser.companyId);
    const companyEmployeeIds = companyEmployees.map(emp => emp.id);
    
    let filteredLocations = [];
    allLocationData.forEach(userLocData => {
      if (companyEmployeeIds.includes(userLocData.userId)) {
        filteredLocations = [...filteredLocations, ...userLocData.locations.map(loc => ({
          ...loc,
          userName: userLocData.userName,
          userId: userLocData.userId
        }))];
      }
    });
    filteredLocations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setCompanyLocations(filteredLocations.slice(0, 50)); // Show more locations on this page

    const filteredActivities = allActivityData
      .filter(activity => companyEmployeeIds.includes(activity.userId))
      .map(activity => {
        const employee = companyEmployees.find(emp => emp.id === activity.userId);
        return {
          ...activity,
          userName: employee ? employee.name : 'Unknown User'
        };
      });
    setCompanyActivities(filteredActivities);

  }, [currentUser, getAllLocations, getAllActivities]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <CompanyAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          {currentUser.companyName} - Employee Activity Overview
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin /> Employee Locations Map</CardTitle>
                <CardDescription>Map view of recent employee locations for your company.</CardDescription>
              </CardHeader>
              <CardContent>
                {companyLocations.length > 0 ? (
                  <DashboardMap locations={companyLocations} />
                ) : (
                  <p className="text-center text-gray-500 py-8">No location data available for your company's employees.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListChecks /> Employee Activities Log</CardTitle>
                <CardDescription>Detailed log of activities submitted by your company's employees.</CardDescription>
              </CardHeader>
              <CardContent>
                {companyActivities.length > 0 ? (
                  <RecentActivitiesTable 
                    activities={companyActivities} 
                    title="" 
                    description="" 
                  />
                ) : (
                  <p className="text-center text-gray-500 py-8">No activities logged by your company's employees.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLocationHistory;
