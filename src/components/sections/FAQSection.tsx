import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const FAQSection = () => {
  const [faqs] = useState([
    {
      id: '1',
      question: 'What is the MuslimJambite program?',
      answer: 'MuslimJambite is a comprehensive Islamic education program designed to help Muslim students excel in their JAMB examinations while maintaining their Islamic values and spiritual growth.',
      category: 'General'
    },
    {
      id: '2', 
      question: 'How does the program balance Islamic teachings with academic excellence?',
      answer: 'Our program integrates Islamic principles into the learning process, incorporating Quranic verses, Hadith, and Islamic ethics into study materials while maintaining academic rigor.',
      category: 'Academic'
    },
    {
      id: '3',
      question: 'What subjects are covered in the JAMB preparation?',
      answer: 'We cover all major JAMB subjects including English, Mathematics, Physics, Chemistry, Biology, Government, Economics, Literature, and more, all taught with Islamic perspectives.',
      category: 'Academic'
    },
    {
      id: '4',
      question: 'Is there a fee for the program?',
      answer: 'Yes, there is a monthly fee of ₦1,500 and a one-time registration fee of ₦500. However, we offer scholarships and payment plans for students who need financial assistance.',
      category: 'Payment'
    },
    {
      id: '5',
      question: 'How can I register for the program?',
      answer: 'You can register by filling out our online registration form above. The process includes selecting your preferred program, providing your details, and completing the payment.',
      category: 'Registration'
    }
  ]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our Islamic education program
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-semibold text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
