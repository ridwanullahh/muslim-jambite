
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { sdk } from '../../../lib/sdk';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const faqData = await sdk.get<FAQ>('faqs');
        setFaqs(faqData || []);
      } catch (error) {
        console.error('Failed to load FAQs:', error);
        // Fallback FAQs
        setFaqs([
          {
            id: '1',
            question: 'What makes MuslimJambite different from other JAMB prep programs?',
            answer: 'We integrate Islamic values with academic excellence, offering a holistic approach that strengthens both your Dunya and Akhirah. Plus, our optional tech skills track prepares you for the digital future.',
            category: 'General'
          },
          {
            id: '2',
            question: 'Can I join if I\'m not a Muslim?',
            answer: 'While our program is designed with Islamic values, we welcome students of all backgrounds who respect our values and want quality JAMB preparation.',
            category: 'General'
          },
          {
            id: '3',
            question: 'What tech skills can I learn?',
            answer: 'You can choose from Frontend Development, Backend Development, Mobile Development, Cybersecurity, Data Science, or UI/UX Design.',
            category: 'Tech Skills'
          },
          {
            id: '4',
            question: 'Is the tech track worth the extra cost?',
            answer: 'Absolutely! Tech skills give you a competitive edge and open up additional career opportunities beyond your primary field of study.',
            category: 'Tech Skills'
          },
          {
            id: '5',
            question: 'How much does the program cost?',
            answer: 'The base program (JAMB + Shariah) is ₦1,500/month for 9 months. The enhanced program (includes tech skills) is ₦2,000/month for 12 months. Registration fee is ₦500.',
            category: 'Pricing'
          }
        ]);
      }
    };

    loadFAQs();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 font-inter">
            Frequently Asked <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-lora">
            Get quick answers to common questions about our programs
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-6 border-0">
              <AccordionTrigger className="text-left text-lg font-medium text-gray-900 dark:text-white hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 pb-6 font-lora">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Still have questions?</p>
          <button
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};
