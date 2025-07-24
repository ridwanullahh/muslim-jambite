
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
  const [interests, setInterests] = useState<string[]>(data.interests || []);

  const availableInterests = [
    'Islamic Studies',
    'Mathematics',
    'English Language',
    'Physics',
    'Chemistry',
    'Biology',
    'Government',
    'Economics',
    'Literature',
    'Geography',
    'History',
    'Arabic Language',
    'French Language',
    'Fine Arts',
    'Music',
    'Computer Studies'
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ interests });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Subject Interests
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select the subjects you're most interested in studying
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label>Choose your subjects of interest (select all that apply):</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableInterests.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={interests.includes(interest)}
                  onCheckedChange={() => handleInterestToggle(interest)}
                />
                <Label htmlFor={interest} className="text-sm font-normal cursor-pointer">
                  {interest}
                </Label>
              </div>
            ))}
          </div>
        </div>

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
              'Continue'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
