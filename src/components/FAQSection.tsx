import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left transition-all"
      >
        <span className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? 'var(--color-primary)' : 'transparent', color: isOpen ? 'white' : 'currentColor' }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="size-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 shrink-0"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-500 leading-relaxed pb-8 font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What is the best time to visit Srinagar?",
      answer: "The best time is from April to October for pleasant weather and blooming gardens. If you love snow and skiing, December to February is ideal for a winter wonderland experience."
    },
    {
      question: "What kind of clothing should I pack?",
      answer: "For summer (Apr-Sep), carry light cottons and a light jacket for cool evenings. For winter (Oct-Mar), heavy woolens, thermals, gloves, and waterproof boots are essential."
    },
    {
      question: "Are transportation details included in the package?",
      answer: "Yes, the package includes a private cab for all airport transfers and sightseeing as per the itinerary. Our local drivers are experienced and act as friendly guides."
    },
    {
      question: "Is Srinagar safe for families and solo travelers?",
      answer: "Absolutely! Srinagar is very welcoming to tourists. Local authorities and Muntazir Travels ensure a safe and comfortable environment for all our guests."
    },
    {
      question: "Are meals included in this sightseeing package?",
      answer: "This specific package includes breakfast and dinner at your stay (Houseboat/Hotel). Lunch is usually enjoyed at local restaurants during sightseeing to give you a taste of authentic Kashmiri cuisine."
    },
    {
      question: "Can I customize the itinerary?",
      answer: "Yes! We offer flexible customization. You can add extra days, upgrade your hotel, or include specific activities like paragliding or a private dinner on a Shikara."
    },
    {
      question: "What is the cancellation policy?",
      answer: "We offer free cancellation up to 7 days before your departure date. For cancellations within 7 days, a 50% refund is provided. No-shows are non-refundable."
    }
  ];

  return (
    <section className="mt-12 mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm">
          <HelpCircle size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">Common Questions</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">Trip Essentials & Support</p>
        </div>
      </div>
      
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="divide-y divide-slate-50">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">Still have questions?</p>
          <button className="px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-primary transition-all active:scale-95">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
