
import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { BookOpen, Users, Award, Clock, Heart, Star, Globe, Shield } from 'lucide-react';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
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

  const stats = [
    { icon: Users, number: '1000+', label: 'Students Enrolled' },
    { icon: Award, number: '95%', label: 'Success Rate' },
    { icon: Clock, number: '24/7', label: 'Support Available' },
    { icon: Globe, number: '15+', label: 'Countries Reached' }
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'We provide world-class education that prepares students for JAMB success and university admission.',
      color: 'from-brand-primary to-brand-accent'
    },
    {
      icon: Heart,
      title: 'Islamic Values',
      description: 'Our integrated Shariah program builds strong moral character and Islamic foundation.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Future Ready',
      description: 'Optional tech skills training prepares students for the digital economy and modern careers.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Star,
      title: 'Community Impact',
      description: 'Building a generation of educated Muslims who contribute positively to society.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-light via-brand-white to-brand-light dark:from-brand-dark dark:via-gray-800 dark:to-brand-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white mb-8 font-inter">
                About <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent font-normal">MuslimJambite</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
                Empowering Muslim students to excel in education while staying true to their faith and values.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-lora">
                  At MuslimJambite, we believe that academic excellence and Islamic values go hand in hand. 
                  Our mission is to provide comprehensive education that prepares students for both worldly success and spiritual growth.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
                  We integrate JAMB preparation with authentic Islamic teachings and modern tech skills to create 
                  well-rounded individuals ready for the challenges of the 21st century.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-3xl flex items-center justify-center">
                  <div className="text-8xl">🎓</div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-brand-accent to-brand-primary rounded-full flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                Our Impact
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-lora">
                Making a difference in the lives of Muslim students worldwide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                    <div className="text-gray-600 dark:text-gray-300 font-lora">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-lora">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-lora">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 font-inter">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-lora">
              Start your journey towards academic excellence and spiritual growth today.
            </p>
            <a
              href="/#registration"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-primary rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Register Now
            </a>
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
                <li>JAMB Preparation</li>
                <li>Shariah Studies</li>
                <li>Tech Skills</li>
                <li>Career Guidance</li>
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

export default About;
