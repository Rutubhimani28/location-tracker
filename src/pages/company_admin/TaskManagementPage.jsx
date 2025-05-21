
import React, { useState, useEffect, useCallback } from 'react';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, PlusCircle } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import TaskFormDialog from '@/components/company_admin/TaskFormDialog';
import TaskViewDialog from '@/components/company_admin/TaskViewDialog';
import TasksTable from '@/components/company_admin/TasksTable';

const TaskManagementPage = () => {
  const { getTasksByCompany } = useTasks();
  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchCompanyData = useCallback(() => {
    if (currentUser && currentUser.companyId) {
      const companyTasks = getTasksByCompany(currentUser.companyId);
      setTasks(companyTasks);
      const companyUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]').filter(
        (user) => user.companyId === currentUser.companyId && user.role === 'employee'
      );
      setEmployees(companyUsers);
    }
  }, [currentUser, getTasksByCompany]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);


  const handleCreateNewTask = () => {
    setCurrentTask(null);
    setIsFormOpen(true);
  };

  const handleViewTask = (task) => {
    setCurrentTask(task);
    setIsViewModalOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchCompanyData(); // Re-fetch tasks after form is closed (create/edit)
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900">
      <CompanyAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-t-lg dark:from-gray-900 dark:to-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2"><Briefcase /> Task Management</CardTitle>
                  <CardDescription className="text-gray-300 dark:text-gray-400">Assign, track, and manage tasks for your team.</CardDescription>
                </div>
                <Button onClick={handleCreateNewTask} className="bg-primary hover:bg-primary/90 text-white dark:bg-sky-600 dark:hover:bg-sky-700">
                  <PlusCircle size={18} className="mr-2" /> Create Task
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white dark:bg-slate-800">
              <TaskFormDialog
                isOpen={isFormOpen}
                onClose={handleFormClose}
                task={currentTask}
                employees={employees}
              />

              <TaskViewDialog
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                task={currentTask}
              />
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-6"
              >
                {tasks.length === 0 ? (
                  <motion.p variants={itemVariants} className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No tasks created yet. Click "Create Task" to get started.
                  </motion.p>
                ) : (
                  <TasksTable
                    tasks={tasks}
                    employees={employees} 
                    onViewTask={handleViewTask}
                    itemVariants={itemVariants}
                  />
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
export default TaskManagementPage;
