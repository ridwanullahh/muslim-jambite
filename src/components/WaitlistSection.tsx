
import { useState } from 'react';
import { Mail, User, Phone, BookOpen, Code, Loader2, CheckCircle } from 'lucide-react';
import { WaitlistService } from '../lib/sdk';

export const WaitlistSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    program: 'jamb-prep',
    techTrack: false,
    currentLevel: 'ss3',
    interests: [] as string[]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const currentLevels = [
    { value: 'ss1', label: 'SS1 (Senior Secondary 1)' },
    { value: 'ss2', label: 'SS2 (Senior Secondary 2)' },
    { value: 'ss3', label: 'SS3 (Senior Secondary 3)' },
    { value: 'graduate', label: 'SS3 Graduate' },
    { value: 'other', label: 'Other' }
  ];

  const interestOptions = [
    'Medicine', 'Engineering', 'Law', 'Business', 'Computer Science',
    'Arts', 'Social Sciences', 'Agriculture', 'Education', 'Mass Communication'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await WaitlistService.addToWaitlist(formData);
      setIsSuccess(true);
      setFormData({
        email: '',
        fullName: '',
        phone: '',
        program: 'jamb-prep',
        techTrack: false,
        currentLevel: 'ss3',
        interests: []
      });
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
      console.error('Waitlist error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="waitlist" className="py-24 bg-green-50 dark:bg-green-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-scale-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to MuslimJambite!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              JazakAllahu khairan for joining our waitlist. We'll notify you when enrollment opens.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Another Student
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-24 bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Join the <span className="text-gradient">Waitlist</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Be among the first to access our revolutionary Islamic education program
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Level *
                </label>
                <select
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {currentLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Program Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Choose Your Track
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    !formData.techTrack
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, techTrack: false }))}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Basic Track</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">JAMB + Shariah Studies</p>
                      <p className="text-sm font-medium text-green-600">₦1,000/month</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.techTrack
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, techTrack: true }))}
                >
                  <div className="flex items-center space-x-3">
                    <Code className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Tech Track</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">JAMB + Shariah + Tech Skills</p>
                      <p className="text-sm font-medium text-green-600">₦1,700/month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Academic Interests (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      formData.interests.includes(interest)
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Joining Waitlist...</span>
                </>
              ) : (
                <span>Join Waitlist</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
