
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/AdminSidebar';
import UserForm from '@/components/UserForm';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Edit, Trash2, UserCheck, UserX, Clock } from 'lucide-react';

const UserManagement = () => {
  const initialUsers = [
    { 
      id: 'user1', 
      name: 'App User', 
      email: 'user@example.com', 
      status: 'active',
      lastActive: '2025-05-06T15:30:00Z',
      created: '2025-01-15T10:00:00Z',
      signInTime: localStorage.getItem('signInTime_user1') || null,
    },
    { 
      id: 'user2', 
      name: 'Jane Doe', 
      email: 'jane@example.com', 
      status: 'active',
      lastActive: '2025-05-05T09:45:00Z',
      created: '2025-02-20T14:30:00Z',
      signInTime: localStorage.getItem('signInTime_user2') || null,
    },
    { 
      id: 'user3', 
      name: 'John Smith', 
      email: 'john@example.com', 
      status: 'inactive',
      lastActive: '2025-04-28T11:20:00Z',
      created: '2025-03-10T08:15:00Z',
      signInTime: localStorage.getItem('signInTime_user3') || null,
    }
  ];

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('mockUsers');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mockUsers', JSON.stringify(users));
    // Periodically update signInTime for currently displayed users
    const intervalId = setInterval(() => {
      setUsers(currentUsers => currentUsers.map(u => ({
        ...u,
        signInTime: localStorage.getItem(`signInTime_${u.id}`) || null
      })));
    }, 5000); // Check every 5 seconds
    return () => clearInterval(intervalId);
  }, [users]);
  
  const handleUserCreated = () => {
    setDialogOpen(false);
    const storedUsers = localStorage.getItem('mockUsers');
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  };
  
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };
  
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    localStorage.removeItem(`signInTime_${userId}`);
    localStorage.removeItem(`locationHistory_${userId}`);
    localStorage.removeItem(`activities_${userId}`);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus size={18} />
                  <span>Add New User</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <UserForm onSuccess={handleUserCreated} />
              </DialogContent>
            </Dialog>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Manage app users and their access. Green dot indicates signed-in.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sign-In Time</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                            {user.signInTime && <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse-slow"></span>}
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {user.signInTime ? (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={12}/>
                                {new Date(user.signInTime).toLocaleTimeString()}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">Not signed in</span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {new Date(user.created).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleUserStatus(user.id)}
                              title={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
                            >
                              {user.status === 'active' ? (
                                <UserX size={16} className="text-gray-500" />
                              ) : (
                                <UserCheck size={16} className="text-green-500" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              title="Edit user (Not Implemented)"
                              disabled
                            >
                              <Edit size={16} className="text-blue-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteUser(user.id)}
                              title="Delete user"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {users.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No users found. Click 'Add New User' to create one.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
