
import { Star, Clock } from 'lucide-react';

const ShariahProgramSection = () => {
  const shariahSubjects = [
    {
      name: 'Qur\'an Studies',
      icon: '📖',
      description: 'Tafseer, memorization & recitation mastery',
      details: 'Deep dive into Quranic interpretation with focus on Tafseer methodologies, memorization techniques, and proper recitation with Tajweed rules.',
      duration: 'Throughout program',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Hadith Studies',
      icon: '📜',
      description: 'Authentic narrations & contextual meanings',
      details: 'Study authentic Hadith collections with emphasis on understanding context, chain of narration, and practical application in daily life.',
      duration: 'Throughout program',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Aqeedah',
      icon: '☪️',
      description: 'Islamic beliefs & theological foundations',
      details: 'Comprehensive study of Islamic creed covering the six pillars of faith, divine attributes, and fundamental theological concepts.',
      duration: '2 months intensive',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Fiqh',
      icon: '⚖️',
      description: 'Islamic jurisprudence & practical rulings',
      details: 'Learn Islamic legal principles, worship regulations, transactions, and contemporary jurisprudential issues with practical applications.',
      duration: '3 months intensive',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Seerah',
      icon: '🕌',
      description: 'Life of Prophet Muhammad (SAW) & lessons',
      details: 'Detailed study of the Prophet\'s biography, focusing on leadership lessons, character development, and historical context.',
      duration: '2 months intensive',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Akhlaq',
      icon: '✨',
      description: 'Islamic character & ethical development',
      details: 'Character building through Islamic teachings, focusing on moral excellence, interpersonal relationships, and spiritual development.',
      duration: 'Throughout program',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Shariah Program Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/10 to-brand-primary/10 rounded-full blur-3xl transform rotate-3"></div>
        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-primary rounded-full mb-6">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
            Integrated Shariah Program
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
            Build your Islamic foundation with comprehensive Shariah studies seamlessly integrated into your learning journey
          </p>
        </div>
      </div>

      {/* Shariah Subjects - Dedicated Subsections */}
      <div className="space-y-16">
        <div className="text-center">
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-inter mb-4">
            Islamic Studies Curriculum
          </h4>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
            Comprehensive Islamic education covering all essential areas
          </p>
        </div>
        
        {shariahSubjects.map((subject, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{subject.icon}</div>
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white font-inter">
                      {subject.name}
                    </h5>
                    <div className="flex items-center text-sm text-brand-accent mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {subject.duration}
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
                  {subject.description}
                </p>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-lora">
                  {subject.details}
                </p>
              </div>
              
              <div className="flex-1">
                <div className={`relative w-full h-64 bg-gradient-to-r ${subject.color} rounded-3xl p-8 flex items-center justify-center transform ${isEven ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform duration-300`}>
                  <div className="text-6xl opacity-80">{subject.icon}</div>
                  <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
                  <div className="absolute top-4 right-4 text-white/70 text-sm font-medium">
                    {subject.duration}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShariahProgramSection;
