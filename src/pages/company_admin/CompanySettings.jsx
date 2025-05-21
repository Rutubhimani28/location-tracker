
import React from 'react';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const CompanySettings = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <CompanyAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings /> Company Settings</CardTitle>
            <CardDescription>Manage company-level configurations and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Company settings options will be available here.</p>
             <p className="mt-4 text-sm text-gray-500">Configure general company information, branding, and operational parameters.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default CompanySettings;
