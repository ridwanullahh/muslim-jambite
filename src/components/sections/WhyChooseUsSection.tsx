
import { Shield, Heart, Trophy, Users, BookOpen, Code } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Islamic Excellence",
    description: "Learn with Islamic values at the core of everything we do",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Heart,
    title: "Holistic Approach",
    description: "Develop both your Dunya skills and Akhirah consciousness",
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: "Join thousands who've achieved their academic goals with us",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with like-minded Muslim students nationwide",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: BookOpen,
    title: "Expert Guidance",
    description: "Learn from qualified Islamic scholars and academic experts",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Code,
    title: "Future-Ready Skills",
    description: "Optional tech skills to prepare you for the digital economy",
    color: "from-gray-600 to-gray-800"
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 font-inter">
            Why Choose <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">MuslimJambite</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
            We're not just another JAMB prep program. We're building the future of Islamic education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-inter">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-lora">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};
