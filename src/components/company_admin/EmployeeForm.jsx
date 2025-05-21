
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EmployeeForm = ({ onSubmit, existingEmployee }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (existingEmployee) {
      setName(existingEmployee.name || '');
      setEmail(existingEmployee.email || '');
      setPassword(''); 
    } else {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [existingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { name, email };
    if (password || !existingEmployee) { 
      employeeData.password = password;
    }
    onSubmit(employeeData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Employee's full name"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="employee@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={existingEmployee ? "Leave blank to keep current password" : "Enter password"}
          required={!existingEmployee} 
        />
         {!existingEmployee && <p className="text-xs text-gray-500 mt-1">Password is required for new employees.</p>}
         {existingEmployee && <p className="text-xs text-gray-500 mt-1">Leave blank to keep the current password.</p>}
      </div>
      <Button type="submit" className="w-full">
        {existingEmployee ? 'Update Employee' : 'Create Employee'}
      </Button>
    </form>
  );
};

export default EmployeeForm;
