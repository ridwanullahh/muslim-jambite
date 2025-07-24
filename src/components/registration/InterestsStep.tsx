
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ArrowLeft } from 'lucide-react';

interface InterestsStepProps {
  data: {
    interests: string[];
    techTrack: boolean;
    techSkill: string;
  };
  onNext: (data: any) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const InterestsStep = ({ data, onNext, onBack, isLoading }: InterestsStepProps) => {
  const [formData, setFormData] = useState({
    interests: data.interests || [],
    additionalInfo: ''
  });

  const availableInterests = [
    'Quran Memorization',
    'Islamic History',
    'Arabic Language',
    'Islamic Jurisprudence (Fiqh)',
    'Hadith Studies',
    'Islamic Finance',
    'Community Service',
    'Islamic Art & Culture',
    'Dawah & Outreach',
    'Youth Leadership'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Islamic Interests
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us personalize your Islamic studies experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Select your areas of interest (optional):</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableInterests.map((interest) => (
              <div key={interest} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Checkbox
                  id={interest}
                  checked={formData.interests.includes(interest)}
                  onCheckedChange={() => handleInterestToggle(interest)}
                />
                <Label 
                  htmlFor={interest} 
                  className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {interest}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {data.techTrack && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-blue-800 dark:text-blue-200">Tech Track Selected</span>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              You've chosen the tech skills track: <strong>{data.techSkill}</strong>
            </p>
          </div>
        )}

        <div className="flex space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue to Payment'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
