import { useState, useEffect } from 'react';
import { SiteSettingsService } from '../lib/sdk';

export const useCountdown = () => {
  const [settings, setSettings] = useState({
    bannerEnabled: false,
    bannerText: '',
    earlyBirdPrice: '',
    countdownEndDate: '',
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBannerSettings = async () => {
      try {
        const [
          bannerEnabledSetting,
          bannerTextSetting,
          priceSetting,
          endDateSetting,
        ] = await Promise.all([
          SiteSettingsService.getSetting('banner_enabled'),
          SiteSettingsService.getSetting('banner_text'),
          SiteSettingsService.getSetting('early_bird_price'),
          SiteSettingsService.getSetting('countdown_end_date'),
        ]);

        const enabled = bannerEnabledSetting?.value !== 'false';
        const endDate = endDateSetting?.value;

        setSettings({
          bannerEnabled: enabled,
          bannerText: bannerTextSetting?.value || 'Early Bird ends:',
          earlyBirdPrice: priceSetting?.value || '₦500',
          countdownEndDate: endDate || '',
        });

        const dismissed = localStorage.getItem('banner_dismissed');
        if (enabled && !dismissed && endDate) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (error) {
        console.error('Error loading banner settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBannerSettings();
  }, []);

  useEffect(() => {
    if (!settings.bannerEnabled || !settings.countdownEndDate) {
      return;
    }

    const targetDateTime = new Date(settings.countdownEndDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDateTime - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [settings]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('banner_dismissed', 'true');
    window.dispatchEvent(new CustomEvent('bannerDismissed'));
  };

  return { ...settings, timeLeft, isVisible, loading, handleDismiss };
};