
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, CreditCard, Check, Shield, AlertTriangle } from 'lucide-react';
import { PaymentService } from '@/services/PaymentService';
import { RegistrationService } from '@/lib/sdk';

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
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');

  const registrationFee = 500;
  const monthlyFee = data.techTrack ? 2000 : 1500;

  const handlePayment = async () => {
    if (!PaymentService.validateConfig()) {
      setPaymentError('Payment service is not properly configured. Please contact support.');
      return;
    }

    setPaymentLoading(true);
    setPaymentError('');
    setVerificationStatus('idle');

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
            interests: data.interests.join(', ')
          }
        },
        async (response) => {
          // Payment successful - verify and save to database
          setVerificationStatus('verifying');
          
          try {
            // Verify payment
            const verification = await PaymentService.verifyPayment(response.reference);
            
            if (verification.status && verification.data.status === 'success') {
              // Save student registration to database
              await RegistrationService.registerStudent({
                fullName: data.fullName,
                email: data.email,
                program: data.program,
                techTrack: data.techTrack,
                techSkill: data.techSkill,
                currentLevel: data.currentLevel,
                interests: data.interests,
                paymentStatus: 'paid',
                registrationFee: registrationFee,
                monthlyFee: monthlyFee,
                isMuslim: true,
                phone: verification.data.customer.first_name || '',
                dateOfBirth: '',
                gender: 'male',
                state: '',
                lga: '',
                address: '',
                parentName: '',
                parentPhone: '',
                emergencyContact: '',
                emergencyPhone: '',
                academicBackground: '',
                jambSubjects: data.interests,
                learningGoals: [],
                studySchedule: '',
                motivations: [],
                challenges: [],
                expectations: [],
                islamicKnowledge: '',
                muslimConfirmation: 'yes'
              });
              
              setVerificationStatus('success');
              setTimeout(() => {
                onSuccess();
              }, 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setVerificationStatus('failed');
            setPaymentError('Payment verification failed. Please contact support with reference: ' + response.reference);
          }
          
          setPaymentLoading(false);
        },
        () => {
          // Payment closed
          setPaymentLoading(false);
          setVerificationStatus('idle');
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setPaymentLoading(false);
      setVerificationStatus('idle');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Complete Your Registration
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Secure payment powered by Paystack
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

          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800 dark:text-green-200">
              Secure payment protected by Paystack encryption
            </span>
          </div>
        </CardContent>
      </Card>

      {paymentError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <p className="text-red-600 dark:text-red-400">{paymentError}</p>
          </div>
        </div>
      )}

      {verificationStatus === 'verifying' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            <p className="text-blue-600 dark:text-blue-400">Verifying payment...</p>
          </div>
        </div>
      )}

      {verificationStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-green-600 dark:text-green-400">Payment verified successfully! Completing registration...</p>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="flex-1"
          disabled={paymentLoading || verificationStatus === 'verifying'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handlePayment}
          className="flex-1"
          disabled={paymentLoading || isLoading || verificationStatus === 'verifying'}
        >
          {paymentLoading || verificationStatus === 'verifying' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {verificationStatus === 'verifying' ? 'Verifying...' : 'Processing...'}
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
