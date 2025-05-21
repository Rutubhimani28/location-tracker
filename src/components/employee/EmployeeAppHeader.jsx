
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

const EmployeeAppHeader = () => {
  const { logout, currentUser } = useAuth();
  const { isTracking, stopTracking } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isTracking) {
      stopTracking();
    }
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User size={24} />
          <h1 className="text-xl font-bold">Employee Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          {currentUser && <span className="text-sm">{currentUser.name}</span>}
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-primary-foreground/20">
            <LogOut size={20} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EmployeeAppHeader;
