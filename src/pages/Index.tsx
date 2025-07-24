import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { ProgramsSection } from '../components/ProgramsSection';
import { PainPointSection } from '../components/sections/PainPointSection';
import { SolutionSection } from '../components/sections/SolutionSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { StatsSection } from '../components/sections/StatsSection';
import { ValuePropositionSection } from '../components/sections/ValuePropositionSection';
import { CommunitySection } from '../components/sections/CommunitySection';
import { FAQSection } from '../components/sections/FAQSection';
import { QuranicVerseSection } from '../components/sections/QuranicVerseSection';
import { StickyFomoBanner } from '../components/ui/StickyFomoBanner';
import { ExitIntentModal } from '../components/modals/ExitIntentModal';
import { initializeSDK } from '../lib/sdk';
import { MultiStepForm } from '../components/registration/MultiStepForm';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [showMakeEnquiry, setShowMakeEnquiry] = useState(false);

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
      <StickyFomoBanner />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <ExitIntentModal />
      
      <main>
        <HeroSection />
        <PainPointSection />
        <SolutionSection />
        <ProgramsSection />
        <WhyChooseUsSection />
        <StatsSection />
        <ValuePropositionSection />
        <CommunitySection />
        <FAQSection />
        
        {/* Registration Section */}
        <section id="registration" className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
                Begin Your <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
                Register now and take the first step towards academic excellence and spiritual growth.
              </p>
              
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={() => setShowMakeEnquiry(true)}
                  className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                >
                  Make Enquiry
                </button>
              </div>
            </div>
            
            {showRegistrationSuccess ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-xl">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Alhamdulillah! Registration Complete!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for registering with MuslimJambite. You'll receive a confirmation email with next steps shortly.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Join Our Community</h4>
                    <div className="flex justify-center space-x-4">
                      <a
                        href={import.meta.env.VITE_WHATSAPP_CHANNEL || "https://whatsapp.com/channel/dummy"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                      >
                        Join WhatsApp
                      </a>
                      <a
                        href={import.meta.env.VITE_TELEGRAM_CHANNEL || "https://t.me/dummy"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Join Telegram
                      </a>
                    </div>
                  </div>
                  
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

        <QuranicVerseSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
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
                © {new Date().getFullYear()} MuslimJambite. All rights reserved.
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
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Useful Links</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li><a href="/about" className="hover:text-brand-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-brand-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Contact</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>muslimgrowth@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+2349158480530</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>FUNAAB, Abeokuta, Ogun State</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
