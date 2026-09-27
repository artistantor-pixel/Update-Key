import { motion } from 'framer-motion';
import { Key } from 'lucide-react';

export const ProblemHero = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-white/70 backdrop-blur-md text-primary text-xs font-bold tracking-widest uppercase mb-8 shadow-sm"
        >
          <Key size={14} />
          Community Forum
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight"
        >
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Problem Key</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
        >
          Post your most stubborn design, development, or marketing problems. Our community experts will unlock the solution.
        </motion.p>
      </div>
    </section>
  );
};
