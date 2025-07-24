
import { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';

export const StickyFomoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set countdown to 30 days from now
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Early Bird Registration Ends In:</span>
          <div className="flex space-x-2">
            <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.days}d</span>
            <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.hours}h</span>
            <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.minutes}m</span>
            <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.seconds}s</span>
          </div>
          <button
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-red-500 px-4 py-1 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Register Now - ₦500
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
