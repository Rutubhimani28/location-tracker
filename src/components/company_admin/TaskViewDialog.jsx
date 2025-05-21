
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const TaskViewDialog = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-800 shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-white">Task Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4 max-h-[70vh] overflow-y-auto px-2 text-sm">
          <p><strong className="text-gray-700 dark:text-gray-300">Name:</strong> <span className="text-gray-600 dark:text-gray-400">{task.name}</span></p>
          {task.description && <p><strong className="text-gray-700 dark:text-gray-300">Description:</strong> <span className="text-gray-600 dark:text-gray-400">{task.description}</span></p>}
          {task.targetAmount !== null && typeof task.targetAmount !== 'undefined' && (
            <p><strong className="text-gray-700 dark:text-gray-300">Target Amount:</strong> <span className="text-gray-600 dark:text-gray-400">${task.targetAmount.toLocaleString()}</span></p>
          )}
          <p><strong className="text-gray-700 dark:text-gray-300">Start Date:</strong> <span className="text-gray-600 dark:text-gray-400">{new Date(task.startDate).toLocaleDateString()}</span></p>
          <p><strong className="text-gray-700 dark:text-gray-300">End Date:</strong> <span className="text-gray-600 dark:text-gray-400">{new Date(task.endDate).toLocaleDateString()}</span></p>
          <p><strong className="text-gray-700 dark:text-gray-300">Assigned To:</strong> <span className="text-gray-600 dark:text-gray-400">{task.assigneeName || 'N/A'}</span></p>
          <p><strong className="text-gray-700 dark:text-gray-300">Status:</strong> 
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
              task.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' 
              : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' 
              : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
            }`}>
              {task.status}
            </span>
          </p>
          <p><strong className="text-gray-700 dark:text-gray-300">Created At:</strong> <span className="text-gray-600 dark:text-gray-400">{new Date(task.createdAt).toLocaleString()}</span></p>
        </div>
        <DialogFooter className="pt-4">
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-white dark:bg-sky-600 dark:hover:bg-sky-700">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskViewDialog;
