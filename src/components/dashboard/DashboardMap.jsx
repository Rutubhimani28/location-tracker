
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LocationMap from '@/components/LocationMap';

const DashboardMap = ({ locations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Map</CardTitle>
        <CardDescription>Recent user locations across all devices</CardDescription>
      </CardHeader>
      <CardContent>
        <LocationMap 
          locations={locations}
          height="450px" 
          zoom={3}
        />
      </CardContent>
    </Card>
  );
};

export default DashboardMap;
