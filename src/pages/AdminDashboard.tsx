
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboardHome } from '@/components/admin/AdminDashboardHome';
import { AdminBlogManager } from '@/components/admin/AdminBlogManager';
import { AdminStudentManager } from '@/components/admin/AdminStudentManager';
import { AdminResourceManager } from '@/components/admin/AdminResourceManager';
import { AdminQuizPollManager } from '@/components/admin/AdminQuizPollManager';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { DatabaseSeeder } from '@/services/DatabaseSeeder';

export const AdminDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardHome />} />
        <Route path="/blog" element={<AdminBlogManager />} />
        <Route path="/students" element={<AdminStudentManager />} />
        <Route path="/prospects" element={<AdminStudentManager />} />
        <Route path="/resources" element={<AdminResourceManager />} />
        <Route path="/faq" element={<div className="p-6"><h1 className="text-2xl font-bold">FAQ Management</h1><p>Coming soon...</p></div>} />
        <Route path="/quiz-polls" element={<AdminQuizPollManager />} />
        <Route path="/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p>Coming soon...</p></div>} />
        <Route path="/database" element={<div className="p-6"><h1 className="text-2xl font-bold">Database Management</h1><p>Coming soon...</p></div>} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};
