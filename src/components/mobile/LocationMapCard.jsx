
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LocationMap from '@/components/LocationMap';

const LocationMapCard = ({ locations, center }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Location Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <LocationMap 
          locations={locations}
          center={center ? [center.latitude, center.longitude] : null}
          height="300px"
          zoom={15}
        />
      </CardContent>
    </Card>
  );
};

export default LocationMapCard;
