
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
  Database
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Prospects', href: '/admin/prospects', icon: UserPlus },
  { name: 'Resources', href: '/admin/resources', icon: BookOpen },
  { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { name: 'Quiz & Polls', href: '/admin/quiz-polls', icon: MessageSquare },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
  { name: 'Database', href: '/admin/database', icon: Database },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export const AdminSidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-sm text-gray-600">{user?.email}</p>
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">
            {user?.role}
          </span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `
              flex items-center px-6 py-3 text-sm font-medium transition-colors
              ${isActive 
                ? 'bg-brand-primary text-white' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
