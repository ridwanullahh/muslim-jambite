
import { useState, useEffect } from 'react';
import { X, Clock, Users, Star } from 'lucide-react';

export const StickyFomoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (30 days from now for early bird offer)
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

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-brand-primary via-green-600 to-brand-accent text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="font-semibold">Early Bird Offer</span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>500+ Students Enrolled</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-yellow-300 font-semibold">
              Registration: ₦500 Only!
            </span>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
