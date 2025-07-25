
import { useState, useEffect } from 'react';
import { X, ArrowRight, Timer } from 'lucide-react';
import { SiteSettingsService } from '../../lib/sdk';

export const StickyFomoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [bannerText, setBannerText] = useState('Early Bird ends:');
  const [earlyBirdPrice, setEarlyBirdPrice] = useState('₦500');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Load banner settings
    const loadBannerSettings = async () => {
      try {
        const [bannerEnabledSetting, bannerTextSetting, priceSetting] = await Promise.all([
          SiteSettingsService.getSetting('banner_enabled'),
          SiteSettingsService.getSetting('banner_text'),
          SiteSettingsService.getSetting('early_bird_price')
        ]);

        setBannerEnabled(bannerEnabledSetting?.value !== 'false');
        setBannerText(bannerTextSetting?.value || 'Early Bird ends:');
        setEarlyBirdPrice(priceSetting?.value || '₦500');
      } catch (error) {
        console.error('Error loading banner settings:', error);
      }
    };

    loadBannerSettings();
  }, []);

  useEffect(() => {
    if (!bannerEnabled) {
      setIsVisible(false);
      // Remove padding from body when banner is disabled
      document.body.style.paddingTop = '0';
      return;
    }

    // Check if user has dismissed banner
    const dismissed = localStorage.getItem('banner_dismissed');
    if (dismissed) {
      setIsVisible(false);
      document.body.style.paddingTop = '0';
      return;
    }

    setIsVisible(true);
    // Add padding to body to prevent header overlap
    document.body.style.paddingTop = '48px';

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
      } else {
        setIsVisible(false);
        document.body.style.paddingTop = '0';
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      document.body.style.paddingTop = '0';
    };
  }, [bannerEnabled]);

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    document.body.style.paddingTop = '0';
    localStorage.setItem('banner_dismissed', 'true');
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
              <span className="font-medium">{bannerText}</span>
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
            <span className="text-yellow-300 font-bold">Only {earlyBirdPrice}!</span>
            <button
              onClick={scrollToRegistration}
              className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors text-xs font-medium"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3 h-3" />
            </button>
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
