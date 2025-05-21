
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '@/contexts/LocationContext';
import { useAuth } from '@/contexts/AuthContext';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import StatCard from '@/components/dashboard/StatCard';
import DashboardMap from '@/components/dashboard/DashboardMap';
import SignInTimesList from '@/components/dashboard/SignInTimesList';
import RecentActivitiesTable from '@/components/dashboard/RecentActivitiesTable';
import AttendanceLog from '@/components/dashboard/AttendanceLog';
import { Users, MapPin, Activity, Clock, Briefcase, FileText, BarChart3, Building as BuildingIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyAdminDashboard = () => {
  const { getAllLocations, getAllActivities } = useLocation();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalLocationsLogged: 0,
    recentLocations: [],
    employeeSignInTimes: {},
    lastLocationUpdate: 'N/A',
  });
  const [activities, setActivities] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    const locationData = getAllLocations();
    const activityData = getAllActivities();
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];

    const companyEmployees = mockUsers.filter(user => user.companyId === currentUser.companyId);
    const totalEmployees = companyEmployees.length;
    
    const signInTimes = {};
    const currentAttendance = [];

    companyEmployees.forEach(employee => {
      const time = localStorage.getItem(`signInTime_${employee.id}`);
      const today = new Date().toDateString();
      let status = 'Absent';
      let signInDisplayTime = 'N/A';

      if (time) {
        const signInDate = new Date(time).toDateString();
        if (signInDate === today) {
          status = 'Present';
          signInDisplayTime = new Date(time).toLocaleTimeString();
          signInTimes[employee.id] = time;
        }
      }
      currentAttendance.push({ 
        id: employee.id, 
        name: employee.name, 
        status, 
        signInTime: signInDisplayTime 
      });
    });

    let allLocations = [];
    locationData.forEach(userLocData => {
      const employee = companyEmployees.find(emp => emp.id === userLocData.userId);
      if (employee) {
        allLocations = [...allLocations, ...userLocData.locations.map(loc => ({
          ...loc,
          userName: employee.name,
          userId: userLocData.userId
        }))];
      }
    });
    allLocations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setStats({
      totalEmployees,
      activeEmployees: Object.keys(signInTimes).length,
      totalLocationsLogged: allLocations.length,
      recentLocations: allLocations.slice(0, 20),
      employeeSignInTimes: signInTimes,
      lastLocationUpdate: allLocations.length > 0 ? new Date(allLocations[0].timestamp).toLocaleString() : 'No data'
    });
    
    const companyActivities = activityData
      .filter(activity => companyEmployees.some(emp => emp.id === activity.userId))
      .map(activity => {
        const employee = companyEmployees.find(emp => emp.id === activity.userId);
        return {
          ...activity,
          userName: employee ? employee.name : 'Unknown User'
        };
      })
      .slice(0, 10);

    setActivities(companyActivities);
    setAttendanceData(currentAttendance);
  }, [getAllLocations, getAllActivities, currentUser.companyId]);

  return (
    <div className="flex h-screen bg-gray-100">
      <CompanyAdminSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-gray-800"
          >
            {currentUser.companyName} Dashboard
          </motion.h1>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <StatCard title="Total Employees" value={stats.totalEmployees.toString()} icon={<Users />} color="blue" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Employees Signed In" value={stats.activeEmployees.toString()} icon={<Activity />} color="green" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Locations Logged (Today)" value={stats.totalLocationsLogged.toString()} icon={<MapPin />} color="purple" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard title="Last Activity Update" value={stats.lastLocationUpdate} icon={<Clock />} color="amber" isTime={true} />
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
               <SignInTimesList signInTimes={stats.employeeSignInTimes} getAllLocations={getAllLocations} />
            </motion.div>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-semibold mb-6 text-gray-700"
          >
            Office Management Modules
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <Link to="/admin/tasks">
                <StatCard title="Task Management" value="12 Open" icon={<Briefcase />} color="teal" description="Manage team tasks" />
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/admin/resources">
                <StatCard title="Resource Management" value="3/5 Rooms" icon={<BuildingIcon />} color="cyan" description="Book office resources" />
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/admin/documents">
                <StatCard title="Document Management" value="128 Docs" icon={<FileText />} color="lime" description="Access shared files" />
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/admin/reports">
                <StatCard title="Reporting & Analytics" value="View" icon={<BarChart3 />} color="sky" description="Generate reports" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default CompanyAdminDashboard;
