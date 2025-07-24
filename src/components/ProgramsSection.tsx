
import { BookOpen, Code, Star, CheckCircle, ArrowRight, Clock, Users, Award, Zap } from 'lucide-react';
import JambProgramSection from './programs/JambProgramSection';
import ShariahProgramSection from './programs/ShariahProgramSection';
import TechProgramSection from './programs/TechProgramSection';

export const ProgramsSection = () => {
  const programs = [
    {
      id: 'jamb-shariah',
      name: 'JAMB + Integrated Shariah',
      price: '₦1,500',
      period: 'per month',
      duration: '9 months',
      description: 'Complete JAMB preparation with integrated Shariah studies',
      features: [
        'Live Interactive Tutorials',
        'Recorded Sessions (Video, Audio, Text)',
        'Interactive Quizzes & Assessments',
        'Digital Flashcards System',
        'Comprehensive Keypoints',
        'CBT Practice Environment',
        'Full-Length Mock Exams',
        'Jambathon Events',
        'Integrated Shariah Program',
        'Qur\'an & Hadith Studies',
        'Aqeedah & Fiqh Foundation',
        'Seerah & Islamic History',
        'Akhlaq & Islamic Etiquette',
        '24/7 Learning Support',
        'Progress Tracking & Analytics',
        'Community Forum Access',
        'Certificate of Completion'
      ],
      highlight: false,
      color: 'green',
      icon: BookOpen
    },
    {
      id: 'tech-enhanced',
      name: 'JAMB + Shariah + Tech Skills',
      price: '₦2,000',
      period: 'per month',
      duration: '12 months',
      description: 'Everything in JAMB + Shariah plus cutting-edge tech skills',
      features: [
        'Everything in JAMB + Shariah Program',
        'Frontend Development (React, Vue)',
        'Backend Development (Node.js, Python)',
        'Mobile App Development (React Native)',
        'Cybersecurity Fundamentals',
        'Project Management Essentials',
        'Data Analysis & Visualization',
        'Data Science Basics',
        'UI/UX Design Principles',
        'Cloud Computing Introduction',
        'Industry Mentorship Program',
        'Portfolio Development',
        'Job Placement Assistance',
        'Freelancing Guidance',
        'Tech Industry Networking'
      ],
      highlight: true,
      color: 'blue',
      icon: Code
    }
  ];

  return (
    <section id="programs" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6 font-inter">
                Our <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent font-normal">Programs</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora font-light">
                Choose your path to success. Both programs include comprehensive JAMB preparation with integrated Shariah studies.
              </p>
            </div>
          </div>
        </div>

        {/* Organic Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <div
                key={program.id}
                className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${
                  program.highlight 
                    ? 'border-brand-primary ring-4 ring-brand-primary/20 scale-105' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary/50'
                }`}
                style={{
                  borderRadius: '2rem 1rem 2rem 1rem',
                  transform: program.highlight ? 'rotate(1deg)' : 'rotate(-1deg)'
                }}
              >
                {program.highlight && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-white px-6 py-3 rounded-full text-sm font-medium flex items-center font-inter shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-light text-gray-900 dark:text-white font-inter">
                        {program.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="text-3xl font-bold text-brand-primary">
                          {program.price}
                          <span className="text-lg text-gray-500 font-light">/{program.period}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {program.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora font-light">{program.description}</p>

                  <div className="space-y-3 mb-8 max-h-80 overflow-y-auto">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-lora font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-4 rounded-2xl font-medium text-lg transition-all duration-300 flex items-center justify-center space-x-2 font-inter transform hover:scale-105 ${
                      program.highlight
                        ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-gray-900 hover:shadow-lg'
                    }`}
                  >
                    <span>Choose {program.name.split(' ')[0]} Program</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Program Sections with Organic Design */}
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

        {/* Organic Call to Action */}
        <div className="text-center mt-32">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-full blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-brand-primary to-brand-accent rounded-3xl p-12 text-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <h3 className="text-3xl font-light mb-6 font-inter">Ready to Start Your Journey?</h3>
              <p className="text-xl mb-8 font-lora font-light opacity-90">
                Join thousands of students already preparing for JAMB success with Islamic excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <div className="flex items-center text-sm bg-white/10 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  1000+ Students Enrolled
                </div>
                <div className="flex items-center text-sm bg-white/10 rounded-full px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  95% Success Rate
                </div>
                <div className="flex items-center text-sm bg-white/10 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Support
                </div>
              </div>
              <button
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-4 bg-white text-brand-primary rounded-2xl font-medium text-lg hover:bg-gray-100 transition-colors shadow-lg font-inter transform hover:scale-105 duration-300"
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
