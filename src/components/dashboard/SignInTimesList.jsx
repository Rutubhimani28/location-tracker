
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SignInTimesList = ({ signInTimes, getAllLocations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Sign-In Times</CardTitle>
        <CardDescription>Users currently signed into the app</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[450px] overflow-y-auto">
        {Object.keys(signInTimes).length > 0 ? (
          <ul className="space-y-3">
            {Object.entries(signInTimes).map(([userId, time]) => {
              const userLocations = getAllLocations();
              const userDetails = userLocations.find(u => u.userId === userId) || 
                                  (userId === 'adminVishnu' ? { userName: 'Vishnu Admin', userId: 'adminVishnu'} : { userName: 'Unknown User'});
              return (
                <li key={userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{userDetails.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{userDetails.userName}</span>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(time).toLocaleTimeString()}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-4">No users currently signed in.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SignInTimesList;
