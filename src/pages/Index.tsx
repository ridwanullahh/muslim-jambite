import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { ProgramsSection } from '../components/ProgramsSection';
import { initializeSDK } from '../lib/sdk';
import { MultiStepForm } from '../components/registration/MultiStepForm';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  useEffect(() => {
    // Initialize SDK
    initializeSDK();

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <HeroSection />
        <ProgramsSection />
        
        {/* Registration Section */}
        <section id="registration" className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6 font-inter">
                Begin Your <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent font-normal">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
                Register now and take the first step towards academic excellence and spiritual growth.
              </p>
            </div>
            
            {showRegistrationSuccess ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-xl">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Registration Complete!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for registering with MuslimJambite. You'll receive a confirmation email with next steps shortly.
                  </p>
                  <button 
                    onClick={() => setShowRegistrationSuccess(false)}
                    className="px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Register Another Student
                  </button>
                </div>
              </div>
            ) : (
              <MultiStepForm onSuccess={handleRegistrationSuccess} />
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center">
                  <span className="text-white font-bold">MJ</span>
                </div>
                <span className="text-xl font-bold font-inter text-gray-900 dark:text-white">
                  Muslim<span className="text-brand-primary">Jambite</span>
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-lora">
                Building the future of Islamic education through innovative learning experiences.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                © 2024 MuslimJambite. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Programs</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li><a href="/#programs" className="hover:text-brand-primary transition-colors">JAMB Preparation</a></li>
                <li><a href="/#programs" className="hover:text-brand-primary transition-colors">Shariah Studies</a></li>
                <li><a href="/#programs" className="hover:text-brand-primary transition-colors">Tech Skills</a></li>
                <li><a href="/contact" className="hover:text-brand-primary transition-colors">Career Guidance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li><a href="/about" className="hover:text-brand-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-brand-primary transition-colors">Contact</a></li>
                <li><a href="/#programs" className="hover:text-brand-primary transition-colors">Programs</a></li>
                <li><a href="/#registration" className="hover:text-brand-primary transition-colors">Register</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Contact</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li>support@muslimjambite.com</li>
                <li>+234 XXX XXX XXXX</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
