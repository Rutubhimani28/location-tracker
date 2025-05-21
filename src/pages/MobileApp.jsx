
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import AppHeader from '@/components/mobile/AppHeader';
import UserWelcomeCard from '@/components/mobile/UserWelcomeCard';
import ActivityUpdateForm from '@/components/mobile/ActivityUpdateForm';
import LocationInfoCard from '@/components/mobile/LocationInfoCard';
import LocationMapCard from '@/components/mobile/LocationMapCard';
import LocationHistoryCard from '@/components/mobile/LocationHistoryCard';
import { AlertTriangle } from 'lucide-react';

const MobileApp = () => {
  const { currentUser } = useAuth();
  const { 
    isTracking, 
    currentLocation,
    locationHistory,
    error
  } = useLocation();
  
  const recentLocations = locationHistory.slice(-10);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto p-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserWelcomeCard user={currentUser} isTracking={isTracking} />
        </motion.div>

        {isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ActivityUpdateForm />
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Location Error</h3>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: isTracking ? 0.2 : 0.1 }}
        >
          <LocationInfoCard currentLocation={currentLocation} isTracking={isTracking} />
        </motion.div>
        
        {recentLocations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isTracking ? 0.3 : 0.2 }}
          >
            <LocationMapCard locations={recentLocations} center={currentLocation} />
          </motion.div>
        )}
        
        {locationHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isTracking ? 0.4 : 0.3 }}
          >
            <LocationHistoryCard history={locationHistory.slice(-5).reverse()} />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default MobileApp;
