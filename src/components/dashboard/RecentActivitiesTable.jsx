
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Image as ImageIcon, Home, Edit3, Maximize2 } from 'lucide-react';
import ImageViewerModal from '@/components/ImageViewerModal';
import { Button } from '@/components/ui/button';

const RecentActivitiesTable = ({ activities, title = "Recent Activities", description = "Latest activities logged by users" }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {activities && activities.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Photo</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.userName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                          <Edit3 size={14} className="text-blue-500" />
                          {activity.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Home size={14} />
                          {activity.address}
                      </div>
                      </TableCell>
                    <TableCell>
                      {activity.photoUrl ? (
                        <div className="relative group">
                          <img-replace src={activity.photoUrl} alt={activity.name} className="h-12 w-12 rounded object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105" />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute inset-0 m-auto h-8 w-8 bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                            onClick={() => handleImageClick(activity.photoUrl)}
                          >
                            <Maximize2 size={16} />
                          </Button>
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                          <ImageIcon size={20} className="text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500 py-8">No recent activities logged.</p>
          )}
        </CardContent>
      </Card>
      <ImageViewerModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        imageUrl={selectedImage} 
        altText="Activity Image" 
      />
    </>
  );
};

export default RecentActivitiesTable;
