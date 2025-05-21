
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const AttendanceLog = ({ attendanceData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Attendance</CardTitle>
        <CardDescription>User sign-in status for today</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[450px] overflow-y-auto">
        {attendanceData.length > 0 ? (
          <ul className="space-y-3">
            {attendanceData.map((user) => (
              <li key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium text-sm">{user.name || 'Unnamed User'}</span>
                    {user.status === 'Present' && user.signInTime !== 'N/A' && (
                       <p className="text-xs text-gray-500 flex items-center gap-1">
                         <Clock size={12} /> {user.signInTime}
                       </p>
                    )}
                  </div>
                </div>
                {user.status === 'Present' ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-4">No user data available for attendance.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceLog;
