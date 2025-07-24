
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, BookOpen, Code, Shield, Sparkles, Play, ChevronDown, Clock } from 'lucide-react';

export const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: BookOpen, text: "JAMB Excellence", color: "text-brand-primary", bg: "bg-brand-primary/10" },
    { icon: Shield, text: "Islamic Values", color: "text-brand-accent", bg: "bg-brand-accent/10" },
    { icon: Code, text: "Tech Skills", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Users, text: "Strong Community", color: "text-purple-600", bg: "bg-purple-100" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20">
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
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 backdrop-blur-sm border border-brand-primary/20 text-brand-primary dark:text-brand-primary text-sm font-medium mb-12 hover:scale-105 transition-transform cursor-pointer group shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-bold">Early Bird Registration</span>
              </div>
              <div className="w-px h-4 bg-brand-primary/30"></div>
              <div className="flex items-center space-x-2">
                <span className="text-brand-primary font-semibold">Registration Fee: ₦500</span>
                <Star className="w-4 h-4 text-yellow-500 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
          </div>

          {/* Student-Focused Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 font-inter leading-tight">
            <span className="block mb-4">Ace Your</span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              JAMB
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-semibold mt-6 text-gray-700 dark:text-gray-300">
              With Islamic Excellence
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-lora">
            Join Nigeria's first Islamic-integrated JAMB preparation program. Master your exams while strengthening your faith.
            <span className="block mt-3 text-brand-primary font-semibold text-lg">
              🎯 Get University Admission + Optional Tech Skills for the Digital Future
            </span>
          </p>

          {/* Interactive Feature Showcase */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="text-brand-primary font-bold text-xl mb-4 block">✨ What You'll Master:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === currentFeature;
                return (
                  <div
                    key={index}
                    className={`relative p-6 rounded-2xl transition-all duration-700 ${
                      isActive 
                        ? `${feature.bg} scale-110 shadow-xl border-2 border-current ${feature.color}` 
                        : 'bg-white/50 dark:bg-gray-800/50 scale-100 hover:scale-105'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${isActive ? feature.color : 'text-gray-600'}`} />
                    <span className={`font-semibold text-sm ${isActive ? feature.color : 'text-gray-700 dark:text-gray-300'}`}>
                      {feature.text}
                    </span>
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modern CTA Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6 mb-20">
            <button
              onClick={scrollToRegistration}
              className="group relative px-10 py-5 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/25 transform hover:-translate-y-3 overflow-hidden min-w-[280px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Your Success Journey</span>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-3 py-1">
                  <span>₦500</span>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs opacity-80">
                Join 1000+ Students
              </div>
            </button>
            
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white rounded-2xl font-bold text-lg border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-3 min-w-[280px]"
            >
              Explore Programs
            </button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: 'Students Enrolled', color: 'from-brand-primary to-brand-accent', icon: Users, subtext: 'Nationwide' },
              { number: 'In\'sha\'Allah', label: 'Success With Allah\'s Help', color: 'from-green-500 to-emerald-500', icon: Star, subtext: 'By His Grace' },
              { number: '100%', label: 'Dedicated Support', color: 'from-blue-500 to-cyan-500', icon: Shield, subtext: 'When You Need Us' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-r ${stat.color} mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white mb-2">{stat.number}</div>
                      <Icon className="w-6 h-6 text-white/80 mx-auto" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.subtext}</div>
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
