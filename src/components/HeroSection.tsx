
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-20">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand-white to-brand-light dark:from-brand-dark dark:via-gray-800 dark:to-brand-primary/20">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-16 w-48 sm:w-72 h-48 sm:h-72 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-32 sm:top-48 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-16 sm:bottom-20 left-8 sm:left-32 w-32 sm:w-48 h-32 sm:h-48 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-full blur-3xl animate-float"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--brand-primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-24 sm:top-40 left-4 sm:left-12 w-16 sm:w-24 h-16 sm:h-24 bg-brand-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 sm:top-60 right-4 sm:right-16 w-20 sm:w-32 h-20 sm:h-32 bg-brand-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-24 w-12 sm:w-20 h-12 sm:h-20 bg-purple-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-8 sm:w-16 h-8 sm:h-16 bg-green-200/20 rounded-full blur-lg animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Enhanced Mobile-First Badge */}
          <div className="inline-flex items-center px-4 sm:px-6 py-3 sm:py-3 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 backdrop-blur-sm border border-brand-primary/20 text-brand-primary dark:text-brand-primary text-xs sm:text-sm font-medium mb-8 sm:mb-12 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-bold text-center sm:text-left">Early Bird Registration</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-brand-primary/30"></div>
              <div className="flex items-center space-x-2">
                <span className="text-brand-primary font-semibold">Registration Fee: ₦500</span>
                <Star className="w-4 h-4 text-yellow-500 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
          </div>

          {/* Mobile-First Student-Focused Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 font-inter leading-tight">
            <span className="block mb-2 sm:mb-4 animate-fade-in-down">Ace Your</span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient animate-bounce-in">
              JAMB
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mt-3 sm:mt-6 text-gray-700 dark:text-gray-300 animate-fade-in-up">
              With Islamic Excellence
            </span>
          </h1>

          {/* Enhanced Mobile-First Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 max-w-5xl mx-auto leading-relaxed font-lora animate-fade-in-up px-2">
            Join Nigeria's first Islamic-integrated JAMB preparation program. Master your exams while strengthening your faith.
            <span className="block mt-3 sm:mt-4 text-brand-primary font-semibold text-base sm:text-lg animate-shimmer">
              🎯 Get University Admission + Optional Tech Skills for the Digital Future
            </span>
          </p>

          {/* Enhanced Interactive Feature Showcase */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-brand-primary font-bold text-lg sm:text-xl mb-4 block animate-bounce-in">✨ What You'll Master:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === currentFeature;
                return (
                  <div
                    key={index}
                    className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-700 group cursor-pointer ${
                      isActive
                        ? `${feature.bg} scale-105 sm:scale-110 shadow-xl sm:shadow-2xl border-2 border-current ${feature.color} animate-glow-pulse`
                        : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm scale-100 hover:scale-105 hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50'
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Shimmer effect for active items */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl sm:rounded-3xl" />
                    )}
                    <Icon className={`w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 sm:mb-3 transition-transform duration-300 relative z-10 ${isActive ? `${feature.color} group-hover:scale-110` : 'text-gray-600 dark:text-gray-400 group-hover:text-brand-primary'}`} />
                    <span className={`font-semibold text-xs sm:text-sm text-center block leading-tight relative z-10 ${isActive ? feature.color : 'text-gray-700 dark:text-gray-300 group-hover:text-brand-primary'}`}>
                      {feature.text}
                    </span>
                    {isActive && (
                      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Mobile-First CTA Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 sm:mb-20 px-4">
            <button
              onClick={scrollToRegistration}
              className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/30 transform hover:-translate-y-2 sm:hover:-translate-y-3 overflow-hidden w-full sm:min-w-[300px] max-w-[350px] animate-bounce-in"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <div className="relative flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 sm:w-6 h-5 sm:h-6 group-hover:scale-110 transition-transform" />
                  <span>Start Your Success Journey</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm bg-white/20 rounded-full px-3 py-1">
                  <span>₦500</span>
                </div>
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 text-xs opacity-80">
                Join 1000+ Students
              </div>
            </button>

            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 sm:hover:-translate-y-3 w-full sm:min-w-[300px] max-w-[350px] animate-fade-in-up relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Explore Programs</span>
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
