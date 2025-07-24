
import { useState, useEffect } from 'react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { ProgramSelectionStep } from './ProgramSelectionStep';
import { InterestsStep } from './InterestsStep';
import { PaymentStep } from './PaymentStep';
import { RegistrationService, ProspectEntry } from '../../lib/sdk';
import { CheckCircle, User, BookOpen, Heart, CreditCard } from 'lucide-react';

interface MultiStepFormProps {
  onSuccess: () => void;
}

export const MultiStepForm = ({ onSuccess }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    program: 'jamb-prep',
    techTrack: false,
    techSkill: '',
    currentLevel: 'ss3',
    interests: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Program Selection', icon: BookOpen },
    { number: 3, title: 'Interests', icon: Heart },
    { number: 4, title: 'Payment', icon: CreditCard }
  ];

  const techSkills = [
    'Frontend Development',
    'Backend Development',
    'Mobile Development',
    'Cybersecurity',
    'Data Science',
    'UI/UX Design'
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = async () => {
      if (formData.email && currentStep > 1) {
        try {
          await RegistrationService.saveProspect({
            ...formData,
            step: currentStep,
            completed: false
          });
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    };

    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData, currentStep]);

  // Load existing prospect data
  useEffect(() => {
    const loadProspectData = async () => {
      if (formData.email) {
        try {
          const prospect = await RegistrationService.getProspect(formData.email);
          if (prospect && !prospect.completed) {
            setFormData(prev => ({
              ...prev,
              ...prospect,
              interests: prospect.interests || []
            }));
            setCurrentStep(prospect.step || 1);
          }
        } catch (error) {
          console.error('Failed to load prospect data:', error);
        }
      }
    };

    const timeoutId = setTimeout(loadProspectData, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  const handleStepComplete = async (stepData: Partial<typeof formData>) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);

    try {
      await RegistrationService.saveProspect({
        ...updatedData,
        step: currentStep,
        completed: false
      });
    } catch (error) {
      console.error('Failed to save step data:', error);
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await RegistrationService.saveProspect({
        ...formData,
        step: 4,
        completed: true
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to complete registration:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-brand-primary text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className={`transition-colors duration-300 ${
                    isActive ? 'text-brand-primary' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs">Step {step.number}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {currentStep === 1 && (
          <PersonalInfoStep
            data={formData}
            onNext={handleStepComplete}
            isLoading={isLoading}
          />
        )}

        {currentStep === 2 && (
          <ProgramSelectionStep
            data={formData}
            techSkills={techSkills}
            onNext={handleStepComplete}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {currentStep === 3 && (
          <InterestsStep
            data={formData}
            onNext={handleStepComplete}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {currentStep === 4 && (
          <PaymentStep
            data={formData}
            onSuccess={handlePaymentSuccess}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
