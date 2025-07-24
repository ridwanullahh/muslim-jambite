
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
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-brand-primary via-yellow-500 to-green-500 text-white py-1.5 px-4 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-3">
          <Clock className="w-3.5 h-3.5 text-black" />
          <span className="font-medium text-black">Early Bird Registration Ends In:</span>
          <div className="flex space-x-1">
            <span className="bg-black/20 px-1.5 py-0.5 rounded text-xs font-bold text-white">{timeLeft.days}d</span>
            <span className="bg-black/20 px-1.5 py-0.5 rounded text-xs font-bold text-white">{timeLeft.hours}h</span>
            <span className="bg-black/20 px-1.5 py-0.5 rounded text-xs font-bold text-white">{timeLeft.minutes}m</span>
            <span className="bg-black/20 px-1.5 py-0.5 rounded text-xs font-bold text-white">{timeLeft.seconds}s</span>
          </div>
          <button
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-yellow-400 px-3 py-1 rounded-full font-bold hover:bg-gray-800 transition-colors text-xs"
          >
            Register Now - ₦500
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-black/80 hover:text-black"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
