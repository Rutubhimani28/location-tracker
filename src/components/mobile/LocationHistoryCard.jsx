
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const formatCoordinates = (lat, lng) => {
  if (lat === null || lng === null || typeof lat === 'undefined' || typeof lng === 'undefined') return 'Unknown';
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

const LocationHistoryCard = ({ history = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Recent History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {history && history.length > 0 ? (
            history.map((location, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Coordinates:</span>
                  <span className="font-mono">
                    {formatCoordinates(location.latitude, location.longitude)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Time:</span>
                  <span>
                    {new Date(location.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No location history available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationHistoryCard;
