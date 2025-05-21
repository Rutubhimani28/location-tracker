
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/admin/locations', icon: <MapPin size={20} />, label: 'Locations' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
    <motion.div 
      className="h-screen w-64 bg-gradient-to-b from-primary to-primary/80 text-white p-4 flex flex-col"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8 mt-4">
        <div className="p-2 bg-white/20 rounded-lg">
          <MapPin size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold">Location Tracker</h1>
      </div>
      
      <div className="flex flex-col items-center mb-8 p-4 bg-white/10 rounded-lg">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarFallback className="bg-primary-foreground text-primary text-lg">
            {currentUser?.name?.charAt(0) || 'A'}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-medium">{currentUser?.name || 'Admin'}</h2>
        <p className="text-sm text-white/70">{currentUser?.email || 'admin@example.com'}</p>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <motion.div
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <Button 
        variant="ghost" 
        className="mt-auto w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
        onClick={logout}
      >
        <LogOut size={20} className="mr-2" />
        Logout
      </Button>
    </motion.div>
  );
};

export default AdminSidebar;
