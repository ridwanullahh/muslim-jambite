
import { useState, useEffect } from 'react';
import { X, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ExitIntentModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full relative animate-scale-in shadow-2xl">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Wait! Don't Leave Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join our community to get updates on new courses, Islamic content, and connect with fellow Muslim students.
          </p>

          <div className="space-y-3">
            <a
              href={import.meta.env.VITE_WHATSAPP_CHANNEL || "https://whatsapp.com/channel/dummy"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Join WhatsApp Channel</span>
            </a>

            <a
              href={import.meta.env.VITE_TELEGRAM_CHANNEL || "https://t.me/dummy"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Join Telegram Channel</span>
            </a>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};
