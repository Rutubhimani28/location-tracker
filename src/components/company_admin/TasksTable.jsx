
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TasksTable = ({ tasks, employees, onViewTask, itemVariants }) => {
  // Note: Edit and Delete functionalities are placeholders
  const handleEditTask = (task) => {
    console.log("Edit task:", task.id); // Placeholder
  };

  const handleDeleteTask = (taskId) => {
    console.log("Delete task:", taskId); // Placeholder
  };

  return (
    <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-700">
          <TableRow>
            <TableHead className="text-gray-600 dark:text-gray-300">Task Name</TableHead>
            <TableHead className="text-gray-600 dark:text-gray-300">Assigned To</TableHead>
            <TableHead className="text-gray-600 dark:text-gray-300">End Date</TableHead>
            <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-600 dark:text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <motion.tr variants={itemVariants} key={task.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <TableCell className="font-medium text-gray-800 dark:text-gray-200">{task.name}</TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">{task.assigneeName || employees.find(e => e.id === task.assigneeId)?.name || 'N/A'}</TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">{new Date(task.endDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' 
                  : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100' 
                  : 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'
                }`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell className="space-x-1">
                <Button variant="outline" size="sm" onClick={() => onViewTask(task)} className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/50">
                  <Eye size={16} />
                </Button>
                {/* Edit button - functionality to be implemented 
                <Button variant="outline" size="sm" onClick={() => handleEditTask(task)} className="text-yellow-500 border-yellow-500 hover:bg-yellow-50 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-900/50">
                  <Edit2 size={16} />
                </Button>
                */}
                {/* Delete button - functionality to be implemented 
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)} className="text-red-500 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/50">
                  <Trash2 size={16} />
                </Button>
                */}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
