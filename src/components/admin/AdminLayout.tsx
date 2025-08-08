
import { ReactNode, useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        <div className="md:hidden p-4">
          <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} variant="ghost">
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};
