
import { Shield, BookOpen, Code2, Users, Star, ArrowRight } from 'lucide-react';

const solutions = [
  {
    icon: Shield,
    title: "Islamic Excellence",
    description: "Master JAMB subjects while strengthening your Deen through integrated Shariah studies, Quran memorization, and Islamic character development.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: BookOpen,
    title: "Proven Academic Success",
    description: "Our comprehensive JAMB preparation combines expert tutoring, practice tests, and interactive sessions to ensure you achieve your target score.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code2,
    title: "Future-Ready Skills",
    description: "Optional tech tracks in Data Science, Cybersecurity, Mobile Development, and more prepare you for high-paying careers in the digital economy.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Users,
    title: "Supportive Ummah",
    description: "Join a nationwide community of like-minded Muslim students, mentors, and alumni who support each other's academic and spiritual journey.",
    color: "from-orange-500 to-red-500"
  }
];

export const SolutionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-light via-brand-white to-brand-light dark:from-brand-dark dark:via-gray-800 dark:to-brand-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 font-inter">
            We Don't Just Prepare You for <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">JAMB</span>
          </h2>
          <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto font-lora mb-8">
            We prepare you for life as a successful Muslim in the modern world.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-lora">
            MuslimJambite is the only platform that combines academic excellence, Islamic values, and modern skills in one comprehensive program.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className={`w-20 h-20 bg-gradient-to-r ${solution.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 font-inter">
                  {solution.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-lora leading-relaxed text-lg">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-3xl p-12 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Star className="w-12 h-12" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 font-inter">
              The Complete Muslim Student Experience
            </h3>
            <p className="text-xl mb-8 font-lora">
              Join over 1,000+ Muslim students who have chosen academic excellence with Islamic values. Your success story starts here.
            </p>
            <button
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-white text-brand-primary rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <span>Begin Your Journey Today</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
