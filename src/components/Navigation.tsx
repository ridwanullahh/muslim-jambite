
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, BookOpen, Users, Award, Phone, MessageCircle, ChevronDown, ArrowRight } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isBannerVisible: boolean;
}

export const Navigation = ({ darkMode, toggleDarkMode, isBannerVisible }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMegaMenu, setShowMobileMegaMenu] = useState(false);

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
      category: 'Connect',
      items: [
        { name: 'WhatsApp Channel', description: 'Join our WhatsApp community', link: 'https://whatsapp.com/channel/your-channel-link' },
        { name: 'Telegram Channel', description: 'Follow us on Telegram', link: 'https://t.me/your-channel-link' }
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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'blog' || sectionId === 'about' || sectionId === 'contact') {
      window.location.href = `/${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = isBannerVisible ? 120 : 80;
      const sectionTop = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    setShowMegaMenu(false);
    setShowMobileMegaMenu(false);
  };

  const topOffset = isBannerVisible ? '2.5rem' : '0';

  return (
    <>
      {/* Modern Desktop Navigation */}
      <header className={`fixed left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 shadow-lg shadow-gray-900/5`} style={{ top: topOffset }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center shadow-xl shadow-brand-primary/25 group-hover:shadow-2xl group-hover:shadow-brand-primary/40 transition-all duration-300 group-hover:scale-110">
                  <BookOpen className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-gray-900 dark:text-white font-inter group-hover:text-brand-primary transition-colors duration-300">
                  Muslim<span className="text-brand-primary">Jambite</span>
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
                  Excellence • Faith • Future
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => item.id === 'programs' ? setShowMegaMenu(!showMegaMenu) : scrollToSection(item.id)}
                    onMouseEnter={() => item.id === 'programs' && setShowMegaMenu(true)}
                    className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 font-semibold text-sm relative overflow-hidden ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-xl shadow-brand-primary/30 scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/80 hover:backdrop-blur-sm hover:shadow-lg hover:text-brand-primary hover:scale-105 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Shimmer effect for active items */}
                    {activeSection === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {item.id === 'programs' && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 relative z-10 ${showMegaMenu ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Enhanced Actions */}
            <div className="flex items-center space-x-3">
              {/* Modern Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="group relative p-3 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-primary/25"
                aria-label="Toggle dark mode"
              >
                <div className="relative z-10">
                  {darkMode ? (
                    <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>

              {/* Enhanced Register Button */}
              <button
                onClick={() => scrollToSection('registration')}
                className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300 font-semibold hover:scale-105 hover:-translate-y-0.5 group relative overflow-hidden text-sm"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">Register Now</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Enhanced Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden group relative p-3 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-primary/25"
                aria-label="Toggle menu"
              >
                <div className="relative z-10">
                  {isMenuOpen ? (
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <Menu className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
            </div>
          </div>
        </nav>

        {/* Desktop Mega Menu */}
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
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Enhanced Mobile Menu */}
      <div
        className={`fixed left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 z-50 md:hidden transition-all duration-500 shadow-2xl ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ top: isBannerVisible ? '2.5rem' : '0' }}
      >
        <div className="p-6 space-y-3 max-h-screen overflow-y-auto">
          {navItems.map((item, index) => (
            <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <button
                onClick={() => {
                  if (item.id === 'programs') {
                    setShowMobileMegaMenu(!showMobileMegaMenu);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className={`group flex items-center justify-between w-full px-6 py-4 rounded-2xl transition-all duration-300 text-left font-semibold relative overflow-hidden ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:scale-105 hover:shadow-lg'
                }`}
              >
                {/* Shimmer effect for active items */}
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                )}
                <span className="relative z-10">{item.label}</span>
                {item.id === 'programs' && (
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 relative z-10 ${showMobileMegaMenu ? 'rotate-180' : ''}`} />
                )}
              </button>
              
              {/* Mobile Mega Menu */}
              {item.id === 'programs' && (
                <div className={`overflow-hidden transition-all duration-300 ${showMobileMegaMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="mt-2 ml-4 space-y-3">
                    {megaMenuItems.map((category, index) => (
                      <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 text-left">
                          {category.category}
                        </h4>
                        <div className="space-y-2">
                          {category.items.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.link}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setShowMobileMegaMenu(false);
                              }}
                              className="block p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-white text-left">
                                {subItem.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-left">
                                {subItem.description}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-800/50">
            <button
              onClick={() => {
                scrollToSection('registration');
                setIsMenuOpen(false);
              }}
              className="group w-full px-6 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300 font-bold text-lg relative overflow-hidden hover:scale-105"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
