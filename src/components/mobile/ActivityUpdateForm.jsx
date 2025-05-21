
import React, { useState, useRef } from 'react';
import { useLocation } from '@/contexts/LocationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, ListChecks, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ActivityUpdateForm = () => {
  const { addActivity } = useLocation();
  const { toast } = useToast();

  const [activityName, setActivityName] = useState('');
  const [activityAddress, setActivityAddress] = useState('');
  const [activityPhoto, setActivityPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const cameraInputRef = useRef(null);

  const handleTakePhoto = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handlePhotoCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setActivityPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateActivity = () => {
    if (!activityName || !activityAddress) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter activity name and address.",
      });
      return;
    }
    if (!activityPhoto) {
      toast({
        variant: "destructive",
        title: "Missing Photo",
        description: "Please capture a photo for the activity.",
      });
      return;
    }

    const activityData = {
      name: activityName,
      address: activityAddress,
      photoUrl: photoPreview, 
    };
    addActivity(activityData);
    setActivityName('');
    setActivityAddress('');
    setActivityPhoto(null);
    setPhotoPreview(null);
    if (cameraInputRef.current) cameraInputRef.current.value = ""; 
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ListChecks size={22}/> Update Activity
        </CardTitle>
        <CardDescription>Log your current activity details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="activityName">Activity Name</Label>
          <Input 
            id="activityName" 
            value={activityName} 
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="e.g., Site Visit, Client Meeting"
          />
        </div>
        <div>
          <Label htmlFor="activityAddress">Address</Label>
          <Input 
            id="activityAddress" 
            value={activityAddress} 
            onChange={(e) => setActivityAddress(e.target.value)}
            placeholder="e.g., 123 Main St, Anytown"
          />
        </div>
        <div>
          <Label htmlFor="activityPhoto">Live Photo</Label>
          <Input 
            id="cameraInput" 
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={handlePhotoCapture}
            ref={cameraInputRef}
            className="hidden"
          />
          <Button onClick={handleTakePhoto} variant="outline" className="w-full flex items-center gap-2">
            <Camera size={18} /> Open Camera
          </Button>
          {photoPreview && (
            <div className="mt-4">
               <img  alt="Activity preview" class="rounded-md max-h-48 w-auto mx-auto shadow-md" src="https://images.unsplash.com/photo-1474400406896-fccde1741419" />
            </div>
          )}
        </div>
        <Button onClick={handleUpdateActivity} className="w-full flex items-center gap-2">
          <Upload size={18}/> Update Activity
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityUpdateForm;
