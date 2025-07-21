
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, BookOpen, Code, Shield } from 'lucide-react';

export const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: BookOpen, text: "JAMB Excellence", color: "text-brand-primary" },
    { icon: Shield, text: "Shariah Studies", color: "text-brand-accent" },
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
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand-white to-brand-light dark:from-brand-dark dark:via-gray-800 dark:to-brand-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2305B34D\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-brand-primary/20 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-brand-accent/20 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Early Access • Limited Spots Available
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
            <span className="block">Islamic Excellence</span>
            <span className="block bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              Meets Future Skills
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-lora">
            Join the premier 9-12 month bootcamp combining JAMB preparation with mandatory Shariah studies and cutting-edge tech skills. Build your Dunya while strengthening your Akhirah.
          </p>

          {/* Animated Feature Display */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-2 text-lg font-medium text-gray-700 dark:text-gray-300">
              <span>Featuring:</span>
              <div className="relative h-8 w-40 overflow-hidden">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                        index === currentFeature 
                          ? 'opacity-100 transform translate-y-0' 
                          : 'opacity-0 transform translate-y-4'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-2 ${feature.color}`} />
                      <span className={feature.color}>{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Basic Track</div>
              <div className="text-2xl font-bold text-brand-primary">₦1,000<span className="text-sm text-gray-500">/month</span></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 ring-2 ring-brand-primary">
              <div className="text-sm text-brand-primary font-medium">Tech Track</div>
              <div className="text-2xl font-bold text-brand-primary">₦1,700<span className="text-sm text-gray-500">/month</span></div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button
              onClick={scrollToWaitlist}
              className="group px-8 py-4 bg-brand-primary text-white rounded-xl font-semibold text-lg hover:bg-brand-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl animate-pulse-glow"
            >
              Join Waitlist Now
              <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold text-lg border-2 border-gray-300 dark:border-gray-600 hover:border-brand-primary transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Students Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-primary rounded-full animate-pulse mt-2"></div>
        </div>
      </div>
    </section>
  );
};
