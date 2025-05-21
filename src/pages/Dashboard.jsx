
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '@/contexts/LocationContext';
import AdminSidebar from '@/components/AdminSidebar';
import StatCard from '@/components/dashboard/StatCard';
import DashboardMap from '@/components/dashboard/DashboardMap';
import SignInTimesList from '@/components/dashboard/SignInTimesList';
import RecentActivitiesTable from '@/components/dashboard/RecentActivitiesTable';
import AttendanceLog from '@/components/dashboard/AttendanceLog';
import { Users, MapPin, Activity, Clock, CalendarCheck } from 'lucide-react';

const Dashboard = () => {
  const { getAllLocations, getAllActivities } = useLocation();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalLocations: 0,
    recentLocations: [],
    userSignInTimes: {},
    lastLocationUpdate: null,
  });
  const [activities, setActivities] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const locationData = getAllLocations();
    const activityData = getAllActivities();

    const mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];
    const allUserIds = ['user1', ...mockUsers.map(u => u.id)];
    const allUserDetails = [
      { id: 'user1', name: 'App User', email: 'user@example.com' },
      ...mockUsers
    ];

    const totalUsers = allUserDetails.length;
    
    const signInTimes = {};
    const currentAttendance = [];

    allUserDetails.forEach(user => {
      const time = localStorage.getItem(`signInTime_${user.id}`);
      const today = new Date().toDateString();
      let status = 'Absent';
      let signInDisplayTime = 'N/A';

      if (time) {
        const signInDate = new Date(time).toDateString();
        if (signInDate === today) {
          status = 'Present';
          signInDisplayTime = new Date(time).toLocaleTimeString();
          signInTimes[user.id] = time;
        }
      }
      currentAttendance.push({ 
        id: user.id, 
        name: user.name, 
        status, 
        signInTime: signInDisplayTime 
      });
    });

    let allLocations = [];
    locationData.forEach(userLocData => {
      allLocations = [...allLocations, ...userLocData.locations.map(loc => ({
        ...loc,
        userName: userLocData.userName,
        userId: userLocData.userId
      }))];
    });
    allLocations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setStats({
      totalUsers,
      activeUsers: Object.keys(signInTimes).length,
      totalLocations: allLocations.length,
      recentLocations: allLocations.slice(0, 20),
      userSignInTimes: signInTimes,
      lastLocationUpdate: allLocations.length > 0 ? new Date(allLocations[0].timestamp).toLocaleString() : 'No data'
    });
    setActivities(activityData.slice(0, 10));
    setAttendanceData(currentAttendance);
  }, [getAllLocations, getAllActivities]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-gray-800"
          >
            Admin Dashboard
          </motion.h1>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <StatCard title="Total Users" value={stats.totalUsers} icon={<Users />} color="blue" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Currently Signed In" value={stats.activeUsers} icon={<Activity />} color="green" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Total Locations Logged" value={stats.totalLocations} icon={<MapPin />} color="purple" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Last Location Update" value={stats.lastLocationUpdate} icon={<Clock />} color="amber" isTime={true} />
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <DashboardMap locations={stats.recentLocations} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AttendanceLog attendanceData={attendanceData} />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <RecentActivitiesTable activities={activities} />
            </motion.div>
            <motion.div variants={itemVariants}>
               <SignInTimesList signInTimes={stats.userSignInTimes} getAllLocations={getAllLocations} />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
