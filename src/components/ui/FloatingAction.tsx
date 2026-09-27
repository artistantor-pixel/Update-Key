import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const FloatingAction = () => {
  return (
    <motion.a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-accent/40 glass rounded-full flex items-center justify-center text-accent-hover shadow-[0_0_20px_rgba(46,49,146,0.3)] cursor-none hover:shadow-[0_0_30px_rgba(46,49,146,0.5)] transition-shadow"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
      </span>
    </motion.a>
  );
};
