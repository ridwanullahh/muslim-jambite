
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, BookOpen, Users, Award, Phone, MessageCircle, ChevronDown, ArrowRight } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navigation = ({ darkMode, toggleDarkMode }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'blog', label: 'Blog' }
  ];

  const megaMenuItems = [
    {
      category: 'Programs',
      items: [
        { name: 'JAMB + Shariah', description: 'Complete preparation with Islamic studies', link: '#programs' },
        { name: 'Tech Skills', description: 'Modern skills for digital future', link: '#programs' },
        { name: 'Arabic Language', description: 'Classical Arabic mastery', link: '#programs' }
      ]
    },
    {
      category: 'Resources',
      items: [
        { name: 'Blog Posts', description: 'Latest insights and guidance', link: '/blog' },
        { name: 'Study Materials', description: 'Comprehensive learning resources', link: '#resources' },
        { name: 'Practice Tests', description: 'Mock exams and assessments', link: '#practice' }
      ]
    },
    {
      category: 'Community',
      items: [
        { name: 'Success Stories', description: 'Student achievements', link: '#testimonials' },
        { name: 'Islamic Guidance', description: 'Spiritual development', link: '#guidance' },
        { name: 'Support Forum', description: 'Connect with peers', link: '#community' }
      ]
    }
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
      const headerHeight = 80; // Reduced from 120 for smaller banner
      const sectionTop = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    setShowMegaMenu(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-[2rem] left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                  Muslim<span className="text-brand-primary">Jambite</span>
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Excellence • Faith • Future
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => item.id === 'programs' ? setShowMegaMenu(!showMegaMenu) : scrollToSection(item.id)}
                    onMouseEnter={() => item.id === 'programs' && setShowMegaMenu(true)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                      activeSection === item.id
                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-primary'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.id === 'programs' && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${showMegaMenu ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => scrollToSection('registration')}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 font-semibold text-sm"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {showMegaMenu && (
          <div 
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-2xl"
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-3 gap-8">
                {megaMenuItems.map((category, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.link}
                          className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className="font-medium text-gray-900 dark:text-white group-hover:text-brand-primary">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-[4rem] left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 md:hidden ${isMenuOpen ? 'open' : ''}`}>
        <div className="p-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-brand-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => {
                scrollToSection('registration');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
