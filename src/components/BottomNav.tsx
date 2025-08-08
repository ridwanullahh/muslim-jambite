import { useLocation } from 'react-router-dom';
import { Home, Layers, BookText, Phone, UserPlus } from 'lucide-react';
import { useCallback } from 'react';

interface BottomNavProps {
  isBannerVisible: boolean;
}

export const BottomNav = ({ isBannerVisible }: BottomNavProps) => {
  const location = useLocation();

  const goTo = useCallback((sectionId: string, path?: string) => {
    if (path) {
      window.location.href = path;
      return;
    }

    const onHome = location.pathname === '/';
    if (onHome) {
      const section = document.getElementById(sectionId);
      const headerHeight = isBannerVisible ? 120 : 80;
      if (section) {
        const top = section.offsetTop - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }
    window.location.href = `/${sectionId === 'home' ? '' : `#${sectionId}`}`;
  }, [location.pathname, isBannerVisible]);

  const items = [
    { id: 'home', label: 'Home', icon: Home, action: () => goTo('home', '/') },
    { id: 'programs', label: 'Programs', icon: Layers, action: () => goTo('programs') },
    { id: 'blog', label: 'Blog', icon: BookText, action: () => goTo('', '/blog') },
    { id: 'contact', label: 'Contact', icon: Phone, action: () => goTo('', '/contact') },
    { id: 'registration', label: 'Register', icon: UserPlus, action: () => goTo('registration') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="mx-auto max-w-3xl px-3 pb-4">
        <div className="relative">
          <div className="absolute -inset-x-2 -inset-y-2 rounded-2xl bg-gradient-to-r from-brand-primary/30 to-brand-accent/30 blur-xl" />
          <div className="relative grid grid-cols-5 gap-2 rounded-2xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:dark:bg-gray-900/70">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = (item.id === 'home' && location.pathname === '/') || location.pathname.startsWith(`/${item.id}`) || location.hash === `#${item.id}`;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`flex flex-col items-center justify-center py-3 px-2 text-xs font-medium rounded-2xl transition-all ${
                    isActive
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-brand-primary' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

