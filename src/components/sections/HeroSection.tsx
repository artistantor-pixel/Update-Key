import { ArrowRight, Sparkles, Play, Mouse } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

export const HeroSection = () => {
  const { content } = useContent();
  const hero = content.hero;
  // Cursor Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the parallax effect
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Transforms for floating layers (pushed further out to prevent overlapping text)
  const x1 = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const y1 = useTransform(springY, [-0.5, 0.5], [-40, 40]);
  
  const x2 = useTransform(springX, [-0.5, 0.5], [50, -50]);
  const y2 = useTransform(springY, [-0.5, 0.5], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-background">
      
      {/* Organized, Elegant Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Soft, massive background glow rather than hard lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1000px] h-[80vw] max-h-[1000px] rounded-full border border-primary/5 bg-gradient-to-tr from-transparent via-primary/5 to-accent/5 opacity-50" />
        
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[30%] w-96 h-96 bg-primary/20 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[30%] w-[500px] h-[500px] bg-accent/15 blur-[120px] rounded-full" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-8">
        
        {/* Clean Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-white/70 backdrop-blur-md text-primary text-xs font-bold tracking-widest uppercase mb-10 shadow-sm"
        >
          <Sparkles size={14} className="animate-pulse" />
          {hero.badge}
        </motion.div>
        
        {/* Crisp, Organized Typography */}
        <div className="relative max-w-5xl mx-auto w-full z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter mb-8 text-foreground leading-[1.05]"
          >
            {hero.headlineLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent pb-2">
              {hero.headlineLine2}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-foreground/60 max-w-3xl mx-auto mb-14 font-medium leading-relaxed"
          >
            {hero.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto group h-16 px-10 text-lg rounded-full font-bold shadow-lg shadow-primary/20 transition-transform hover:-translate-y-1">
              {hero.primaryButtonText}
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto group h-16 px-10 text-lg rounded-full font-bold bg-white/60 border-border/60 hover:bg-white hover:border-primary/40 backdrop-blur-sm shadow-sm transition-transform hover:-translate-y-1">
              <Play className="mr-3 text-accent group-hover:scale-110 transition-transform" size={24} fill="currentColor" />
              {hero.secondaryButtonText}
            </Button>
          </motion.div>
        </div>
        
        {/* Organized Floating Parallax Elements (Pushed outwards so they don't block text) */}
        <div className="absolute inset-0 pointer-events-none z-30 hidden lg:block">
          
          {/* Top Left - Moved further left and up */}
          <motion.div style={{ x: x1, y: y1 }} className="absolute top-[5%] left-[5%] xl:left-[10%] glass px-6 py-4 rounded-2xl rotate-[-4deg] shadow-xl border border-white/60">
            <span className="font-extrabold text-primary text-xl tracking-tight">120%+ ROAS</span>
          </motion.div>
          
          {/* Top Right - Moved further right and up */}
          <motion.div style={{ x: x2, y: y2 }} className="absolute top-[15%] right-[2%] xl:right-[8%] glass px-6 py-4 rounded-2xl rotate-[6deg] shadow-xl border border-white/60 flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
            <span className="font-bold text-foreground text-lg">AI Agents Active</span>
          </motion.div>

          {/* Bottom Left - Moved further down and left */}
          <motion.div style={{ x: x2, y: y2 }} className="absolute bottom-[25%] left-[2%] xl:left-[8%] glass p-2 rounded-2xl rotate-[3deg] shadow-xl border border-white/60">
             <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop" className="w-32 h-20 object-cover rounded-xl" alt="Brand Aesthetics" />
          </motion.div>

          {/* Bottom Right - Moved further down and right */}
          <motion.div style={{ x: x1, y: y1 }} className="absolute bottom-[20%] right-[5%] xl:right-[12%] glass px-6 py-5 rounded-2xl rotate-[-5deg] shadow-xl border border-white/60 flex flex-col gap-2 w-40">
            <div className="w-full h-2.5 bg-foreground/10 rounded-full overflow-hidden"><div className="w-4/5 h-full bg-primary rounded-full" /></div>
            <div className="w-full h-2.5 bg-foreground/10 rounded-full overflow-hidden"><div className="w-3/5 h-full bg-accent rounded-full" /></div>
          </motion.div>
        </div>

      </div>

      {/* Perfectly Placed Scroll Indicator at the absolute bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">Explore</span>
        <Mouse size={24} className="opacity-50" />
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-4 bg-foreground/30 rounded-full mt-1"
        />
      </motion.div>

    </section>
  );
};
