
import React, { useState } from 'react';
import SuperAdminSidebar from '@/components/super_admin/SuperAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, UserPlus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const CompanyManagement = () => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState(() => {
    const storedCompanies = localStorage.getItem('companies');
    return storedCompanies ? JSON.parse(storedCompanies) : [];
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCompany = {
      id: `company${Date.now()}`,
      name: companyName,
      adminEmail,
      adminPassword,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));

    toast({
      title: "Company Created",
      description: `${companyName} has been successfully created with admin access.`
    });

    setDialogOpen(false);
    setCompanyName('');
    setAdminEmail('');
    setAdminPassword('');
  };

  const deleteCompany = (companyId) => {
    const updatedCompanies = companies.filter(company => company.id !== companyId);
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    
    toast({
      title: "Company Deleted",
      description: "The company has been removed from the system.",
      variant: "destructive"
    });
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <SuperAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Company Management</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <UserPlus size={18} /> Add New Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter admin email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Create Company</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building /> Manage Companies</CardTitle>
            <CardDescription>Create and manage company accounts</CardDescription>
          </CardHeader>
          <CardContent>
            {companies.length > 0 ? (
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="p-4 border rounded-lg bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-slate-700">{company.name}</h3>
                        <p className="text-sm text-slate-600">Admin: {company.adminEmail}</p>
                        <p className="text-sm text-slate-500">Created: {new Date(company.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-blue-600">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => deleteCompany(company.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                No companies added yet. Click "Add New Company" to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyManagement;
