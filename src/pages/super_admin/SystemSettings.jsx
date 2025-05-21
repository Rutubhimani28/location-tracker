
import React from 'react';
import SuperAdminSidebar from '@/components/super_admin/SuperAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings, ShieldAlert } from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      <SuperAdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings /> System-Wide Settings</CardTitle>
            <CardDescription>Configure global settings for the Office Management System.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Global system configuration options will be available here.</p>
            <p className="mt-4 text-sm text-gray-500">This includes settings for default roles and permissions, platform branding, security policies (e.g., 2FA requirements for admins), API integrations, and other system-level parameters.</p>
            <div className="mt-6 p-4 border rounded-lg bg-slate-50">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2"><ShieldAlert size={20} className="text-amber-600" /> Security Configuration</h3>
                <p className="text-sm text-slate-600">Two-Factor Authentication for Admins: <span className="font-bold text-green-600">Enabled</span></p>
                <p className="text-sm text-slate-500">Session Timeout: 30 minutes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default SystemSettings;
