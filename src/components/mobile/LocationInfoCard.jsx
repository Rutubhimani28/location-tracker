
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formatCoordinates = (lat, lng) => {
  if (lat === null || lng === null || typeof lat === 'undefined' || typeof lng === 'undefined') return 'Unknown';
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

const LocationInfoCard = ({ currentLocation, isTracking }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Current Location</CardTitle>
      </CardHeader>
      <CardContent>
        {currentLocation ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Coordinates:</span>
              <span className="font-mono">
                {formatCoordinates(currentLocation.latitude, currentLocation.longitude)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Updated:</span>
              <span>
                {currentLocation.timestamp 
                  ? new Date(currentLocation.timestamp).toLocaleTimeString() 
                  : 'N/A'}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            {isTracking 
              ? 'Waiting for location data...' 
              : 'Start tracking to see your location'}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationInfoCard;
