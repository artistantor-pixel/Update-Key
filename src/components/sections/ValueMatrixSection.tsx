import { motion } from 'framer-motion';
import { Target, Zap, Rocket, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

export const ValueMatrixSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            A Smarter Way to Scale.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 max-w-2xl mx-auto text-lg"
          >
            Say goodbye to fragmented communication and wasted budgets. We unify your growth strategy under one roof.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Box 1 - Large spanning 2 columns */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1"
          >
            <Card className="h-full bg-gradient-to-br from-surface to-surface-hover border-border relative overflow-hidden group p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors duration-700" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <Rocket className="text-primary w-12 h-12 mb-4" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Unified Execution</h3>
                  <p className="text-foreground/70 max-w-md">No more pointing fingers between agencies. Your design, development, and ads teams work in perfect sync to hit your goals faster.</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Box 2 - Small 1 column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 md:row-span-1"
          >
            <Card className="h-full bg-surface border-border flex flex-col justify-center items-center text-center p-8 group hover:border-primary/50">
              <Zap className="text-accent w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-foreground/70 text-sm">AI-driven workflows mean we deliver assets 3x faster than traditional agencies.</p>
            </Card>
          </motion.div>

          {/* Box 3 - Small 1 column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 md:row-span-1"
          >
            <Card className="h-full bg-surface border-border flex flex-col justify-center items-center text-center p-8 group hover:border-primary/50">
              <ShieldCheck className="text-primary w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-bold mb-2">Zero Hidden Fees</h3>
              <p className="text-foreground/70 text-sm">Transparent bundle pricing. What you see is exactly what you pay.</p>
            </Card>
          </motion.div>

          {/* Box 4 - Large spanning 2 columns */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 md:row-span-1"
          >
            <Card className="h-full bg-gradient-to-tr from-surface to-background border-border relative overflow-hidden group p-8">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-3xl rounded-full group-hover:bg-accent/20 transition-colors duration-700" />
              <div className="relative z-10 flex flex-col h-full justify-between items-end text-right">
                <Target className="text-accent w-12 h-12 mb-4" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Data-Backed Growth</h3>
                  <p className="text-foreground/70 max-w-md ml-auto">Every design decision and campaign launch is rooted in data. We don't guess; we test, measure, and scale what works.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
