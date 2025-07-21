
import { BookOpen, Code, Star, CheckCircle, ArrowRight, Clock, Users, Award, Zap } from 'lucide-react';

export const ProgramsSection = () => {
  const programs = [
    {
      id: 'jamb-shariah',
      name: 'JAMB + Shariah Program',
      price: '₦1,500',
      period: 'per month',
      duration: '9 months',
      description: 'Complete JAMB preparation with mandatory Shariah studies',
      features: [
        'Live Interactive Tutorials',
        'Recorded Sessions (Video, Audio, Text)',
        'Interactive Quizzes & Assessments',
        'Digital Flashcards System',
        'Comprehensive Keypoints',
        'CBT Practice Environment',
        'Full-Length Mock Exams',
        'Jambathon Events',
        'Mandatory Shariah Program',
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

  const jambSubjects = [
    { name: 'Islamic Studies', icon: '☪️', description: 'JAMB Islamic curriculum', category: 'Religious Studies' },
    { name: 'Arabic', icon: '🕌', description: 'Arabic language for JAMB', category: 'Languages' },
    { name: 'Use Of English', icon: '📝', description: 'Communication & comprehension mastery', category: 'Core' },
    { name: 'Mathematics', icon: '📐', description: 'Advanced problem-solving techniques', category: 'Core' },
    { name: 'Physics', icon: '⚛️', description: 'Conceptual understanding & applications', category: 'Sciences' },
    { name: 'Chemistry', icon: '🧪', description: 'Practical & theoretical knowledge', category: 'Sciences' },
    { name: 'Biology', icon: '🧬', description: 'Life sciences & medical foundations', category: 'Sciences' },
    { name: 'Geography', icon: '🌍', description: 'Physical & human geography', category: 'Social Sciences' },
    { name: 'Agriculture', icon: '🌱', description: 'Agricultural science principles', category: 'Applied Sciences' }
  ];

  const shariahSubjects = [
    { name: 'Qur\'an Studies', icon: '📖', description: 'Tafseer, memorization & recitation', duration: 'Throughout program' },
    { name: 'Hadith Studies', icon: '📜', description: 'Authentic narrations & meanings', duration: 'Throughout program' },
    { name: 'Aqeedah', icon: '☪️', description: 'Islamic beliefs & theology', duration: '2 months intensive' },
    { name: 'Fiqh', icon: '⚖️', description: 'Islamic jurisprudence & rulings', duration: '3 months intensive' },
    { name: 'Seerah', icon: '🕌', description: 'Life of Prophet Muhammad (SAW)', duration: '2 months intensive' },
    { name: 'Akhlaq', icon: '✨', description: 'Islamic character & ethics', duration: 'Throughout program' }
  ];

  const techSkills = [
    { name: 'Frontend Development', icon: '💻', description: 'React, Vue, Angular, HTML/CSS', months: '3-4' },
    { name: 'Backend Development', icon: '🔧', description: 'Node.js, Python, APIs, Databases', months: '3-4' },
    { name: 'Mobile Development', icon: '📱', description: 'React Native, Flutter', months: '2-3' },
    { name: 'Cybersecurity', icon: '🔒', description: 'Ethical hacking & security basics', months: '2' },
    { name: 'Data Science', icon: '📊', description: 'Analytics, ML basics, Python', months: '2-3' },
    { name: 'UI/UX Design', icon: '🎨', description: 'User experience & interface design', months: '2' }
  ];

  const jambFeatures = [
    { name: 'Live Tutorials', icon: '🎥', description: 'Interactive live sessions with expert tutors' },
    { name: 'Recorded Sessions', icon: '📹', description: 'Video, audio, and text materials for review' },
    { name: 'Interactive Quizzes', icon: '❓', description: 'Regular assessments to test understanding' },
    { name: 'Digital Flashcards', icon: '🗂️', description: 'Smart revision cards for quick learning' },
    { name: 'Keypoints System', icon: '🔑', description: 'Essential concepts summarized' },
    { name: 'CBT Practice', icon: '💻', description: 'Simulated computer-based testing environment' },
    { name: 'Mock Examinations', icon: '📝', description: 'Full-length practice exams' },
    { name: 'Jambathon Events', icon: '🏆', description: 'Competitive learning marathons' }
  ];

  return (
    <section id="programs" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
            Our <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
            Choose your path to success. Both programs include comprehensive JAMB preparation and mandatory Shariah studies.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <div
                key={program.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  program.highlight 
                    ? 'border-brand-primary ring-4 ring-brand-primary/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary/50'
                }`}
              >
                {program.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center font-inter">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <IconComponent className="w-8 h-8 text-brand-primary mr-3" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-inter">
                        {program.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="text-3xl font-bold text-brand-primary">
                          {program.price}
                          <span className="text-lg text-gray-500 font-normal">/{program.period}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {program.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora">{program.description}</p>

                  <div className="space-y-3 mb-8 max-h-80 overflow-y-auto">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-lora">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 font-inter ${
                      program.highlight
                        ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
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

        {/* Detailed Program Sections */}
        <div className="space-y-20">
          {/* JAMB Program Details */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-inter flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-brand-primary mr-3" />
              JAMB Preparation Program
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-lora">
              Comprehensive JAMB preparation following official curriculum with modern learning techniques and expert guidance.
            </p>

            {/* JAMB Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {jambFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 font-inter">{feature.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-lora">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* JAMB Subjects */}
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 font-inter">Available JAMB Subjects</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {jambSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 font-inter">{subject.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-lora">{subject.description}</p>
                  <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full font-inter">
                    {subject.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shariah Studies Details */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-inter flex items-center justify-center">
              <Star className="w-8 h-8 text-brand-accent mr-3" />
              Mandatory Shariah Program
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-lora">
              Build your Islamic foundation with comprehensive Shariah studies integrated into your learning journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shariahSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 font-inter">{subject.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-lora">{subject.description}</p>
                  <div className="flex items-center text-xs text-brand-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    {subject.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Skills Details */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-inter flex items-center justify-center">
              <Code className="w-8 h-8 text-blue-600 mr-3" />
              Tech Skills Program
              <span className="ml-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-inter">Optional Add-on</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-lora">
              Master in-demand technology skills for the digital economy. Available only with the enhanced program.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 font-inter">{skill.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-lora">{skill.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-blue-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {skill.months} months
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Zap className="w-3 h-3 mr-1" />
                      Hands-on
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-inter">Ready to Start Your Journey?</h3>
            <p className="text-lg mb-6 font-lora opacity-90">
              Join thousands of students already preparing for JAMB success with Islamic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2" />
                1000+ Students Enrolled
              </div>
              <div className="flex items-center text-sm">
                <Award className="w-4 h-4 mr-2" />
                95% Success Rate
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2" />
                24/7 Support
              </div>
            </div>
            <button
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 px-8 py-4 bg-white text-brand-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg font-inter"
            >
              Register Now - ₦500
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
