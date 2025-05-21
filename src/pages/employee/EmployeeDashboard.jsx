
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EmployeeAppHeader from '@/components/employee/EmployeeAppHeader';
import UserWelcomeCard from '@/components/mobile/UserWelcomeCard';
import ActivityUpdateForm from '@/components/mobile/ActivityUpdateForm';
import LocationInfoCard from '@/components/mobile/LocationInfoCard';
import LocationMapCard from '@/components/mobile/LocationMapCard';
import LocationHistoryCard from '@/components/mobile/LocationHistoryCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Briefcase, Building, FileText, CheckCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/contexts/TaskContext';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";


const EmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const { getTasksByAssignee, addTaskProgress, getProgressForTask, getTaskById } = useTasks();
  const { toast } = useToast();

  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedTaskForProgress, setSelectedTaskForProgress] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [amountAchieved, setAmountAchieved] = useState('');

  useEffect(() => {
    if (currentUser) {
      setAssignedTasks(getTasksByAssignee(currentUser.id));
    }
  }, [currentUser, getTasksByAssignee, addTaskProgress]); // Added addTaskProgress to dependencies to refresh list after update


  const handleOpenProgressModal = (task) => {
    setSelectedTaskForProgress(task);
    setCustomerName('');
    setCustomerPhone('');
    setAmountAchieved('');
  };

  const handleProgressSubmit = (e) => {
    e.preventDefault();
    if (!selectedTaskForProgress) return;

    if (!customerName || !customerPhone || !amountAchieved) {
        toast({ title: "Error", description: "Please fill all sales details.", variant: "destructive"});
        return;
    }

    const progressData = {
      taskId: selectedTaskForProgress.id,
      userId: currentUser.id,
      customerName,
      customerPhone,
      amountAchieved: parseFloat(amountAchieved),
    };
    addTaskProgress(progressData);
    // No explicit toast here, TaskContext handles it
    setSelectedTaskForProgress(null); // Close modal
  };
  
  const calculateTotalAchieved = (taskId) => {
    const progressEntries = getProgressForTask(taskId);
    return progressEntries.reduce((total, entry) => total + (entry.amountAchieved || 0), 0);
  };


  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900"
    >
      <EmployeeAppHeader />
      
      <main className="flex-grow container mx-auto p-4 md:p-6 space-y-6">
        <UserWelcomeCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ActivityUpdateForm />
            <LocationInfoCard />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <LocationMapCard />
            <LocationHistoryCard />
          </div>
        </div>

        <motion.div 
          variants={cardVariants} 
          initial="initial"
          animate="in"
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Bell size={20} />
                Company Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">No new announcements at this time.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl font-semibold pt-4 text-gray-700 dark:text-gray-200"
        >
          My Workspace & Tasks
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Tasks Card */}
          <motion.div variants={cardVariants} initial="initial" animate="in" transition={{ delay: 0.4, duration: 0.4 }} className="md:col-span-2 lg:col-span-3">
            <Card className="h-full bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/30 dark:to-green-900/30 border border-teal-200 dark:border-teal-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                  <Briefcase size={24} />
                  My Assigned Tasks
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Tasks assigned to you by your manager.</CardDescription>
              </CardHeader>
              <CardContent>
                {assignedTasks.length > 0 ? (
                  <ul className="space-y-4">
                    {assignedTasks.map(task => {
                      const totalAchieved = task.targetAmount ? calculateTotalAchieved(task.id) : 0;
                      const remainingTarget = task.targetAmount ? task.targetAmount - totalAchieved : null;
                      return (
                        <li key={task.id} className="p-4 bg-white/70 dark:bg-slate-800/50 rounded-lg shadow hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-lg text-teal-800 dark:text-teal-200">{task.name}</h4>
                          {task.description && <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{task.description}</p>}
                          <p className="text-xs text-gray-500 dark:text-gray-500">Due: {new Date(task.endDate).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Status: <span className={`font-medium ${task.status === 'Completed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{task.status}</span></p>
                          
                          {task.targetAmount && (
                            <div className="mt-3 pt-3 border-t border-teal-200 dark:border-teal-700">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Target: <span className="font-bold text-teal-600 dark:text-teal-400">${task.targetAmount.toLocaleString()}</span></p>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Achieved: <span className="font-bold text-green-600 dark:text-green-400">${totalAchieved.toLocaleString()}</span></p>
                              {remainingTarget !== null && remainingTarget > 0 && (
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Remaining: <span className="font-bold text-red-600 dark:text-red-400">${remainingTarget.toLocaleString()}</span></p>
                              )}
                              {remainingTarget !== null && remainingTarget <= 0 && (
                                <p className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle size={16}/> Target Reached!</p>
                              )}
                              <Button onClick={() => handleOpenProgressModal(task)} size="sm" className="mt-2 bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600">
                                <TrendingUp size={16} className="mr-1" /> Update Sales Progress
                              </Button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No tasks assigned to you at the moment.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>


          <motion.div variants={cardVariants} initial="initial" animate="in" transition={{ delay: 0.5, duration: 0.4 }}>
            <Card className="h-full bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/30 dark:to-sky-900/30 border border-cyan-200 dark:border-cyan-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                  <Building size={20} />
                  Book Resources
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Reserve meeting rooms or equipment.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">Resource booking features coming soon.</p>
                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Example: Meeting Room A - Available</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} initial="initial" animate="in" transition={{ delay: 0.6, duration: 0.4 }}>
            <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <FileText size={20} />
                  My Documents
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Access your shared documents.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">Document access features coming soon.</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Example: Employee Handbook v2.pdf</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
         {/* Dialog for Sales Progress Update */}
        <Dialog open={selectedTaskForProgress !== null} onOpenChange={() => setSelectedTaskForProgress(null)}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">Update Sales Progress</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Log sales for: {selectedTaskForProgress?.name}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleProgressSubmit} className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="customerName" className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name</Label>
                        <Input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" required />
                    </div>
                    <div>
                        <Label htmlFor="customerPhone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Phone</Label>
                        <Input id="customerPhone" type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" required />
                    </div>
                    <div>
                        <Label htmlFor="amountAchieved" className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount Achieved ($)</Label>
                        <Input id="amountAchieved" type="number" step="0.01" value={amountAchieved} onChange={(e) => setAmountAchieved(e.target.value)} className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" required />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setSelectedTaskForProgress(null)} className="dark:text-gray-300 dark:border-slate-500 hover:dark:bg-slate-700">Cancel</Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600">Submit Progress</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        Office Management System &copy; {new Date().getFullYear()}
      </footer>
    </motion.div>
  );
};

export default EmployeeDashboard;
