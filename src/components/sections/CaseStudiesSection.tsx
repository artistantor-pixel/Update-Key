import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { useContent } from '../../context/ContentContext';

export const CaseStudiesSection = () => {
  const { content } = useContent();
  const caseStudiesData = content.caseStudies;
  const [expandedId, setExpandedId] = useState<string | null>(caseStudiesData[0].id);

  return (
    <section id="case-studies" className="py-32 bg-background border-t border-border/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Proven Results.</h2>
            <p className="text-foreground/50 max-w-xl text-lg font-light">
              Minimal noise. Maximum impact. Explore the growth engines we've built.
            </p>
          </div>
          <Button variant="ghost" className="group rounded-full hover:bg-surface border border-transparent hover:border-border">
            View All Work 
            <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        <div className="flex flex-col border-t border-border">
          {caseStudiesData.map((study) => {
            const isExpanded = expandedId === study.id;

            return (
              <div key={study.id} className="border-b border-border flex flex-col overflow-hidden">
                {/* Header / Trigger */}
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : study.id)}
                  className="w-full py-8 md:py-12 flex items-center justify-between group focus:outline-none"
                >
                  <div className="flex items-center gap-8 md:gap-16 w-full">
                    <div className="text-primary text-sm font-bold uppercase tracking-widest hidden md:block w-48 text-left">
                      {study.category}
                    </div>
                    <h3 className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500 text-left flex-1 ${
                      isExpanded ? 'text-foreground' : 'text-foreground/50 group-hover:text-foreground/80'
                    }`}>
                      {study.title}
                    </h3>
                    <div className="hidden lg:flex gap-12 text-left shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest mb-1">ROAS</div>
                        <div className="text-lg font-medium">{study.metrics.roas}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest mb-1">Lift</div>
                        <div className="text-lg font-medium">{study.metrics.conversionLift}</div>
                      </div>
                    </div>
                  </div>
                  <div className={`ml-4 w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                    isExpanded ? 'bg-primary border-primary text-white' : 'border-border text-foreground group-hover:border-primary/50'
                  }`}>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                      {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
                    >
                      <div className="pb-12 md:pb-16 flex flex-col lg:flex-row gap-12 lg:gap-24">
                        {/* Left: Media */}
                        <div className="lg:w-5/12 h-[300px] md:h-[400px] rounded-3xl overflow-hidden relative group">
                          <motion.img 
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                            src={study.image} 
                            alt={study.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        
                        {/* Right: Functional Content */}
                        <div className="lg:w-7/12 flex flex-col justify-center">
                          <CaseStudyTabs tabs={study.tabs} />
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/50">
                            <div>
                              <div className="text-xs text-foreground/40 mb-2 uppercase tracking-widest font-semibold">ROAS</div>
                              <div className="text-2xl md:text-3xl font-light text-primary">{study.metrics.roas}</div>
                            </div>
                            <div>
                              <div className="text-xs text-foreground/40 mb-2 uppercase tracking-widest font-semibold">Time Saved</div>
                              <div className="text-2xl md:text-3xl font-light text-primary">{study.metrics.timeSaved}</div>
                            </div>
                            <div>
                              <div className="text-xs text-foreground/40 mb-2 uppercase tracking-widest font-semibold">Conversion</div>
                              <div className="text-2xl md:text-3xl font-light text-primary">{study.metrics.conversionLift}</div>
                            </div>
                          </div>
                        </div>
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

const CaseStudyTabs = ({ tabs }: { tabs: any }) => {
  const [activeTab, setActiveTab] = useState<'challenge' | 'solution' | 'impact'>('challenge');

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex gap-8 mb-8 border-b border-border/30">
        {(['challenge', 'solution', 'impact'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${
              activeTab === tab ? 'text-primary' : 'text-foreground/40 hover:text-foreground/80'
            }`}
          >
            {tab}
            {activeTab === tab && (
               <motion.div 
                 layoutId="caseStudyActiveTab"
                 className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"
               />
            )}
          </button>
        ))}
      </div>
      
      <div className="relative min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-foreground/70 text-lg md:text-xl font-light leading-relaxed absolute inset-0"
          >
            {tabs[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
