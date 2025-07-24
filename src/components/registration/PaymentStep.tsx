
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, CreditCard, Check } from 'lucide-react';
import { PaymentService } from '@/services/PaymentService';

interface PaymentStepProps {
  data: {
    email: string;
    fullName: string;
    program: string;
    techTrack: boolean;
    techSkill?: string;
    currentLevel: string;
    interests: string[];
  };
  onSuccess: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const PaymentStep = ({ data, onSuccess, onBack, isLoading }: PaymentStepProps) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const registrationFee = 500;
  const monthlyFee = data.techTrack ? 2000 : 1500;

  const handlePayment = async () => {
    setPaymentLoading(true);
    setPaymentError('');

    try {
      const reference = PaymentService.generateReference();
      
      await PaymentService.processInlinePayment(
        {
          email: data.email,
          amount: registrationFee,
          currency: 'NGN',
          reference,
          metadata: {
            fullName: data.fullName,
            program: data.program,
            techTrack: data.techTrack,
            techSkill: data.techSkill,
            currentLevel: data.currentLevel,
            interests: data.interests
          }
        },
        async (response) => {
          // Payment successful
          console.log('Payment successful:', response);
          onSuccess();
        },
        () => {
          // Payment closed
          setPaymentLoading(false);
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('Payment failed. Please try again.');
      setPaymentLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Complete Your Registration
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Review your selection and complete payment
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Registration Summary
          </CardTitle>
          <CardDescription>
            Please review your program selection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Name:</span>
            <span>{data.fullName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Email:</span>
            <span>{data.email}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Program:</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {data.program === 'jamb-prep' ? 'JAMB Preparation' : 'Post-UTME Preparation'}
              </Badge>
              {data.techTrack && (
                <Badge variant="outline">+ Tech Skills</Badge>
              )}
            </div>
          </div>

          {data.techTrack && (
            <div className="flex justify-between items-center">
              <span className="font-medium">Tech Skill:</span>
              <span>{data.techSkill}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="font-medium">Current Level:</span>
            <span>{data.currentLevel.toUpperCase()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Selected Interests:</span>
            <span className="text-sm text-gray-600">
              {data.interests.length} subjects
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Registration Fee:</span>
              <span className="text-lg font-bold">₦{registrationFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Monthly Fee (after registration):</span>
              <span>₦{monthlyFee.toLocaleString()}/month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {paymentError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{paymentError}</p>
        </div>
      )}

      <div className="flex space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="flex-1"
          disabled={paymentLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handlePayment}
          className="flex-1"
          disabled={paymentLoading || isLoading}
        >
          {paymentLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ₦{registrationFee.toLocaleString()}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
