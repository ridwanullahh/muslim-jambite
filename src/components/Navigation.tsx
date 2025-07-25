
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, BookOpen, Users, Award, Phone, MessageCircle } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navigation = ({ darkMode, toggleDarkMode }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'programs', label: 'Programs', icon: Award },
    { id: 'about', label: 'About', icon: Users },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'blog', label: 'Blog', icon: MessageCircle }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'blog') {
      window.location.href = '/blog';
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80;
      const sectionTop = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white font-inter">
                  Muslim<span className="text-brand-primary">Jambite</span>
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Excellence • Faith • Future
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      activeSection === item.id
                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-primary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => scrollToSection('registration')}
                className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 font-semibold"
              >
                <span>Start Journey</span>
                <BookOpen className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-20 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 md:hidden ${isMenuOpen ? 'open' : ''}`}>
        <div className="p-6 space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-brand-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => {
                scrollToSection('registration');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
            >
              Start Journey
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
