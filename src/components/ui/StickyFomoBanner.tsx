
import { X, ArrowRight } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

export const StickyFomoBanner = () => {
  const {
    bannerEnabled,
    bannerText,
    earlyBirdPrice,
    timeLeft,
    isVisible,
    handleDismiss,
  } = useCountdown();

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible || !bannerEnabled) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-brand-primary via-green-600 to-brand-accent text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 text-sm">
          {/* Left Section - Compact */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline font-medium">{bannerText}</span>
              <div className="flex items-center space-x-1 font-mono bg-black/20 px-2 py-1 rounded text-xs">
                <span>{timeLeft.days}d</span>
                <span>:</span>
                <span>{timeLeft.hours}h</span>
                <span>:</span>
                <span>{timeLeft.minutes}m</span>
                <span>:</span>
                <span>{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>

          {/* Right Section - Compact */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3">
                <span className="text-yellow-300 font-bold">Only {earlyBirdPrice}!</span>
                <button
                onClick={scrollToRegistration}
                className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors text-xs font-medium"
                >
                <span>Register Now</span>
                <ArrowRight className="w-3 h-3" />
                </button>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
