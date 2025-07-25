
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, AlertCircle, Copy, Check } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);

  const shahadah = "Laa ilaaha illa Allah, Muhammadun Rosulu-Allah";

  const handleCopy = () => {
    navigator.clipboard.writeText(shahadah);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

    if (formData.isMuslim && !formData.muslimConfirmation) {
      newErrors.muslimConfirmation = 'Please confirm by typing the Shahadah';
    } else if (formData.isMuslim && formData.muslimConfirmation) {
      // Strict validation for the Shahadah with leniency for case, spacing, and punctuation
      const normalizedInput = formData.muslimConfirmation.trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .replace(/[.,;:!?]/g, '');
      const normalizedExpected = shahadah.toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[.,;:!?]/g, '');
      
      if (normalizedInput !== normalizedExpected) {
        newErrors.muslimConfirmation = 'Please type the Shahadah exactly as shown';
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

        {/* Islamic Verification */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="isMuslim"
              checked={formData.isMuslim}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isMuslim: checked as boolean, muslimConfirmation: '' }))}
              className="rounded-full"
            />
            <Label htmlFor="isMuslim" className="font-medium">
              I am a Muslim
            </Label>
          </div>
          {errors.isMuslim && <p className="text-red-500 text-sm">{errors.isMuslim}</p>}

          {formData.isMuslim && (
            <div className="space-y-2">
              <Label htmlFor="muslimConfirmation">
                Please type the Shahadah:
              </Label>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="font-arabic">{shahadah}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="h-6 px-2"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <Input
                id="muslimConfirmation"
                type="text"
                value={formData.muslimConfirmation}
                onChange={(e) => setFormData(prev => ({ ...prev, muslimConfirmation: e.target.value }))}
                placeholder="Type the Shahadah here..."
                className={errors.muslimConfirmation ? 'border-red-500' : ''}
              />
              {errors.muslimConfirmation && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.muslimConfirmation}</span>
                </div>
              )}
            </div>
          )}
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
