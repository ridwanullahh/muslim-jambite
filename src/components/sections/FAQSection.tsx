import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { FAQService } from '../../lib/sdk';

export const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqsData = await FAQService.getFAQs();
        setFaqs(faqsData);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAccordionItem = (id: string) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((itemId) => itemId !== id)
        : [...prevExpanded, id]
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" collapsible>
          {faqs.map((faq: any) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger onClick={() => toggleAccordionItem(faq.id)}>
                {faq.question}
                {expandedItems.includes(faq.id) ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
