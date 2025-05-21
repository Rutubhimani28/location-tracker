import React from 'react';
import CompanyAdminSidebar from '@/components/company_admin/CompanyAdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck, Link, Settings } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
const Attendance = () => {
    const attendanceRecords = [
        { id: 1, name: 'John Doe', date: '2025-05-21', status: 'Present' },
        { id: 2, name: 'Jane Smith', date: '2025-05-21', status: 'Absent' },
    ];
    return (
        <div className="flex h-screen bg-gray-100">
            <CompanyAdminSidebar />
            <div className="flex-1 overflow-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarCheck /> Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendanceRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'Present'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {record.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* <div className="mt-6 text-right">
                            <Link to="/admin/leave-management" className="text-blue-600 hover:underline text-sm">
                                Go to Leave Management →
                            </Link>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
export default Attendance;
