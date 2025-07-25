import { useState } from 'react';
import { Mail, User, Phone, BookOpen, Code, Loader2, CheckCircle, CreditCard, Shield, AlertCircle } from 'lucide-react';
import { RegistrationService, RegistrationEntry } from '../lib/sdk';
import { PaymentService } from '../services/PaymentService';

export const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    program: 'jamb-prep',
    techTrack: false,
    currentLevel: 'ss3',
    interests: [] as string[],
    isMuslim: false,
    muslimConfirmation: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [paymentStep, setPaymentStep] = useState(false);

  const registrationFee = 500;
  const monthlyFee = formData.techTrack ? 2000 : 1500;
  const programDuration = formData.techTrack ? 12 : 9;

  const currentLevels = [
    { value: 'ss1', label: 'SS1 (Senior Secondary 1)' },
    { value: 'ss2', label: 'SS2 (Senior Secondary 2)' },
    { value: 'ss3', label: 'SS3 (Senior Secondary 3)' },
    { value: 'graduate', label: 'SS3 Graduate' },
    { value: 'other', label: 'Other' }
  ];

  const interestOptions = [
    'Islamic Studies', 'Arabic', 'Use Of English', 'Mathematics', 
    'Physics', 'Chemistry', 'Biology', 'Geography', 'Agriculture',
    'Medicine', 'Engineering', 'Law', 'Business', 'Computer Science',
    'Arts', 'Social Sciences', 'Education', 'Mass Communication'
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
      // Validate form
      if (!PaymentService.validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (!formData.fullName.trim()) {
        throw new Error('Please enter your full name');
      }

      if (!formData.phone.trim()) {
        throw new Error('Please enter your phone number');
      }

      if (!formData.isMuslim) {
        throw new Error('You must be a Muslim to join this program');
      }

      if (!formData.muslimConfirmation) {
        throw new Error('Please confirm your Islamic faith');
      } else {
        // Strict validation for the confirmation text
        const expectedText = "I am a Muslim. Alhamdulillah!";
        const normalizedInput = formData.muslimConfirmation.trim()
          .replace(/\s+/g, ' ')
          .toLowerCase();
        const normalizedExpected = expectedText.toLowerCase();
        
        if (normalizedInput !== normalizedExpected) {
          throw new Error('Please type exactly: "I am a Muslim. Alhamdulillah!"');
        }
      }

      // Register student first with pending payment status
      const registration = await RegistrationService.registerStudent({
        ...formData,
        paymentStatus: 'pending',
        registrationFee,
        monthlyFee
      });

      // Proceed to payment
      setPaymentStep(true);
      await initiatePayment(registration);

    } catch (err: any) {
      setError(err.message || 'Failed to process registration. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const initiatePayment = async (registration: RegistrationEntry) => {
    try {
      const reference = PaymentService.generateReference();
      const sanitizedPhone = PaymentService.sanitizePhone(formData.phone);

      const paymentData = {
        email: formData.email,
        amount: registrationFee,
        currency: 'NGN',
        reference,
        metadata: {
          registrationId: registration.id,
          fullName: formData.fullName,
          phone: sanitizedPhone,
          program: formData.program,
          techTrack: formData.techTrack
        },
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
      };

      // Record payment attempt
      await RegistrationService.recordPayment({
        email: formData.email,
        fullName: formData.fullName,
        amount: registrationFee,
        currency: 'NGN',
        reference,
        status: 'pending',
        gateway: 'paystack',
        metadata: paymentData.metadata
      });

      // Process inline payment (no external redirect)
      await PaymentService.processInlinePayment(
        paymentData,
        async (response: any) => {
          // Payment successful
          await handlePaymentSuccess(response, registration);
        },
        () => {
          // Payment closed/cancelled
          setPaymentStep(false);
          setError('Payment was cancelled. You can try again anytime.');
        }
      );

    } catch (err: any) {
      setError(err.message || 'Payment initialization failed. Please try again.');
      setPaymentStep(false);
    }
  };

  const handlePaymentSuccess = async (response: any, registration: RegistrationEntry) => {
    try {
      setIsLoading(true);

      // Verify payment with Paystack
      const verification = await PaymentService.verifyPayment(response.reference);

      if (verification.data.status === 'success') {
        // Update registration status
        await RegistrationService.updatePaymentStatus(
          formData.email,
          response.reference,
          'success'
        );

        // Update payment record
        await RegistrationService.recordPayment({
          email: formData.email,
          fullName: formData.fullName,
          amount: verification.data.amount / 100, // Convert from kobo
          currency: verification.data.currency,
          reference: response.reference,
          status: 'success',
          gateway: 'paystack',
          metadata: verification.data
        });

        setIsSuccess(true);
        setPaymentStep(false);
      } else {
        throw new Error('Payment verification failed');
      }

    } catch (err: any) {
      setError(err.message || 'Payment verification failed. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="registration" className="py-24 bg-green-50 dark:bg-green-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-scale-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Registration Successful!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              JazakAllahu khairan! Your registration has been completed successfully.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Registration Summary</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Program:</span>
                  <span className="font-medium">
                    {formData.program === 'jamb-prep' ? 'JAMB + Shariah' : formData.program}
                    {formData.techTrack && ' + Tech Skills'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{programDuration} months</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Fee:</span>
                  <span className="font-medium">₦{monthlyFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Registration Fee Paid:</span>
                  <span className="font-medium text-green-600">₦{registrationFee}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We'll contact you within 24 hours with program details and next steps.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  email: '',
                  fullName: '',
                  phone: '',
                  program: 'jamb-prep',
                  techTrack: false,
                  currentLevel: 'ss3',
                  interests: [],
                  isMuslim: false,
                  muslimConfirmation: ''
                });
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Register Another Student
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-24 bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
            Register for <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">MuslimJambite</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-lora">
            Start your journey towards JAMB excellence and Islamic knowledge
          </p>
          
          {/* Registration Fee Notice */}
          <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-brand-primary">
              <CreditCard className="w-5 h-5" />
              <span className="font-semibold">Registration Fee: ₦{registrationFee}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              One-time registration fee. Program fees start after enrollment confirmation.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          {paymentStep && (
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Secure Payment Processing</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Complete your payment to finalize registration. All payments are secured by Paystack.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-inter">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-lora"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-inter">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-lora"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-inter">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-lora"
                    placeholder="+234 XXX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-inter">
                  Current Level *
                </label>
                <select
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-lora"
                >
                  {currentLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Muslim Verification Section */}
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                <span className="text-2xl mr-2">🕌</span>
                Islamic Faith Verification
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                MuslimJambite is exclusively designed for Muslim students. Please confirm your Islamic faith to proceed.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isMuslim"
                    name="isMuslim"
                    checked={formData.isMuslim}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <label htmlFor="isMuslim" className="text-green-800 dark:text-green-200 font-medium">
                    I am a Muslim
                  </label>
                </div>

                <div className="space-y-2">
                  <label htmlFor="muslimConfirmation" className="text-green-800 dark:text-green-200">
                    Please type: "I am a Muslim. Alhamdulillah!"
                  </label>
                  <input
                    type="text"
                    id="muslimConfirmation"
                    name="muslimConfirmation"
                    value={formData.muslimConfirmation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-green-300 focus:border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="I am a Muslim. Alhamdulillah!"
                  />
                </div>
              </div>
            </div>

            {/* Program Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 font-inter">
                Choose Your Program
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    !formData.techTrack
                      ? 'border-brand-primary bg-brand-light dark:bg-brand-primary/10'
                      : 'border-gray-300 dark:border-gray-600 hover:border-brand-primary/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, techTrack: false }))}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-6 h-6 text-brand-primary" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white font-inter">JAMB + Shariah Program</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-lora">Complete JAMB preparation with mandatory Islamic studies</p>
                      <p className="text-sm font-medium text-brand-primary">₦{1500}/month • 9 months</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.techTrack
                      ? 'border-brand-primary bg-brand-light dark:bg-brand-primary/10'
                      : 'border-gray-300 dark:border-gray-600 hover:border-brand-primary/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, techTrack: true }))}
                >
                  <div className="flex items-center space-x-3">
                    <Code className="w-6 h-6 text-brand-primary" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white font-inter">+ Tech Skills Program</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-lora">JAMB + Shariah + Modern tech skills training</p>
                      <p className="text-sm font-medium text-brand-primary">₦{2000}/month • 12 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 font-inter">
                JAMB Subjects & Academic Interests (Select relevant subjects)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-2 rounded-lg border transition-all text-sm font-inter ${
                      formData.interests.includes(interest)
                        ? 'bg-brand-primary text-white border-brand-primary'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-brand-primary/50'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Fee Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 font-inter">Registration Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Program:</span>
                  <span className="font-medium">
                    JAMB + Shariah {formData.techTrack && '+ Tech Skills'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Duration:</span>
                  <span className="font-medium">{programDuration} months</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Monthly Fee:</span>
                  <span className="font-medium">₦{monthlyFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 pt-2">
                  <div className="flex justify-between text-brand-primary font-semibold">
                    <span>Registration Fee (Pay Now):</span>
                    <span>₦{registrationFee}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-600 dark:text-red-400 font-inter">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-primary text-white rounded-xl font-semibold text-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-inter"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Registration...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Register & Pay ₦{registrationFee}</span>
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center font-lora">
              By registering, you agree to our terms of service. Payment is secured by Paystack. 
              Monthly program fees will be discussed after registration confirmation.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
