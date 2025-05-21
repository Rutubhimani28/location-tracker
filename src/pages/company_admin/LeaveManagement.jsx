import React from 'react'
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';


const LeaveManagement = () => {
    const attendanceRecords = [
        { id: 1, name: 'John Doe', date: '2025-05-21', status: 'Present' },
        { id: 2, name: 'Jane Smith', date: '2025-05-21', status: 'Absent' },
    ];
    return (
        <div className="flex h-screen bg-gray-100">
            <CompanyAdminSidebar />
            <div className="flex-1 overflow-auto p-6">
                FFFF    
            </div>
        </div>
    );
}

export default LeaveManagement
