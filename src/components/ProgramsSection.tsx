
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
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white mb-8 font-inter">
                Our <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent font-normal">Programs</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora font-light">
                Comprehensive education that combines JAMB preparation with integrated Shariah studies, plus optional tech skills for the digital future.
              </p>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Base Program</h3>
                <p className="text-brand-primary font-medium">JAMB + Integrated Shariah</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora">
              9-month comprehensive program combining JAMB preparation with integrated Islamic studies for holistic education.
            </p>
            <div className="text-3xl font-bold text-brand-primary mb-2">₦1,500<span className="text-lg text-gray-500 font-normal">/month</span></div>
            <div className="text-sm text-gray-500">9 months duration</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-brand-primary relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Enhanced Program
              </div>
            </div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enhanced Program</h3>
                <p className="text-blue-600 font-medium">Base + Tech Skills</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora">
              12-month program with everything in the base program plus mastery of one cutting-edge tech skill.
            </p>
            <div className="text-3xl font-bold text-blue-600 mb-2">₦2,000<span className="text-lg text-gray-500 font-normal">/month</span></div>
            <div className="text-sm text-gray-500">12 months duration</div>
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
                  95% Success Rate
                </div>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Support
                </div>
              </div>
              <button
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-4 bg-white text-brand-primary rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 duration-300"
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
