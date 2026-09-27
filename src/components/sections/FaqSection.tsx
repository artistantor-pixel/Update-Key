import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Why shouldn't I just hire a freelance designer and a separate ads agency?",
    answer: "Because fragmented teams lead to fragmented results. When your designers and your performance marketers don't talk, you waste time and money. We handle both, ensuring your ads match your landing pages perfectly."
  },
  {
    question: "How fast can you launch a project?",
    answer: "For our Launchpad bundle, we can have you live in 7 days. For custom web applications and full ad setups, it typically takes 3-4 weeks depending on complexity."
  },
  {
    question: "What if I only need a website and not ads?",
    answer: "That's perfectly fine! While our bundles offer the best value, we do offer standalone services. You can start with a website and add our growth services later when you're ready to scale."
  },
  {
    question: "Are there any hidden fees or long-term contracts?",
    answer: "Zero hidden fees. Our pricing is transparent. For development, it's typically a one-time project fee. For ads and AI automation management, it's a month-to-month retainer with no long-term lock-in."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-foreground/70">Everything you need to know about working with us.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? 'border-primary/50 bg-primary/5' : 'border-border bg-surface hover:border-foreground/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-lg pr-8">{faq.question}</span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-primary text-white' : 'bg-surface-hover text-foreground'
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-foreground/70 leading-relaxed border-t border-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
