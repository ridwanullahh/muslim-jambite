
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, BookOpen, Code, Shield, Sparkles, Play, ChevronDown } from 'lucide-react';

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand-white to-brand-light dark:from-brand-dark dark:via-gray-800 dark:to-brand-primary/20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-16 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-48 right-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-32 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-40 left-12 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-60 right-16 w-32 h-32 bg-brand-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-24 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Interactive Badge */}
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 backdrop-blur-sm border border-brand-primary/20 text-brand-primary dark:text-brand-primary text-sm font-medium mb-12 hover:scale-105 transition-transform cursor-pointer group">
            <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
            <span className="font-semibold">Early Bird Registration</span>
            <span className="mx-2 text-gray-400">•</span>
            <span>Registration Fee: ₦500</span>
            <Star className="w-5 h-5 ml-3 text-yellow-500 group-hover:rotate-12 transition-transform" />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 dark:text-white mb-8 font-inter leading-tight">
            <span className="block mb-4">Islamic</span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary bg-clip-text text-transparent font-normal bg-[length:200%_auto] animate-gradient">
              Excellence
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-light mt-6 text-gray-700 dark:text-gray-300">
              Meets Future Skills
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-lora font-light">
            Join the premier 9-12 month bootcamp combining JAMB preparation with integrated Shariah studies and optional cutting-edge tech skills. 
            <span className="block mt-2 text-brand-primary font-medium">Build your Dunya while strengthening your Akhirah.</span>
          </p>

          {/* Interactive Feature Display */}
          <div className="mb-16">
            <div className="flex justify-center items-center space-x-6 text-lg font-medium text-gray-700 dark:text-gray-300">
              <span className="text-brand-primary font-semibold text-xl">Featuring:</span>
              <div className="relative h-16 w-72 overflow-hidden">
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
                      <div className={`flex items-center space-x-4 px-6 py-4 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl ${feature.color} hover:scale-105 transition-transform`}>
                        <Icon className="w-7 h-7" />
                        <span className="font-semibold text-xl">{feature.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8 mb-20">
            <button
              onClick={scrollToWaitlist}
              className="group relative px-12 py-6 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-3xl font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/25 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Your Journey (₦500)</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white rounded-3xl font-semibold text-xl border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2"
            >
              Explore Programs
            </button>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: 'Students Ready', color: 'from-brand-primary to-brand-accent', icon: Users },
              { number: '95%', label: 'Success Rate', color: 'from-purple-500 to-pink-500', icon: Star },
              { number: '24/7', label: 'Support', color: 'from-blue-500 to-cyan-500', icon: Shield }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-r ${stat.color} mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                      <Icon className="w-6 h-6 text-white/80 mx-auto" />
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-16 border-2 border-brand-primary rounded-full flex justify-center relative overflow-hidden">
            <div className="w-3 h-6 bg-brand-primary rounded-full animate-pulse mt-2"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent"></div>
          </div>
          <ChevronDown className="w-5 h-5 text-brand-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};
