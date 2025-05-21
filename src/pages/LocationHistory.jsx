
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '@/contexts/LocationContext';
import AdminSidebar from '@/components/AdminSidebar';
import LocationMap from '@/components/LocationMap';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MapPin, Calendar, User, Edit3, Home, Image as ImageIcon, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LocationHistory = () => {
  const { getAllLocations, getAllActivities } = useLocation();
  const [userData, setUserData] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [selectedUser, setSelectedUser] = useState('all');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  
  useEffect(() => {
    const locationData = getAllLocations();
    const activityData = getAllActivities();
    
    setUserData(locationData);
    setAllActivities(activityData);
    
    const allUserLocations = [];
    locationData.forEach(user => {
      user.locations.forEach(location => {
        allUserLocations.push({
          ...location,
          userName: user.userName,
          userId: user.userId
        });
      });
    });
    allUserLocations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFilteredLocations(allUserLocations);
    
    activityData.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFilteredActivities(activityData);

  }, [getAllLocations, getAllActivities]);
  
  const handleUserChange = (userId) => {
    setSelectedUser(userId);
    
    if (userId === 'all') {
      const allUserLocations = [];
      userData.forEach(user => {
        user.locations.forEach(location => {
          allUserLocations.push({
            ...location,
            userName: user.userName,
            userId: user.userId
          });
        });
      });
      allUserLocations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setFilteredLocations(allUserLocations);
      
      const sortedActivities = [...allActivities].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
      setFilteredActivities(sortedActivities);

    } else {
      const userLocData = userData.find(u => u.userId === userId);
      if (userLocData) {
        const userLocations = userLocData.locations.map(location => ({
          ...location,
          userName: userLocData.userName,
          userId: userLocData.userId
        }));
        userLocations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setFilteredLocations(userLocations);
      } else {
        setFilteredLocations([]);
      }

      const userActivities = allActivities.filter(act => act.userId === userId);
      userActivities.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
      setFilteredActivities(userActivities);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">User Activity & Location History</h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>User Filter</CardTitle>
                <CardDescription>
                  Select a user to view their location history and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" onValueChange={handleUserChange}>
                  <TabsList className="mb-4 flex flex-wrap h-auto">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <Users size={16} />
                      <span>All Users</span>
                    </TabsTrigger>
                    
                    {userData.map(user => (
                      <TabsTrigger 
                        key={user.userId} 
                        value={user.userId}
                        className="flex items-center gap-2"
                      >
                        <Avatar className="h-5 w-5 text-xs"><AvatarFallback>{user.userName.charAt(0)}</AvatarFallback></Avatar>
                        <span>{user.userName}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="all">
                    <p className="text-sm text-gray-500">
                      Showing data for all users
                    </p>
                  </TabsContent>
                  
                  {userData.map(user => (
                    <TabsContent key={user.userId} value={user.userId}>
                      <p className="text-sm text-gray-500">
                        Showing data for {user.userName}
                      </p>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>Map View</span>
                  </CardTitle>
                  <CardDescription>
                    Visual representation of location data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LocationMap 
                    locations={filteredLocations}
                    height="500px"
                    zoom={selectedUser === 'all' ? 3 : 10}
                  />
                </CardContent>
              </Card>
            </motion.div>
            
            <div className="space-y-6">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                <Card>
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Edit3 size={20} />
                        <span>Logged Activities</span>
                    </CardTitle>
                    <CardDescription>
                        Recent activities logged by the selected user(s)
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="max-h-[230px] overflow-y-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Photo</TableHead>
                            <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredActivities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell className="font-medium text-xs">{activity.userName}</TableCell>
                                <TableCell className="text-xs">{activity.name}</TableCell>
                                <TableCell className="text-xs">{activity.address}</TableCell>
                                <TableCell>
                                {activity.photoUrl ? (
                                     <img  src={activity.photoUrl} alt={activity.name} className="h-8 w-8 rounded object-cover" src="https://images.unsplash.com/photo-1498716209592-caac1a2ec6fe" />
                                ) : (
                                    <div className="h-8 w-8 rounded bg-gray-200 flex items-center justify-center">
                                    <ImageIcon size={14} className="text-gray-400" />
                                    </div>
                                )}
                                </TableCell>
                                <TableCell className="text-xs">{new Date(activity.timestamp).toLocaleTimeString()}</TableCell>
                            </TableRow>
                            ))}
                            {filteredActivities.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-gray-500 text-sm">
                                No activities found
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </div>
                    </CardContent>
                </Card>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                >
                <Card>
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar size={20} />
                        <span>Location Points</span>
                    </CardTitle>
                    <CardDescription>
                        Detailed location history records
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="max-h-[230px] overflow-y-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Coordinates</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLocations.map((location, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium text-xs">{location.userName}</TableCell>
                                <TableCell className="text-xs">
                                {new Date(location.timestamp).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-xs font-mono">{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</TableCell>
                            </TableRow>
                            ))}
                            
                            {filteredLocations.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4 text-gray-500 text-sm">
                                No location data found
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </div>
                    </CardContent>
                </Card>
                </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationHistory;
