
import { CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  "JAMB preparation with Islamic values integration",
  "Expert tutors in both academic and Islamic subjects",
  "Optional cutting-edge tech skills training",
  "Supportive Muslim student community",
  "Flexible learning schedules",
  "Career guidance and mentorship"
];

export const ValuePropositionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 font-inter">
              The Complete <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Muslim Student</span> Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-lora">
              We don't just prepare you for JAMB. We prepare you for life as a successful Muslim in the modern world.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your Success Journey</h3>
                <p className="text-gray-600 dark:text-gray-300">From registration to university admission</p>
              </div>
              
              <div className="space-y-4">
                {['Register & Start Learning', 'Master JAMB & Islamic Studies', 'Develop Tech Skills (Optional)', 'Ace Your Exams', 'University Admission', 'Continue Community Support'].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
