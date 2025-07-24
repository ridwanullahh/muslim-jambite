
import { BookOpen, Code, Star, CheckCircle, ArrowRight, Clock, Users, Award, Zap } from 'lucide-react';
import JambProgramSection from './programs/JambProgramSection';
import ShariahProgramSection from './programs/ShariahProgramSection';
import TechProgramSection from './programs/TechProgramSection';

export const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 font-inter">
                Our <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Programs</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
                Comprehensive education that combines JAMB preparation with integrated Shariah studies, plus optional tech skills for the digital future.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Program Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {/* Base Program */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Base Program</h3>
                    <p className="text-brand-primary font-semibold">JAMB + Integrated Shariah</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora leading-relaxed">
                9-month comprehensive program combining JAMB preparation with integrated Islamic studies for holistic education.
              </p>
              
              <div className="space-y-3 mb-6">
                {['JAMB Subject Mastery', 'Islamic Studies Integration', 'Expert Tutoring', 'Community Support', 'Study Materials', '100% Dedicated Support'].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-brand-primary">₦1,500<span className="text-lg text-gray-500 font-normal">/month</span></div>
                  <div className="text-sm text-gray-500">9 months duration</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">₦13,500</div>
                  <div className="text-sm text-gray-500">Total cost</div>
                </div>
              </div>
              
              <button
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Enhanced Program */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-brand-primary hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-white px-6 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
                <Star className="w-4 h-4 mr-2" />
                Most Popular
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6 mt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enhanced Program</h3>
                    <p className="text-blue-600 font-semibold">Base + Tech Skills</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora leading-relaxed">
                12-month program with everything in the base program plus mastery of one cutting-edge tech skill.
              </p>
              
              <div className="space-y-3 mb-6">
                {['Everything in Base Program', 'Choose 1 Tech Skill', 'Industry-Ready Projects', 'Tech Mentorship', 'Career Guidance', 'Alumni Network Access'].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">₦2,000<span className="text-lg text-gray-500 font-normal">/month</span></div>
                  <div className="text-sm text-gray-500">12 months duration</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">₦24,000</div>
                  <div className="text-sm text-gray-500">Total cost</div>
                </div>
              </div>
              
              <button
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Program Sections */}
        <div className="space-y-32">
          {/* JAMB Program Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="relative">
              <JambProgramSection />
            </div>
          </div>

          {/* Shariah Program Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-l from-brand-accent/5 to-transparent rounded-full blur-3xl"></div>
            <div className="relative">
              <ShariahProgramSection />
            </div>
          </div>

          {/* Tech Program Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <TechProgramSection />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-32">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-full blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-brand-primary to-brand-accent rounded-3xl p-12 text-white">
              <h3 className="text-4xl font-bold mb-6 font-inter">Ready to Start Your Journey?</h3>
              <p className="text-xl mb-8 font-lora opacity-90">
                Join thousands of students preparing for JAMB success with Islamic excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <div className="flex items-center text-sm bg-white/20 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  1000+ Students Enrolled
                </div>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  In'sha'Allah Success
                </div>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  100% Dedicated Support
                </div>
              </div>
              <button
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-4 bg-white text-brand-primary rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 duration-300"
              >
                Register Now - ₦500
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
