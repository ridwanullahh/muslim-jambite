
import { AlertCircle } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

export const RegistrationCountdown = () => {
  const { bannerEnabled, timeLeft, earlyBirdPrice } = useCountdown();

  if (!bannerEnabled) {
    return null;
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
          Registration Closing Soon!
        </h3>
      </div>
      
      <div className="text-center">
        <p className="text-red-700 dark:text-red-300 mb-4">
          Early bird registration ends in:
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs">Days</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs">Hours</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs">Minutes</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs">Seconds</div>
            </div>
          </div>
        </div>
        
        <p className="text-red-600 dark:text-red-400 mt-4 font-medium">
          Don't miss out on the special {earlyBirdPrice} early bird price!
        </p>
      </div>
    </div>
  );
};
