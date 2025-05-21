
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';

// Component to update map view when location changes
function MapUpdater({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
}

const LocationMap = ({ locations = [], center, height = "400px", zoom = 13 }) => {
  // If no center is provided, use the first location or default to NYC
  const mapCenter = center || 
    (locations.length > 0 ? [locations[0].latitude, locations[0].longitude] : [40.7128, -74.0060]);
  
  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height }}
    >
      <MapContainer center={mapCenter} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <div>
                <p className="font-semibold">{location.userName || 'User'}</p>
                <p className="text-sm text-gray-600">
                  {new Date(location.timestamp).toLocaleString()}
                </p>
                <p className="text-xs mt-1">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapUpdater center={mapCenter} />
      </MapContainer>
    </motion.div>
  );
};

export default LocationMap;
