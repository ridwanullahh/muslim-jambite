
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  FileText,
  Users,
  UserPlus,
  BookOpen,
  Settings,
  LogOut,
  HelpCircle,
  MessageSquare,
  BarChart,
  Database,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin-dashboard', icon: BarChart3 },
  { name: 'Blog Posts', href: '/admin-dashboard/blog', icon: FileText },
  { name: 'Students', href: '/admin-dashboard/students', icon: Users },
  { name: 'Prospects', href: '/admin-dashboard/prospects', icon: UserPlus },
  { name: 'Resources', href: '/admin-dashboard/resources', icon: BookOpen },
  { name: 'FAQ', href: '/admin-dashboard/faq', icon: HelpCircle },
  { name: 'Quiz & Polls', href: '/admin-dashboard/quiz-polls', icon: MessageSquare },
  { name: 'Analytics', href: '/admin-dashboard/analytics', icon: BarChart },
  { name: 'Database', href: '/admin-dashboard/database', icon: Database },
  { name: 'Settings', href: '/admin-dashboard/settings', icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const { user, logout } = useAuth();

  return (
    <div className={cn(
      "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col transition-all duration-300",
      isOpen ? "w-64" : "w-20"
    )}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        {isOpen && (
          <div>
            <h2 className="text-xl font-bold text-gray-900">Admin</h2>
            <p className="text-sm text-gray-600 truncate">{user?.email}</p>
          </div>
        )}
        <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
          <ChevronLeft className={cn("transition-transform", !isOpen && "rotate-180")} />
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-lg mx-2",
              isActive
                ? 'bg-brand-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
              !isOpen && "justify-center"
            )}
          >
            <item.icon className={cn("w-5 h-5", isOpen && "mr-3")} />
            {isOpen && item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          onClick={logout}
          variant="outline"
          className={cn("w-full", !isOpen && "justify-center")}
        >
          <LogOut className={cn("w-4 h-4", isOpen && "mr-2")} />
          {isOpen && "Logout"}
        </Button>
      </div>
    </div>
  );
};
