
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [taskProgress, setTaskProgress] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    const storedProgress = JSON.parse(localStorage.getItem('taskProgress')) || [];
    setTaskProgress(storedProgress);
  }, []);

  const saveTasks = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const saveTaskProgress = (updatedProgress) => {
    localStorage.setItem('taskProgress', JSON.stringify(updatedProgress));
    setTaskProgress(updatedProgress);
  };

  const createTask = (taskData) => {
    if (!currentUser || !currentUser.companyId) {
      toast({ title: "Error", description: "User not associated with a company.", variant: "destructive" });
      return;
    }
    const newTask = { 
      id: uuidv4(), 
      ...taskData, 
      companyId: currentUser.companyId, 
      status: 'Pending', 
      createdAt: new Date().toISOString(),
      progressUpdates: [] 
    };
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    toast({ title: "Success", description: "Task created successfully." });
    return newTask;
  };

  const getTasksByCompany = (companyId) => {
    return tasks.filter(task => task.companyId === companyId);
  };

  const getTasksByAssignee = (employeeId) => {
    return tasks.filter(task => task.assigneeId === employeeId);
  };

  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId);
  }

  const updateTaskStatus = (taskId, status) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    );
    saveTasks(updatedTasks);
    toast({ title: "Success", description: `Task status updated to ${status}.` });
  };
  
  const addTaskProgress = (progressData) => {
    const newProgress = { id: uuidv4(), ...progressData, submittedAt: new Date().toISOString() };
    const updatedProgress = [...taskProgress, newProgress];
    saveTaskProgress(updatedProgress);

    const taskToUpdate = tasks.find(t => t.id === progressData.taskId);
    if (taskToUpdate) {
      const updatedTasks = tasks.map(t => 
        t.id === progressData.taskId 
        ? { ...t, progressUpdates: [...(t.progressUpdates || []), newProgress] } 
        : t
      );
      saveTasks(updatedTasks);
    }
    
    toast({ title: "Success", description: "Task progress updated." });
    return newProgress;
  };

  const getProgressForTask = (taskId) => {
    return taskProgress.filter(p => p.taskId === taskId);
  };
  
  const getProgressByCompany = (companyId) => {
    const companyTasks = getTasksByCompany(companyId);
    const companyTaskIds = companyTasks.map(task => task.id);
    return taskProgress.filter(progress => companyTaskIds.includes(progress.taskId));
  };


  return (
    <TaskContext.Provider value={{ 
      tasks, 
      createTask, 
      getTasksByCompany, 
      getTasksByAssignee,
      getTaskById,
      updateTaskStatus,
      addTaskProgress,
      getProgressForTask,
      getProgressByCompany
    }}>
      {children}
    </TaskContext.Provider>
  );
};
