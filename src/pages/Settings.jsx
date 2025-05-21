
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Settings as SettingsIcon, Save, RefreshCw, Clock, MapPin, Bell } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // General settings
  const [appName, setAppName] = useState('Location Tracker');
  const [companyName, setCompanyName] = useState('Your Company');
  
  // Location settings
  const [trackingInterval, setTrackingInterval] = useState(30);
  const [accuracyLevel, setAccuracyLevel] = useState('high');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [adminEmail, setAdminEmail] = useState('admin@example.com');
  
  const handleSaveSettings = (settingType) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Settings saved",
        description: `${settingType} settings have been updated successfully.`,
      });
    }, 1000);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <SettingsIcon size={16} />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="location" className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Location</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={16} />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure basic application settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appName">Application Name</Label>
                      <Input
                        id="appName"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSaveSettings('General')}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>Save Settings</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Location Settings */}
            <TabsContent value="location">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Location Settings</CardTitle>
                    <CardDescription>
                      Configure location tracking parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="trackingInterval">
                        Tracking Interval (seconds)
                      </Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="trackingInterval"
                          type="number"
                          min="5"
                          max="300"
                          value={trackingInterval}
                          onChange={(e) => setTrackingInterval(parseInt(e.target.value))}
                        />
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={16} />
                          <span>{trackingInterval} seconds</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Accuracy Level</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant={accuracyLevel === 'low' ? 'default' : 'outline'}
                          onClick={() => setAccuracyLevel('low')}
                        >
                          Low
                        </Button>
                        <Button
                          type="button"
                          variant={accuracyLevel === 'medium' ? 'default' : 'outline'}
                          onClick={() => setAccuracyLevel('medium')}
                        >
                          Medium
                        </Button>
                        <Button
                          type="button"
                          variant={accuracyLevel === 'high' ? 'default' : 'outline'}
                          onClick={() => setAccuracyLevel('high')}
                        >
                          High
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Higher accuracy may increase battery usage on mobile devices.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSaveSettings('Location')}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>Save Settings</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications" className="flex items-center gap-2 cursor-pointer">
                        <span>Email Notifications</span>
                      </Label>
                      <input
                        id="emailNotifications"
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    {emailNotifications && (
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail">Admin Email</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                        />
                        <p className="text-sm text-gray-500">
                          Notifications will be sent to this email address.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSaveSettings('Notification')}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>Save Settings</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
