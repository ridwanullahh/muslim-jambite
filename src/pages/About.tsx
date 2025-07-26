
import { useState, useEffect } from 'react';
import { SharedLayout } from '@/components/layout/SharedLayout';
import { BookOpen, Target, Award, Users, Heart, Star } from 'lucide-react';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-primary to-brand-accent text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About MuslimJambite
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Empowering Muslim students with knowledge that bridges Deen and Dunya
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  At MuslimJambite, we believe that knowledge is a trust (amanah) and education 
                  is a powerful tool for transformation. Our mission is to provide comprehensive 
                  academic preparation while strengthening Islamic identity.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  We integrate traditional Islamic values with modern educational excellence, 
                  ensuring our students are well-prepared for university admission and life 
                  as practicing Muslims in contemporary society.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Excellence in Education
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Combining academic rigor with Islamic principles
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</h4>
                    <p className="text-gray-600 dark:text-gray-300">Students Enrolled</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">95%</h4>
                    <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">3</h4>
                    <p className="text-gray-600 dark:text-gray-300">Core Programs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">100%</h4>
                    <p className="text-gray-600 dark:text-gray-300">Islamic Values</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These principles guide everything we do and shape the character of our students
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
                <div className="w-16 h-16 bg-brand-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Excellence (Ihsan)</h3>
                <p className="text-gray-600 dark:text-gray-300 text-left">
                  We strive for excellence in all our endeavors, following the Islamic principle 
                  of Ihsan - to worship Allah as if you see Him, and apply this mindset to education.
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
                <div className="w-16 h-16 bg-brand-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Compassion (Rahmah)</h3>
                <p className="text-gray-600 dark:text-gray-300 text-left">
                  We create a supportive learning environment built on mercy, understanding, 
                  and genuine care for each student's holistic development.
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
                <div className="w-16 h-16 bg-brand-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Integrity (Amanah)</h3>
                <p className="text-gray-600 dark:text-gray-300 text-left">
                  We uphold the highest standards of honesty, trustworthiness, and moral character 
                  in all our interactions and educational practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Approach
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Combining traditional Islamic pedagogy with modern teaching methodologies
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-left">
                  Islamic-Centered Learning
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-left">Quran and Sunnah Foundation</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-left">
                        Every subject is taught with reference to Islamic principles and values
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-left">Character Building</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-left">
                        Focus on developing both intellectual and spiritual capabilities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-left">Modern Relevance</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-left">
                        Preparing students for success in contemporary academic and professional environments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-left">Our Promise</h3>
                <p className="text-lg mb-6 text-left opacity-90">
                  "And whoever relies upon Allah - then He is sufficient for him. 
                  Indeed, Allah will accomplish His purpose."
                </p>
                <p className="text-sm text-left opacity-75 mb-6">- Quran 65:3</p>
                <div className="bg-white/20 rounded-xl p-6">
                  <p className="text-left">
                    We promise to provide you with not just academic excellence, but also 
                    spiritual growth and character development that will serve you throughout 
                    your life journey as a Muslim professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SharedLayout>
  );
};

export default About;
