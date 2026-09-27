import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card } from '../ui/Card';

const testimonials = [
  {
    quote: "Update Key didn't just build us a website; they built a growth engine. Our conversion rate doubled in the first month.",
    author: "Sarah Jenkins",
    role: "CMO, TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The speed at which they deliver high-quality ad creatives and AI integrations is unmatched. They replaced three of our existing agencies.",
    author: "Marcus Chen",
    role: "Founder, Apex Retail",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Finally, an agency that understands that design and performance marketing need to work together. Incredible ROI.",
    author: "Elena Rodriguez",
    role: "VP Marketing, Nova",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  }
];

export const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Don't Just Take Our Word For It</h2>
        </div>

        <div className="relative">
          <Card className="p-8 md:p-16 border-primary/20 bg-surface/80 backdrop-blur-md relative z-10">
            <Quote className="text-primary/20 w-24 h-24 absolute top-8 left-8" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 text-center"
              >
                <p className="text-xl md:text-3xl font-medium leading-relaxed mb-10">
                  "{testimonials[currentIndex].quote}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].author} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <div className="text-left">
                    <div className="font-bold text-lg">{testimonials[currentIndex].author}</div>
                    <div className="text-foreground/60">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border bg-surface flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-border bg-surface flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
