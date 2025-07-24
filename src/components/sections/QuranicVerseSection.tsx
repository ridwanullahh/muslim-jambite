
import { BookOpen, Star } from 'lucide-react';

export const QuranicVerseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-emerald-100 dark:border-emerald-900/20">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-emerald-400 text-emerald-400" />
                ))}
              </div>
            </div>
            
            <div className="arabic-text mb-8">
              <p className="text-2xl md:text-3xl text-gray-900 dark:text-white font-arabic leading-relaxed" dir="rtl">
                سَنُقْرِئُكَ فَلَا تَنسَىٰ ۝ إِلَّا مَا شَاءَ اللَّهُ ۚ إِنَّهُ يَعْلَمُ الْجَهْرَ وَمَا يَخْفَىٰ
              </p>
            </div>
            
            <div className="english-translation mb-8">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-lora italic leading-relaxed">
                "We shall make you to recite (the Qur'ân), so you (O Muhammad ﷺ) shall not forget (it) - Except what Allâh may will. He knows what is apparent and what is hidden."
              </p>
            </div>
            
            <div className="reference">
              <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 font-inter">
                — Surah Al-A'la (87:6-7)
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-emerald-200 dark:border-emerald-800">
              <p className="text-lg text-gray-600 dark:text-gray-400 font-lora">
                Just as Allah (SWT) blessed the Prophet (ﷺ) with the gift of knowledge that would not be forgotten, 
                we strive to provide you with knowledge that will benefit you in this life and the next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
