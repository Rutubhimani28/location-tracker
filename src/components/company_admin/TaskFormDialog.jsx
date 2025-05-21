
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTasks } from '@/contexts/TaskContext';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const TaskFormDialog = ({ isOpen, onClose, task, employees }) => {
  const { createTask, updateTaskStatus } = useTasks(); // Assuming updateTask will be implemented for edits
  const { toast } = useToast();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  useEffect(() => {
    if (task) {
      setTaskName(task.name || '');
      setTaskDescription(task.description || '');
      setTargetAmount(task.targetAmount?.toString() || '');
      setStartDate(task.startDate || '');
      setEndDate(task.endDate || '');
      setAssigneeId(task.assigneeId || '');
    } else {
      resetForm();
    }
  }, [task, isOpen]);

  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTargetAmount('');
    setStartDate('');
    setEndDate('');
    setAssigneeId('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !startDate || !endDate || !assigneeId) {
      toast({ title: "Validation Error", description: "Please fill all required fields (Task Name, Start Date, End Date, Assignee).", variant: "destructive" });
      return;
    }
    
    const taskData = {
      name: taskName,
      description: taskDescription,
      targetAmount: targetAmount ? parseFloat(targetAmount) : null,
      startDate,
      endDate,
      assigneeId,
      assigneeName: employees.find(emp => emp.id === assigneeId)?.name || 'N/A'
    };

    if (task && task.id) {
      // updateTask(task.id, taskData); // Placeholder for update functionality
      toast({ title: "Info", description: "Task update functionality not yet implemented.", variant: "default" });
    } else {
      createTask(taskData);
    }
    onClose(); // Close dialog and trigger re-fetch in parent
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-800 shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
            {task ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Fill in the details below to {task ? 'update the' : 'create a new'} task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4 px-2 max-h-[70vh] overflow-y-auto">
          <div>
            <Label htmlFor="taskNameForm" className="text-sm font-medium text-gray-700 dark:text-gray-300">Task Name</Label>
            <Input id="taskNameForm" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="e.g., Prepare Q3 Report" className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" required />
          </div>
          <div>
            <Label htmlFor="taskDescriptionForm" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Optional)</Label>
            <Input id="taskDescriptionForm" type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Detailed description of the task" className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" />
          </div>
          <div>
            <Label htmlFor="targetAmountForm" className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Amount (Optional, for sales)</Label>
            <Input id="targetAmountForm" type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="e.g., 5000" className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDateForm" className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</Label>
              <Input id="startDateForm" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" required />
            </div>
            <div>
              <Label htmlFor="endDateForm" className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</Label>
              <Input id="endDateForm" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600" required />
            </div>
          </div>
          <div>
            <Label htmlFor="assigneeIdForm" className="text-sm font-medium text-gray-700 dark:text-gray-300">Assign To</Label>
            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger id="assigneeIdForm" className="w-full mt-1 dark:bg-slate-700 dark:text-white dark:border-slate-600">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-700 dark:text-white">
                {employees && employees.length > 0 ? employees.map(emp => (
                  <SelectItem key={emp.id} value={emp.id} className="hover:dark:bg-slate-600">{emp.name} ({emp.email})</SelectItem>
                )) : <SelectItem value="no-employees" disabled>No employees available</SelectItem>}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="dark:text-gray-300 dark:border-slate-500 hover:dark:bg-slate-700">Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white dark:bg-sky-600 dark:hover:bg-sky-700">
                {task ? 'Update Task' : 'Create Task'}
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
