
import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export const RegistrationCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          Don't miss out on the special ₦500 early bird price!
        </p>
      </div>
    </div>
  );
};
