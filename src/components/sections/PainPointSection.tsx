
import { AlertTriangle, Clock, BookX, Users } from 'lucide-react';

const painPoints = [
  {
    icon: AlertTriangle,
    title: "JAMB Stress & Uncertainty",
    description: "Every year, thousands of students struggle with JAMB preparation, unsure if they're studying the right materials or using effective methods."
  },
  {
    icon: BookX,
    title: "Conflicted Priorities", 
    description: "Many Muslim students feel torn between academic success and maintaining their Islamic values in secular educational environments."
  },
  {
    icon: Clock,
    title: "Future Readiness Gap",
    description: "Traditional education doesn't prepare students for the digital economy, leaving graduates unprepared for modern career opportunities."
  },
  {
    icon: Users,
    title: "Lack of Islamic Community",
    description: "Muslim students often study in isolation, missing the support and encouragement of a faith-based learning community."
  }
];

export const PainPointSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-red-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 font-inter">
            The <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Challenges</span> Muslim Students Face
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
            We understand the unique struggles that come with pursuing academic excellence while staying true to your Islamic values.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-red-100 dark:border-red-900/20">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-inter">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-lora leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 font-inter">
            There's a Better Way...
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
            What if you could excel academically while growing spiritually and preparing for the future?
          </p>
        </div>
      </div>
    </section>
  );
};
