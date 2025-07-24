
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft } from 'lucide-react';

interface ProgramSelectionStepProps {
  data: {
    program: string;
    techTrack: boolean;
    techSkill: string;
    currentLevel: string;
  };
  techSkills: string[];
  onNext: (data: any) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const ProgramSelectionStep = ({ 
  data, 
  techSkills, 
  onNext, 
  onBack, 
  isLoading 
}: ProgramSelectionStepProps) => {
  const [formData, setFormData] = useState({
    program: data.program || 'jamb-prep',
    techTrack: data.techTrack || false,
    techSkill: data.techSkill || '',
    currentLevel: data.currentLevel || 'ss3'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.techTrack && !formData.techSkill) {
      newErrors.techSkill = 'Please select a tech skill';
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

  const monthlyFee = formData.techTrack ? 2000 : 1500;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Program Selection
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your program and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label>Program Type</Label>
          <RadioGroup
            value={formData.program}
            onValueChange={(value) => setFormData(prev => ({ ...prev, program: value }))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jamb-prep" id="jamb-prep" />
              <Label htmlFor="jamb-prep">JAMB Preparation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="post-utme" id="post-utme" />
              <Label htmlFor="post-utme">Post-UTME Preparation</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Current Level</Label>
          <Select 
            value={formData.currentLevel} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, currentLevel: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your current level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ss1">SS1</SelectItem>
              <SelectItem value="ss2">SS2</SelectItem>
              <SelectItem value="ss3">SS3</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Add Tech Skills Track</Label>
              <p className="text-sm text-gray-500">Learn in-demand tech skills alongside your core program</p>
            </div>
            <Switch
              checked={formData.techTrack}
              onCheckedChange={(checked) => setFormData(prev => ({ 
                ...prev, 
                techTrack: checked,
                techSkill: checked ? prev.techSkill : ''
              }))}
            />
          </div>

          {formData.techTrack && (
            <div className="space-y-2">
              <Label>Select Tech Skill</Label>
              <Select 
                value={formData.techSkill} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, techSkill: value }))}
              >
                <SelectTrigger className={errors.techSkill ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Choose a tech skill" />
                </SelectTrigger>
                <SelectContent>
                  {techSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.techSkill && <p className="text-red-500 text-sm">{errors.techSkill}</p>}
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Monthly Fee:</span>
            <span className="text-xl font-bold text-brand-primary">₦{monthlyFee.toLocaleString()}</span>
          </div>
          {formData.techTrack && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Includes tech skills training
            </p>
          )}
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
