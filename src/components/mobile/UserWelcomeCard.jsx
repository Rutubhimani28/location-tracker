
import React from 'react';
import { useLocation } from '@/contexts/LocationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const UserWelcomeCard = ({ user, isTracking }) => {
  const { startTracking, stopTracking } = useLocation();

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <CardHeader>
        <CardTitle>Welcome, {user?.name || 'User'}</CardTitle>
        {user?.signInTime && (
          <CardDescription>
            Signed in at: {new Date(user.signInTime).toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">
          Your location tracking status is currently{' '}
          <span className={`font-semibold ${isTracking ? 'text-green-500' : 'text-red-500'}`}>
            {isTracking ? 'ACTIVE' : 'INACTIVE'}
          </span>
        </p>
        <Button 
          onClick={isTracking ? stopTracking : startTracking}
          className={`w-full ${isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserWelcomeCard;
