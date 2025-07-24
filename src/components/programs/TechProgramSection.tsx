
import { Code, Clock, Zap } from 'lucide-react';
import { TechSkillCard } from './TechSkillCard';

const TechProgramSection = () => {
  const techSkills = [
    {
      name: 'Frontend Development',
      icon: '💻',
      description: 'Modern web interfaces with React, Vue, and Angular',
      details: 'Master frontend technologies including HTML5, CSS3, JavaScript ES6+, React.js, Vue.js, and responsive design principles. Build interactive user interfaces with modern frameworks.',
      months: '3-4',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Backend Development',
      icon: '🔧',
      description: 'Server-side programming with Node.js and Python',
      details: 'Learn server-side development with Node.js, Python, database management, RESTful APIs, and cloud deployment strategies.',
      months: '3-4',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Mobile Development',
      icon: '📱',
      description: 'Cross-platform mobile apps with React Native',
      details: 'Create native mobile applications using React Native and Flutter. Learn mobile-specific design patterns and deployment to app stores.',
      months: '2-3',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Cybersecurity',
      icon: '🔒',
      description: 'Ethical hacking & security fundamentals',
      details: 'Understand cybersecurity principles, ethical hacking techniques, penetration testing, and security best practices for web applications.',
      months: '2',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Data Science',
      icon: '📊',
      description: 'Analytics, machine learning, and Python',
      details: 'Explore data analysis, visualization, machine learning algorithms, and statistical modeling using Python, pandas, and scikit-learn.',
      months: '2-3',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'UI/UX Design',
      icon: '🎨',
      description: 'User experience & interface design principles',
      details: 'Learn design thinking, user research, prototyping, and modern design tools like Figma. Create intuitive and beautiful user experiences.',
      months: '2',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Tech Program Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform -rotate-2"></div>
        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
            Tech Skills Program
            <span className="ml-4 text-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-normal">
              Optional Add-on
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
            Master one in-demand technology skill for the digital economy. Available with the enhanced program package
          </p>
        </div>
      </div>

      {/* Tech Skills - Grid Cards */}
      <div className="space-y-12">
        <div className="text-center">
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-inter mb-4">
            Technology Curriculum
          </h4>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
            Choose one tech skill to master alongside your core program
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techSkills.map((skill, index) => (
            <TechSkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechProgramSection;
