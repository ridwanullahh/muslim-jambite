
import { ReactNode } from 'react';
import { Navigation } from '../Navigation';
import { Footer } from '../Footer';
import { StickyFomoBanner } from '../ui/StickyFomoBanner';

interface SharedLayoutProps {
  children: ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const SharedLayout = ({ children, darkMode, toggleDarkMode }: SharedLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <StickyFomoBanner />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};
