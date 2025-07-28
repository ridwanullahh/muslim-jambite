
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Download, Mail, Phone } from 'lucide-react';
import { RegistrationService } from '@/lib/sdk';
import { Student } from '@/types/sdk';

export const AdminStudentManager = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const studentsData = await RegistrationService.getStudents();
      setStudents(studentsData);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.paymentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const exportStudents = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Payment Status', 'Monthly Fee', 'Registration Date'].join(','),
      ...filteredStudents.map(student => [
        student.fullName,
        student.email,
        student.phone || '',
        student.paymentStatus || '',
        student.monthlyFee || '',
        student.createdAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage registered students and their information</p>
        </div>
        <Button onClick={exportStudents}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Students</option>
          <option value="success">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{student.fullName}</CardTitle>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <p className="text-sm text-gray-500">{student.program || 'JAMB Prep'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={student.paymentStatus === 'success' ? 'default' : 'secondary'}>
                    {student.paymentStatus === 'success' ? 'Paid' : 'Pending'}
                  </Badge>
                  <span className="text-sm font-medium">₦{student.monthlyFee || 1500}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    {student.phone && (
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-600">Phone</p>
                  <p>{student.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">State</p>
                  <p>{student.state || 'Not provided'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Registration Date</p>
                  <p>{new Date(student.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Payment Status</p>
                  <p>{student.paymentStatus || 'Pending'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
