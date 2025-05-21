
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Building, Settings, LogOut, ShieldCheck } from 'lucide-react';

const SuperAdminSidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/superadmin/dashboard' },
    { icon: <Building size={20} />, label: 'Company Management', path: '/superadmin/companies' },
    { icon: <Settings size={20} />, label: 'System Settings', path: '/superadmin/system-settings' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-4 flex flex-col min-h-screen">
      <div className="mb-8 text-center">
        <ShieldCheck size={36} className="mx-auto mb-2 text-blue-400" />
        <h1 className="text-xl font-bold">Office Management</h1>
        <p className="text-sm text-gray-400">Superadmin Panel</p>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-slate-700/50'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto">
        {currentUser && (
          <div className="p-3 mb-2 border-t border-slate-700">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-gray-400">{currentUser.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full flex items-center justify-start gap-3 p-3 hover:bg-red-500/20 text-red-400 hover:text-red-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
