
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Briefcase, UserCog, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('employee');
  
  const { login, currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser) {
      if (userRole === 'superadmin') {
        navigate('/superadmin/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'employee') {
        navigate('/employee/dashboard');
      }
    }
  }, [currentUser, userRole, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const user = await login(email, password);
      
      if (user.role === 'superadmin') {
        navigate('/superadmin/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'employee') {
        navigate('/employee/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (value) => {
    setLoginType(value);
    setEmail('');
    setPassword('');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Briefcase size={32} className="text-primary" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800">MyOffice Tracking</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        
        <Tabs defaultValue={loginType} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="employee" className="flex items-center gap-2">
              <User size={16} />
              <span>Employee</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <UserCog size={16} />
              <span>Company Admin</span>
            </TabsTrigger>
            <TabsTrigger value="superadmin" className="flex items-center gap-2">
              <Briefcase size={16} /> 
              <span>Superadmin</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
