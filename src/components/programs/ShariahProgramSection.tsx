
import { Star, Clock } from 'lucide-react';
import { ShariahSubjectCard } from './ShariahSubjectCard';

const ShariahProgramSection = () => {
  const shariahSubjects = [
    {
      name: 'Qur\'an Studies',
      icon: '📖',
      description: 'Tafseer, memorization & recitation mastery',
      details: 'Deep dive into Quranic interpretation with focus on Tafseer methodologies, memorization techniques, and proper recitation with Tajweed rules.',
      category: 'Core',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Hadith Studies',
      icon: '📜',
      description: 'Authentic narrations & contextual meanings',
      details: 'Study authentic Hadith collections with emphasis on understanding context, chain of narration, and practical application in daily life.',
      category: 'Core',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Aqeedah',
      icon: '☪️',
      description: 'Islamic beliefs & theological foundations',
      details: 'Comprehensive study of Islamic creed covering the six pillars of faith, divine attributes, and fundamental theological concepts.',
      category: 'Foundation',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Fiqh',
      icon: '⚖️',
      description: 'Islamic jurisprudence & practical rulings',
      details: 'Learn Islamic legal principles, worship regulations, transactions, and contemporary jurisprudential issues with practical applications.',
      category: 'Practical',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Seerah',
      icon: '🕌',
      description: 'Life of Prophet Muhammad (SAW) & lessons',
      details: 'Detailed study of the Prophet\'s biography, focusing on leadership lessons, character development, and historical context.',
      category: 'Historical',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Akhlaq',
      icon: '✨',
      description: 'Islamic character & ethical development',
      details: 'Character building through Islamic teachings, focusing on moral excellence, interpersonal relationships, and spiritual development.',
      category: 'Character',
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

      {/* Shariah Subjects - Grid Cards */}
      <div className="space-y-12">
        <div className="text-center">
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-inter mb-4">
            Islamic Studies Curriculum
          </h4>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
            Comprehensive Islamic education covering all essential areas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shariahSubjects.map((subject, index) => (
            <ShariahSubjectCard key={index} subject={subject} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShariahProgramSection;
