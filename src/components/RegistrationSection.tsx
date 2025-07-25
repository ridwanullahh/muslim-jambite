
import { useState } from 'react';
import { MultiStepForm } from './registration/MultiStepForm';
import { RegistrationCountdown } from './ui/RegistrationCountdown';
import { CheckCircle, Users, Clock, Shield, BookOpen, Award } from 'lucide-react';

export const RegistrationSection = () => {
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const handleRegistrationSuccess = () => {
    setIsRegistrationComplete(true);
  };

  if (isRegistrationComplete) {
    return (
      <section id="registration" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Registration Successful!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Welcome to MuslimJambite! Check your email for further instructions.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What's Next?
              </h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Check Your Email</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We've sent you a welcome email with important details
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Join Our WhatsApp</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Connect with fellow Muslim students and mentors
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Start Learning</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Begin your journey with our comprehensive curriculum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Join the <span className="text-brand-primary">MuslimJambite</span> Family
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Take the first step towards academic excellence while strengthening your Islamic identity. 
            Register now and transform your future, In Shaa Allah.
          </p>
        </div>

        <RegistrationCountdown />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose MuslimJambite?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Islamic-Centered Learning</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Combine JAMB preparation with Islamic studies and moral development
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Muslim Community</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Learn alongside fellow Muslim students who share your values
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Proven Results</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      90% of our students gain admission to their preferred universities
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Halal Environment</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Study in an environment that respects and promotes Islamic values
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Early Bird Special</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl font-bold">₦500</div>
                <div className="text-sm opacity-90">
                  <div className="line-through">₦2,000</div>
                  <div>Registration fee</div>
                </div>
              </div>
              <p className="text-sm opacity-90 mb-6">
                Limited time offer for the first 500 students. Monthly fees start from ₦1,500.
              </p>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Offer expires soon!</span>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div>
            <MultiStepForm onSuccess={handleRegistrationSuccess} />
          </div>
        </div>
      </div>
    </section>
  );
};
