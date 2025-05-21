
import React from 'react';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building } from 'lucide-react';

const ResourceManagementPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <CompanyAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building /> Office Resource Management</CardTitle>
            <CardDescription>Manage office resources like desks, meeting rooms, and assets.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Office resource management tools will be available here.</p>
            <p className="mt-4 text-sm text-gray-500">Features include desk/room booking systems with calendar integration, asset tracking (laptops, keys), and maintenance request management.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default ResourceManagementPage;
