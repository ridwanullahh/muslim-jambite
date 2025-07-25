
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, AlertCircle } from 'lucide-react';

interface PersonalInfoStepProps {
  data: {
    email: string;
    fullName: string;
    phone: string;
    isMuslim: boolean;
    muslimConfirmation: string;
  };
  onNext: (data: any) => void;
  isLoading: boolean;
}

export const PersonalInfoStep = ({ data, onNext, isLoading }: PersonalInfoStepProps) => {
  const [formData, setFormData] = useState({
    email: data.email || '',
    fullName: data.fullName || '',
    phone: data.phone || '',
    isMuslim: data.isMuslim || false,
    muslimConfirmation: data.muslimConfirmation || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.isMuslim) {
      newErrors.isMuslim = 'You must be a Muslim to join this program';
    }

    if (!formData.muslimConfirmation) {
      newErrors.muslimConfirmation = 'Please confirm your Islamic faith';
    } else {
      // Strict validation for the confirmation text
      const expectedText = "I am a Muslim. Alhamdulillah!";
      const normalizedInput = formData.muslimConfirmation.trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();
      const normalizedExpected = expectedText.toLowerCase();
      
      if (normalizedInput !== normalizedExpected) {
        newErrors.muslimConfirmation = 'Please type exactly: "I am a Muslim. Alhamdulillah!"';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Let's start with your basic information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your.email@example.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter your full name"
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+234 800 000 0000"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
              <Checkbox
                id="isMuslim"
                checked={formData.isMuslim}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isMuslim: checked as boolean }))}
              />
              <Label htmlFor="isMuslim" className="text-green-800 dark:text-green-200 font-medium">
                I am a Muslim
              </Label>
            </div>
            {errors.isMuslim && <p className="text-red-500 text-sm">{errors.isMuslim}</p>}

            <div className="space-y-2">
              <Label htmlFor="muslimConfirmation" className="text-green-800 dark:text-green-200">
                Please type: "I am a Muslim. Alhamdulillah!"
              </Label>
              <Input
                id="muslimConfirmation"
                type="text"
                value={formData.muslimConfirmation}
                onChange={(e) => setFormData(prev => ({ ...prev, muslimConfirmation: e.target.value }))}
                placeholder="I am a Muslim. Alhamdulillah!"
                className={errors.muslimConfirmation ? 'border-red-500' : 'border-green-300 focus:border-green-500'}
              />
              {errors.muslimConfirmation && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.muslimConfirmation}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
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
      </form>
    </div>
  );
};
