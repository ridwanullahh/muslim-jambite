
import { ReactNode } from 'react';
import { Navigation } from '../Navigation';
import { Footer } from '../Footer';
import { StickyFomoBanner } from '../ui/StickyFomoBanner';
import { useCountdown } from '@/hooks/useCountdown';

interface SharedLayoutProps {
  children: ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const SharedLayout = ({ children, darkMode, toggleDarkMode }: SharedLayoutProps) => {
  const { isVisible: isBannerVisible, loading } = useCountdown();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* You can add a loader here if you want */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StickyFomoBanner />
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isBannerVisible={isBannerVisible}
      />
      <main className={isBannerVisible ? 'pt-16' : 'pt-0'}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
