
import { BookOpen, Code, Star, CheckCircle, ArrowRight } from 'lucide-react';

export const ProgramsSection = () => {
  const programs = [
    {
      id: 'basic',
      name: 'Basic Track',
      price: '₦1,000',
      period: 'per month',
      description: 'Complete JAMB preparation with mandatory Shariah studies',
      features: [
        'Comprehensive JAMB Subject Coverage',
        'Advanced Exam Strategies & Techniques',
        'Mock Tests & Practice Sessions',
        'Mandatory Shariah Program',
        'Qur\'an & Hadith Studies',
        'Aqeedah & Fiqh Foundation',
        'Seerah & Islamic History',
        'Akhlaq & Islamic Etiquette',
        '24/7 Learning Support',
        'Community Access',
        'Progress Tracking',
        'Certificate of Completion'
      ],
      highlight: false,
      color: 'green'
    },
    {
      id: 'tech',
      name: 'Tech Track',
      price: '₦1,700',
      period: 'per month',
      description: 'Everything in Basic Track plus cutting-edge tech skills',
      features: [
        'Everything in Basic Track',
        'Frontend Development (React, Vue)',
        'Backend Development (Node.js, Python)',
        'Mobile App Development',
        'Cybersecurity Fundamentals',
        'Project Management',
        'Data Analysis & Visualization',
        'Data Science Basics',
        'UI/UX Design',
        'Cloud Computing',
        'Industry Mentorship',
        'Portfolio Development',
        'Job Placement Assistance'
      ],
      highlight: true,
      color: 'blue'
    }
  ];

  const jambSubjects = [
    { name: 'Mathematics', icon: '📐', description: 'Advanced problem-solving techniques' },
    { name: 'English Language', icon: '📝', description: 'Communication & comprehension mastery' },
    { name: 'Physics', icon: '⚛️', description: 'Conceptual understanding & applications' },
    { name: 'Chemistry', icon: '🧪', description: 'Practical & theoretical knowledge' },
    { name: 'Biology', icon: '🧬', description: 'Life sciences & medical foundations' },
    { name: 'Economics', icon: '📊', description: 'Economic principles & analysis' },
    { name: 'Literature', icon: '📚', description: 'Literary analysis & appreciation' },
    { name: 'Government', icon: '🏛️', description: 'Political systems & governance' }
  ];

  const shariahSubjects = [
    { name: 'Qur\'an Studies', icon: '📖', description: 'Tafseer & memorization' },
    { name: 'Hadith Studies', icon: '📜', description: 'Authentic narrations & meanings' },
    { name: 'Aqeedah', icon: '☪️', description: 'Islamic beliefs & theology' },
    { name: 'Fiqh', icon: '⚖️', description: 'Islamic jurisprudence & rulings' },
    { name: 'Seerah', icon: '🕌', description: 'Life of Prophet Muhammad (SAW)' },
    { name: 'Akhlaq', icon: '✨', description: 'Islamic character & ethics' }
  ];

  const techSkills = [
    { name: 'Frontend Dev', icon: '💻', description: 'React, Vue, Angular' },
    { name: 'Backend Dev', icon: '🔧', description: 'Node.js, Python, APIs' },
    { name: 'Mobile Apps', icon: '📱', description: 'React Native, Flutter' },
    { name: 'Cybersecurity', icon: '🔒', description: 'Ethical hacking & security' },
    { name: 'Data Science', icon: '📊', description: 'Analytics & ML basics' },
    { name: 'UI/UX Design', icon: '🎨', description: 'User experience design' }
  ];

  return (
    <section id="programs" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-gradient">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose your path to success. Both tracks include our comprehensive JAMB preparation and mandatory Shariah studies.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                program.highlight 
                  ? 'border-green-500 ring-4 ring-green-100 dark:ring-green-900' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
              }`}
            >
              {program.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {program.name}
                  </h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {program.price}
                    <span className="text-lg text-gray-500 font-normal">/{program.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{program.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {program.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    program.highlight
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  }`}
                >
                  <span>Choose {program.name}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Curriculum Breakdown */}
        <div className="space-y-16">
          {/* JAMB Subjects */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              JAMB Subjects Coverage
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive preparation for all major JAMB subjects with expert tutoring
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {jambSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 interactive-card"
                >
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{subject.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{subject.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shariah Studies */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Mandatory Shariah Program
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Build your Islamic foundation with comprehensive Shariah studies
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {shariahSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 interactive-card"
                >
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{subject.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{subject.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Skills */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tech Skills (Tech Track Only)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Master in-demand technology skills for the digital economy
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {techSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 interactive-card"
                >
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
