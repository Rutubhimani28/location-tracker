
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import EmployeeForm from '@/components/company_admin/EmployeeForm';
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
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const EmployeeManagement = () => {
  const { toast } = useToast();
  const { createEmployee, currentUser } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    // Load and filter employees for current company
    const allEmployees = JSON.parse(localStorage.getItem('mockUsers')) || [];
    const companyEmployees = allEmployees.filter(emp => emp.companyId === currentUser.companyId);
    setEmployees(companyEmployees);

    const intervalId = setInterval(() => {
      setEmployees(currentEmployees => 
        currentEmployees.map(emp => ({
          ...emp,
          signInTime: localStorage.getItem(`signInTime_${emp.id}`) || null
        }))
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentUser.companyId]);

  const handleEmployeeSubmit = (employeeData) => {
    if (editingEmployee) {
      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id 
          ? {...emp, ...employeeData, role: 'employee', companyId: currentUser.companyId}
          : emp
      );
      
      const allEmployees = JSON.parse(localStorage.getItem('mockUsers')) || [];
      const otherEmployees = allEmployees.filter(emp => emp.companyId !== currentUser.companyId);
      localStorage.setItem('mockUsers', JSON.stringify([...otherEmployees, ...updatedEmployees]));
      
      setEmployees(updatedEmployees);
      toast({ title: "Employee Updated", description: `${employeeData.name}'s details have been updated.` });
    } else {
      const newEmployee = createEmployee(employeeData, currentUser.companyId);
      setEmployees(prev => [...prev, newEmployee]);
    }
    setEditingEmployee(null);
    setDialogOpen(false);
  };

  const openEditDialog = (employee) => {
    setEditingEmployee(employee);
    setDialogOpen(true);
  };

  const openNewEmployeeDialog = () => {
    setEditingEmployee(null);
    setDialogOpen(true);
  };

  const toggleEmployeeStatus = (employeeId) => {
    const updatedEmployees = employees.map(emp => {
      if (emp.id === employeeId) {
        const newStatus = emp.status === 'active' ? 'inactive' : 'active';
        if (newStatus === 'inactive' && localStorage.getItem(`signInTime_${emp.id}`)) {
          localStorage.removeItem(`signInTime_${emp.id}`);
          toast({ title: "User Logged Out", description: `${emp.name} has been logged out due to deactivation.` });
        }
        return { ...emp, status: newStatus, signInTime: newStatus === 'inactive' ? null : emp.signInTime };
      }
      return emp;
    });

    const allEmployees = JSON.parse(localStorage.getItem('mockUsers')) || [];
    const otherEmployees = allEmployees.filter(emp => emp.companyId !== currentUser.companyId);
    localStorage.setItem('mockUsers', JSON.stringify([...otherEmployees, ...updatedEmployees]));

    setEmployees(updatedEmployees);
    toast({ title: "Status Updated", description: `Employee status changed.` });
  };

  const deleteEmployee = (employeeId) => {
    const employeeToDelete = employees.find(emp => emp.id === employeeId);
    if (employeeToDelete && localStorage.getItem(`signInTime_${employeeToDelete.id}`)) {
      localStorage.removeItem(`signInTime_${employeeToDelete.id}`);
    }

    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    const allEmployees = JSON.parse(localStorage.getItem('mockUsers')) || [];
    const otherEmployees = allEmployees.filter(emp => emp.companyId !== currentUser.companyId);
    localStorage.setItem('mockUsers', JSON.stringify([...otherEmployees, ...updatedEmployees]));

    setEmployees(updatedEmployees);
    localStorage.removeItem(`locationHistory_${employeeId}`);
    localStorage.removeItem(`activities_${employeeId}`);
    toast({ title: "Employee Deleted", description: `Employee has been removed.`, variant: "destructive" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <CompanyAdminSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <motion.h1 
              initial={{ opacity:0, x: -20 }}
              animate={{ opacity:1, x: 0 }}
              className="text-3xl font-bold text-gray-800"
            >
              {currentUser.companyName} - Employee Management
            </motion.h1>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewEmployeeDialog} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                  <UserPlus size={18} /> Add New Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
                </DialogHeader>
                <EmployeeForm onSubmit={handleEmployeeSubmit} existingEmployee={editingEmployee} />
              </DialogContent>
            </Dialog>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Employee List</CardTitle>
                <CardDescription>Manage your company's employees</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Signed In</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.length > 0 ? employees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>{employee.name ? employee.name.charAt(0).toUpperCase() : 'E'}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            employee.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {employee.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {employee.signInTime ? 
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Clock size={14} /> {new Date(employee.signInTime).toLocaleString()}
                            </span> : 
                            <span className="text-sm text-gray-400">Never</span>
                          }
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(employee)} className="mr-2 text-blue-600 hover:text-blue-800">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => toggleEmployeeStatus(employee.id)} className={`mr-2 ${employee.status === 'active' ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'}`}>
                            {employee.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteEmployee(employee.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan="5" className="text-center text-gray-500 py-8">
                          No employees found. Add employees to get started.
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

export default EmployeeManagement;
