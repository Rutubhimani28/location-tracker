
import React from 'react';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const DocumentManagementPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <CompanyAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText /> Document Management</CardTitle>
            <CardDescription>Securely store, share, and manage company documents.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Document management system features will be available here.</p>
            <p className="mt-4 text-sm text-gray-500">Includes secure storage with role-based access, version control, e-signature capabilities, and document workflow automation.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default DocumentManagementPage;
