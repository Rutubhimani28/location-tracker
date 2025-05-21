
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [watchId, setWatchId] = useState(null);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser && currentUser.role === 'employee') {
      const trackingState = localStorage.getItem(`tracking_${currentUser.id}`);
      if (trackingState === 'true') {
        startTracking();
      }
      
      const storedHistory = localStorage.getItem(`locationHistory_${currentUser.id}`);
      if (storedHistory) {
        setLocationHistory(JSON.parse(storedHistory));
      }

      const storedActivities = localStorage.getItem(`activities_${currentUser.id}`);
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      }
    } else {
      setLocationHistory([]);
      setActivities([]);
    }
  }, [currentUser]);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser",
      });
      return;
    }

    setIsTracking(true);
    if (currentUser) {
      localStorage.setItem(`tracking_${currentUser.id}`, 'true');
    }
    
    toast({
      title: "Tracking started",
      description: "Your location is now being tracked",
    });

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date().toISOString();
        
        const locationData = {
          latitude,
          longitude,
          timestamp,
          userId: currentUser.id,
          userName: currentUser.name,
          companyId: currentUser.companyId 
        };
        
        setCurrentLocation(locationData);
        
        setLocationHistory(prev => {
          const updated = [...prev, locationData];
          if (currentUser) {
            localStorage.setItem(`locationHistory_${currentUser.id}`, JSON.stringify(updated));
          }
          return updated;
        });
        
        setError(null);
      },
      (err) => {
        setError(`Error: ${err.message}`);
        toast({
          variant: "destructive",
          title: "Location error",
          description: err.message,
        });
      },
      { 
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }
    );
    
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    
    setIsTracking(false);
    if (currentUser) {
      localStorage.setItem(`tracking_${currentUser.id}`, 'false');
    }
    
    toast({
      title: "Tracking stopped",
      description: "Your location is no longer being tracked",
    });
  };

  const addActivity = (activityData) => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not logged in",
      });
      return;
    }
    const newActivity = {
      ...activityData,
      id: `activity_${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: currentUser.id,
      userName: currentUser.name,
      companyId: currentUser.companyId
    };
    setActivities(prev => {
      const updatedActivities = [...prev, newActivity];
      localStorage.setItem(`activities_${currentUser.id}`, JSON.stringify(updatedActivities));
      return updatedActivities;
    });
    toast({
      title: "Activity added",
      description: `Activity "${activityData.name}" has been successfully added.`,
    });
  };

  const getAllLocations = () => {
    const allUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];
    let allLocationData = [];
    allUsers.forEach(user => {
      const userHistory = JSON.parse(localStorage.getItem(`locationHistory_${user.id}`)) || [];
      if (userHistory.length > 0) {
        allLocationData.push({
          userId: user.id,
          userName: user.name,
          companyId: user.companyId,
          locations: userHistory
        });
      }
    });
    return allLocationData;
  };

  const getAllActivities = () => {
    const allUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];
    let allActivityData = [];
    allUsers.forEach(user => {
      const userActivities = JSON.parse(localStorage.getItem(`activities_${user.id}`)) || [];
      allActivityData = [...allActivityData, ...userActivities];
    });
    allActivityData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return allActivityData;
  };


  const value = {
    isTracking,
    currentLocation,
    locationHistory,
    error,
    activities,
    startTracking,
    stopTracking,
    addActivity,
    getAllLocations,
    getAllActivities
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
