
import React, { useState, useEffect } from 'react';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, Users, DollarSign, Activity } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const ReportingPage = () => {
  const { getProgressByCompany, getTasksByCompany, getTaskById } = useTasks();
  const { currentUser } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [employeePerformance, setEmployeePerformance] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.companyId) {
      const progressEntries = getProgressByCompany(currentUser.companyId);
      const companyTasks = getTasksByCompany(currentUser.companyId);
      
      const detailedSales = progressEntries.map(entry => {
        const task = companyTasks.find(t => t.id === entry.taskId);
        const employee = (JSON.parse(localStorage.getItem('mockUsers')) || []).find(u => u.id === entry.userId);
        return {
          ...entry,
          taskName: task ? task.name : 'Unknown Task',
          employeeName: employee ? employee.name : 'Unknown Employee',
        };
      });
      setSalesData(detailedSales);

      const currentTotalSales = detailedSales.reduce((sum, entry) => sum + (entry.amountAchieved || 0), 0);
      setTotalSales(currentTotalSales);

      // Aggregate performance
      const performance = {};
      detailedSales.forEach(entry => {
        if (!performance[entry.employeeName]) {
          performance[entry.employeeName] = { name: entry.employeeName, totalAchieved: 0, tasksCompleted: 0 };
        }
        performance[entry.employeeName].totalAchieved += entry.amountAchieved;
        // Note: "tasksCompleted" would require more complex logic based on task status and target.
      });
      setEmployeePerformance(Object.values(performance));
    }
  }, [currentUser, getProgressByCompany, getTasksByCompany]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900">
      <CompanyAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-2xl mb-8">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2"><BarChart3 /> Reporting & Analytics</CardTitle>
                <CardDescription className="text-gray-300">View analytics on company operations and sales performance.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <p className="text-gray-700 dark:text-gray-300">
                  This section provides insights into task progress and sales activities. 
                  More detailed analytics and export options will be available in future updates.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div variants={itemVariants}>
                        <Card className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Sales Achieved</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">${totalSales.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                         <Card className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Sales Entries Logged</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{salesData.length}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                     <motion.div variants={itemVariants}>
                         <Card className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Active Sales Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {getTasksByCompany(currentUser?.companyId || '').filter(t => t.targetAmount).length}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><DollarSign /> Detailed Sales Log</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">Individual sales entries submitted by employees.</CardDescription>
                </CardHeader>
                <CardContent>
                    {salesData.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg border dark:border-gray-700 max-h-96">
                            <Table>
                                <TableHeader className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                                    <TableRow>
                                        <TableHead className="text-gray-600 dark:text-gray-300">Employee</TableHead>
                                        <TableHead className="text-gray-600 dark:text-gray-300">Task</TableHead>
                                        <TableHead className="text-gray-600 dark:text-gray-300">Customer Name</TableHead>
                                        <TableHead className="text-gray-600 dark:text-gray-300">Phone</TableHead>
                                        <TableHead className="text-right text-gray-600 dark:text-gray-300">Amount ($)</TableHead>
                                        <TableHead className="text-gray-600 dark:text-gray-300">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {salesData.map(entry => (
                                        <TableRow key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <TableCell className="font-medium text-gray-800 dark:text-gray-200">{entry.employeeName}</TableCell>
                                            <TableCell className="text-gray-600 dark:text-gray-400">{entry.taskName}</TableCell>
                                            <TableCell className="text-gray-600 dark:text-gray-400">{entry.customerName}</TableCell>
                                            <TableCell className="text-gray-600 dark:text-gray-400">{entry.customerPhone}</TableCell>
                                            <TableCell className="text-right text-green-600 dark:text-green-400 font-semibold">${entry.amountAchieved.toLocaleString()}</TableCell>
                                            <TableCell className="text-gray-500 dark:text-gray-500 text-xs">{new Date(entry.submittedAt).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No sales data recorded yet.</p>
                    )}
                </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default ReportingPage;
