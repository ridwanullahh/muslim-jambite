
import { BookOpen, Play, Video, HelpCircle, CreditCard, Key, Monitor, FileText, Trophy } from 'lucide-react';
import { JambSubjectCard } from './JambSubjectCard';

const JambProgramSection = () => {
  const jambFeatures = [
    {
      name: 'Live Tutorials',
      icon: Play,
      description: 'Interactive live sessions with expert tutors in real-time',
      details: 'Join live classes with experienced tutors who provide instant feedback and answer questions in real-time. Interactive whiteboards and screen sharing enhance the learning experience.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Recorded Sessions',
      icon: Video,
      description: 'Video, audio, and text materials for review and revision',
      details: 'Access comprehensive recorded materials in multiple formats. Download for offline study and replay difficult concepts until mastery is achieved.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Interactive Quizzes',
      icon: HelpCircle,
      description: 'Regular assessments to test understanding and track progress',
      details: 'Engaging quizzes with instant feedback help reinforce learning. Track your progress and identify areas needing improvement with detailed analytics.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Digital Flashcards',
      icon: CreditCard,
      description: 'Smart revision cards for quick learning and memory retention',
      details: 'Scientifically-designed flashcards using spaced repetition algorithms. Perfect for quick reviews and long-term retention of key concepts.',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Keypoints System',
      icon: Key,
      description: 'Essential concepts summarized for efficient study',
      details: 'Carefully curated key points that distill complex topics into digestible summaries. Perfect for last-minute reviews and exam preparation.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'CBT Practice',
      icon: Monitor,
      description: 'Simulated computer-based testing environment',
      details: 'Practice with the exact CBT interface used in real JAMB exams. Familiarize yourself with the system to reduce exam anxiety and improve performance.',
      color: 'from-teal-500 to-blue-500'
    },
    {
      name: 'Mock Examinations',
      icon: FileText,
      description: 'Full-length practice exams with detailed performance analysis',
      details: 'Complete practice exams that mirror the actual JAMB format. Receive detailed performance reports with strengths, weaknesses, and improvement strategies.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      name: 'Jambathon Events',
      icon: Trophy,
      description: 'Competitive learning marathons and challenges',
      details: 'Join exciting competitive events with fellow students. Win prizes while learning through gamified challenges and group competitions.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const jambSubjects = [
    {
      name: 'Islamic Studies',
      icon: '☪️',
      description: 'Comprehensive JAMB Islamic Studies curriculum',
      details: 'Master the JAMB Islamic Studies syllabus with expert guidance on Quranic studies, Hadith, Islamic jurisprudence, and contemporary Islamic issues.',
      category: 'Religious Studies',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Arabic',
      icon: '🕌',
      description: 'Arabic language mastery for JAMB success',
      details: 'Develop proficiency in Arabic grammar, vocabulary, composition, and comprehension according to JAMB standards.',
      category: 'Languages',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Use Of English',
      icon: '📝',
      description: 'Communication & comprehension mastery',
      details: 'Excel in English language skills including comprehension, summary writing, lexis and structure, and oral forms.',
      category: 'Core',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Mathematics',
      icon: '📐',
      description: 'Advanced problem-solving techniques',
      details: 'Master mathematical concepts from basic arithmetic to advanced calculus with practical problem-solving strategies.',
      category: 'Core',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Physics',
      icon: '⚛️',
      description: 'Conceptual understanding & applications',
      details: 'Understand physical principles through practical applications and experiments covering mechanics, thermodynamics, and modern physics.',
      category: 'Sciences',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Chemistry',
      icon: '🧪',
      description: 'Practical & theoretical knowledge',
      details: 'Explore chemical reactions, organic chemistry, and analytical techniques with hands-on virtual laboratory experiences.',
      category: 'Sciences',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Biology',
      icon: '🧬',
      description: 'Life sciences & medical foundations',
      details: 'Study living organisms, genetics, ecology, and human biology with interactive diagrams and virtual dissections.',
      category: 'Sciences',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      name: 'Geography',
      icon: '🌍',
      description: 'Physical & human geography mastery',
      details: 'Explore Earth\'s physical features, climate patterns, and human-environment interactions with interactive maps.',
      category: 'Social Sciences',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      name: 'Agriculture',
      icon: '🌱',
      description: 'Agricultural science principles',
      details: 'Learn crop production, animal husbandry, and agricultural economics with practical farming techniques.',
      category: 'Applied Sciences',
      color: 'from-lime-500 to-green-500'
    }
  ];

  return (
    <div className="space-y-20">
      {/* JAMB Program Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-full blur-3xl transform -rotate-3"></div>
        <div className="relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-4xl font-light text-gray-900 dark:text-white mb-6 font-inter">
            JAMB <span className="font-normal">Preparation Program</span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora font-light">
            Comprehensive JAMB preparation following official curriculum with modern learning techniques and expert guidance
          </p>
        </div>
      </div>

      {/* JAMB Features - Grid Layout */}
      <div className="space-y-12">
        <h4 className="text-3xl font-light text-center text-gray-900 dark:text-white font-inter">
          Program <span className="font-normal">Features</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {jambFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-brand-primary/50 transform hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors">
                    {feature.name}
                  </h5>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 font-lora">
                    {feature.description}
                  </p>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    {feature.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* JAMB Subjects - Course Cards */}
      <div className="space-y-12">
        <div className="text-center">
          <h4 className="text-3xl font-light text-gray-900 dark:text-white font-inter mb-4">
            Available JAMB <span className="font-normal">Subjects</span>
          </h4>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-lora font-light">
            Choose from our comprehensive range of JAMB subjects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jambSubjects.map((subject, index) => (
            <JambSubjectCard key={index} subject={subject} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JambProgramSection;
