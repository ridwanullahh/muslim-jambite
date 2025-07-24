
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, BookOpen, Code, Shield, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: BookOpen, text: "JAMB Excellence", color: "text-brand-primary" },
    { icon: Shield, text: "Integrated Shariah", color: "text-brand-accent" },
    { icon: Code, text: "Tech Skills", color: "text-blue-600" },
    { icon: Users, text: "Community", color: "text-purple-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('registration');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Organic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand-white to-brand-light dark:from-brand-dark dark:via-gray-800 dark:to-brand-primary/20">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,160L48,186.7C96,213,192,267,288,250.7C384,235,480,149,576,133.3C672,117,768,171,864,197.3C960,224,1056,224,1152,197.3C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              fill="url(#organic-gradient)"
            />
            <defs>
              <linearGradient id="organic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#05B34D', stopOpacity: 0.1}} />
                <stop offset="100%" style={{stopColor: '#F5A623', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Floating Organic Elements */}
      <div className="absolute top-32 left-12 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-48 right-16 w-32 h-32 bg-brand-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-24 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Interactive Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 backdrop-blur-sm border border-brand-primary/20 text-brand-primary dark:text-brand-primary text-sm font-medium mb-8 hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Early Registration • Registration Fee: ₦500
            <Star className="w-4 h-4 ml-2 text-yellow-500" />
          </div>

          {/* Main Headline with Organic Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 dark:text-white mb-8 font-inter leading-tight">
            <span className="block">Islamic</span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary bg-clip-text text-transparent font-normal">
              Excellence
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-light mt-4">
              Meets Future Skills
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-lora font-light">
            Join the premier 9-12 month bootcamp combining JAMB preparation with integrated Shariah studies and optional cutting-edge tech skills. Build your Dunya while strengthening your Akhirah.
          </p>

          {/* Interactive Feature Display */}
          <div className="mb-12">
            <div className="flex justify-center items-center space-x-4 text-lg font-medium text-gray-700 dark:text-gray-300">
              <span className="text-brand-primary font-semibold">Featuring:</span>
              <div className="relative h-10 w-48 overflow-hidden">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                        index === currentFeature 
                          ? 'opacity-100 transform translate-y-0 scale-100' 
                          : 'opacity-0 transform translate-y-6 scale-95'
                      }`}
                    >
                      <div className={`flex items-center space-x-3 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg ${feature.color}`}>
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{feature.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={scrollToWaitlist}
              className="group relative px-10 py-5 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/25 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <span>Register Now (₦500)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-2xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Programs
            </button>
          </div>

          {/* Organic Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: 'Students Ready', color: 'from-brand-primary to-brand-accent' },
              { number: '95%', label: 'Success Rate', color: 'from-purple-500 to-pink-500' },
              { number: '24/7', label: 'Support', color: 'from-blue-500 to-cyan-500' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${stat.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organic Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-brand-primary rounded-full flex justify-center relative overflow-hidden">
          <div className="w-2 h-4 bg-brand-primary rounded-full animate-pulse mt-2"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
