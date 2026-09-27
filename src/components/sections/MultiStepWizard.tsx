import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check, ArrowRight, ArrowLeft, Minus, DollarSign, ChevronDown, Clock, Zap, Rocket } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import type { CalculatorItem } from '../../context/ContentContext';

export const MultiStepWizard = () => {
  const { content } = useContent();
  const categories = content.calculator;

  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<CalculatorItem[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?.category || null);
  
  // Timeline Multiplier
  const [timeline, setTimeline] = useState<'Standard' | 'Rush' | 'Critical'>('Standard');
  const timelineMultipliers = {
    'Standard': 1,
    'Rush': 1.2,
    'Critical': 1.5
  };
  
  // Lead Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  // Scroll to top of section on step change
  useEffect(() => {
    if (step > 1) {
      const el = document.getElementById('onboarding');
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
      }
    }
  }, [step]);

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const toggleItem = (item: CalculatorItem) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isItemSelected = (id: string) => {
    return selectedItems.some(item => item.id === id);
  };

  const baseEstimate = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.price, 0);
  }, [selectedItems]);

  const totalEstimate = useMemo(() => {
    return baseEstimate * timelineMultipliers[timeline];
  }, [baseEstimate, timeline]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(prev => prev === categoryName ? null : categoryName);
  };

  return (
    <section id="onboarding" className="py-24 relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-6"
          >
            Project Calculator
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Estimate Your Scope</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">Select the specific services you need, choose your timeline, and get an instant transparent estimate for your project.</p>
        </div>

        {/* Step Indicators */}
        <div className="mb-10 flex justify-center items-center gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 ${
                step >= i ? 'bg-primary text-white shadow-[0_0_20px_rgba(0,174,239,0.4)]' : 'bg-white/5 text-foreground/40 border border-white/10'
              }`}>
                {step > i ? <Check size={18} strokeWidth={3} /> : i}
              </div>
              {i < 3 && <div className={`w-16 h-1 rounded-full transition-all duration-300 ${step > i ? 'bg-primary shadow-[0_0_10px_rgba(0,174,239,0.4)]' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <Card className="p-0 relative overflow-hidden border-white/10 shadow-2xl bg-black/40 backdrop-blur-2xl flex flex-col md:flex-row min-h-[600px] ring-1 ring-white/5">
          
          {/* Left Column (Content area) */}
          <div className="flex-1 p-6 md:p-12 flex flex-col relative">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Select Scope */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <h3 className="text-2xl font-bold mb-8">What do you need help with?</h3>
                  
                  <div className="flex-1 space-y-4 mb-24 md:mb-8 overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((cat, idx) => (
                      <div key={idx} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-all">
                        {/* Category Header */}
                        <button 
                          onClick={() => toggleCategory(cat.category)}
                          className={`w-full flex items-center justify-between p-5 transition-colors text-left ${expandedCategory === cat.category ? 'bg-white/5' : 'hover:bg-white/5'}`}
                        >
                          <span className="font-bold text-lg">{cat.category}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${expandedCategory === cat.category ? 'bg-primary/20 text-primary rotate-180' : 'bg-white/10 text-foreground/50'}`}>
                            <ChevronDown size={18} />
                          </div>
                        </button>
                        
                        {/* Category Items */}
                        <AnimatePresence>
                          {expandedCategory === cat.category && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-white/10 bg-black/20"
                            >
                              <div className="p-4 space-y-3">
                                {cat.items.map(item => {
                                  const selected = isItemSelected(item.id);
                                  return (
                                    <div 
                                      key={item.id} 
                                      onClick={() => toggleItem(item)}
                                      className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                                        selected 
                                          ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,174,239,0.15)]' 
                                          : 'border-white/5 bg-white/5 hover:border-primary/50'
                                      }`}
                                    >
                                      <div className="flex items-start gap-4 pr-4">
                                        <div className={`mt-1 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors ${
                                          selected ? 'bg-primary border-primary text-white' : 'border-foreground/30 text-transparent group-hover:border-primary/50'
                                        }`}>
                                          <Check size={14} strokeWidth={4} />
                                        </div>
                                        <div>
                                          <div className={`font-bold mb-1 transition-colors ${selected ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                                            {item.name}
                                          </div>
                                          <div className="text-xs text-foreground/60 leading-relaxed max-w-sm">{item.description}</div>
                                        </div>
                                      </div>
                                      <div className={`shrink-0 font-mono font-bold flex items-center gap-1 transition-colors ${
                                        selected ? 'text-primary' : 'text-foreground/70'
                                      }`}>
                                        <DollarSign size={14} />{item.price.toLocaleString()}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Next Button */}
                  <div className="hidden md:flex justify-end pt-6 border-t border-white/10">
                    <Button onClick={nextStep} disabled={selectedItems.length === 0} className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold group">
                      Continue to Details <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Lead Info & Timeline */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <h3 className="text-2xl font-bold mb-8">Project Timeline & Details</h3>
                  
                  <div className="space-y-8 flex-1 mb-24 md:mb-8 overflow-y-auto pr-2 custom-scrollbar">
                    
                    {/* Timeline Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">Desired Timeline</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { id: 'Standard', label: 'Standard', desc: 'Normal pacing', icon: <Clock size={18} />, mult: '+0%' },
                          { id: 'Rush', label: 'Rush', desc: 'Fast-tracked', icon: <Zap size={18} />, mult: '+20%' },
                          { id: 'Critical', label: 'Critical', desc: 'Top priority', icon: <Rocket size={18} />, mult: '+50%' },
                        ].map(t => (
                          <button
                            key={t.id}
                            onClick={() => setTimeline(t.id as any)}
                            className={`p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden ${
                              timeline === t.id 
                                ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,174,239,0.15)]' 
                                : 'border-white/10 bg-white/5 hover:border-primary/50'
                            }`}
                          >
                            {timeline === t.id && <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-xl rounded-full" />}
                            <div className={`mb-2 flex items-center gap-2 ${timeline === t.id ? 'text-primary' : 'text-foreground/70'}`}>
                              {t.icon} <span className="font-bold">{t.label}</span>
                            </div>
                            <div className="text-xs text-foreground/50">{t.desc}</div>
                            <div className={`text-xs font-bold mt-2 ${timeline === t.id ? 'text-primary' : 'text-foreground/40'}`}>{t.mult} Cost</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/10" />

                    {/* Contact Details */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">Your Details</label>
                      <div className="space-y-4">
                        <div>
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Work Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <input 
                            type="text" 
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company / Project Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Nav Buttons */}
                  <div className="hidden md:flex justify-between pt-6 border-t border-white/10">
                    <Button variant="ghost" onClick={prevStep} className="px-6 py-4 rounded-xl">
                      <ArrowLeft className="mr-2" size={18} /> Back
                    </Button>
                    <Button onClick={nextStep} disabled={!email || !name} className="px-8 py-4 rounded-xl font-bold group">
                      Review Proposal <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Review & Submit */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="text-center py-4 mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30 shadow-[0_0_30px_rgba(0,174,239,0.2)]">
                      <Check size={40} className="text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Ready to submit!</h3>
                    <p className="text-foreground/60 text-base">Review your selected services and timeline below.</p>
                  </div>

                  <div className="bg-black/30 rounded-2xl p-6 md:p-8 border border-white/10 mb-8 flex-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px]" />
                    
                    <div className="flex justify-between text-xs font-bold text-foreground/50 border-b border-white/10 pb-4 mb-6 uppercase tracking-widest">
                      <span>Item</span>
                      <span>Est. Price</span>
                    </div>
                    
                    <div className="space-y-5 mb-8 relative z-10">
                      {selectedItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start group">
                          <span className="text-sm font-medium pr-4 text-foreground/90">{item.name}</span>
                          <span className="text-sm font-mono text-foreground/60 shrink-0 group-hover:text-primary transition-colors">${item.price.toLocaleString()}</span>
                        </div>
                      ))}
                      
                      {/* Timeline Multiplier Row */}
                      {timeline !== 'Standard' && (
                        <div className="flex justify-between items-start pt-4 border-t border-white/5 border-dashed">
                          <span className="text-sm font-medium text-accent flex items-center gap-2">
                            {timeline === 'Rush' ? <Zap size={14} /> : <Rocket size={14} />} 
                            {timeline} Timeline Priority
                          </span>
                          <span className="text-sm font-mono text-accent shrink-0">
                            +{(totalEstimate - baseEstimate).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-white/20 relative z-10 gap-2">
                      <span className="font-bold text-lg uppercase tracking-wider text-foreground/80">Estimated Total</span>
                      <span className="text-3xl md:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">${totalEstimate.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 relative z-10">
                    <Button variant="primary" size="lg" className="w-full text-lg font-bold py-5 shadow-[0_0_30px_rgba(0,174,239,0.3)] hover:shadow-[0_0_40px_rgba(0,174,239,0.5)]">
                      Send Proposal Request
                    </Button>
                    <Button variant="ghost" onClick={prevStep} className="w-full py-4 text-foreground/60 hover:text-foreground">
                      <ArrowLeft className="mr-2" size={16} /> Edit Details
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Column (Live Summary Sticky Bar) - Only visible on desktop steps 1 & 2 */}
          <div className={`w-full md:w-80 bg-black/60 border-l border-white/10 p-8 flex flex-col backdrop-blur-3xl ${step === 3 ? 'hidden md:flex opacity-50 pointer-events-none grayscale' : 'hidden md:flex'}`}>
            <h4 className="font-bold text-lg mb-8 flex items-center gap-2 uppercase tracking-wider text-primary">
              Your Scope
            </h4>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              {selectedItems.length === 0 ? (
                <div className="text-sm text-foreground/40 text-center py-10 italic border border-dashed border-white/10 rounded-xl">
                  No items selected yet. Choose services from the list to build your scope.
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedItems.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-between items-start text-sm group"
                    >
                      <span className="text-foreground/80 truncate pr-2 font-medium">{item.name}</span>
                      <button 
                        onClick={() => toggleItem(item)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-1 bg-red-400/10 rounded-md shrink-0 mt-0.5"
                      >
                        <Minus size={12} />
                      </button>
                    </motion.div>
                  ))}
                  
                  {timeline !== 'Standard' && selectedItems.length > 0 && (
                     <motion.div 
                       initial={{ opacity: 0, x: 10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="flex justify-between items-start text-sm pt-3 mt-3 border-t border-white/10"
                     >
                       <span className="text-accent flex items-center gap-1 font-bold">
                         <Zap size={14} /> {timeline} Pace
                       </span>
                     </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Total Estimate</div>
              <div className="text-4xl font-mono font-black text-white tracking-tight">
                ${totalEstimate.toLocaleString()}
              </div>
              <p className="text-[10px] text-foreground/40 mt-3 leading-relaxed uppercase">
                *Preliminary estimate only. Final pricing may vary.
              </p>
            </div>
          </div>

          {/* Mobile Bottom Sticky Bar (Visible on mobile for steps 1 & 2) */}
          {step < 3 && (
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/20 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Total Estimate</div>
                  <div className="text-xl font-mono font-bold text-white">${totalEstimate.toLocaleString()}</div>
                </div>
                <div className="text-xs text-primary font-bold">
                  {selectedItems.length} {selectedItems.length === 1 ? 'Item' : 'Items'} Selected
                </div>
              </div>
              
              {step === 1 ? (
                <Button onClick={nextStep} disabled={selectedItems.length === 0} className="w-full py-4 text-base font-bold shadow-[0_0_15px_rgba(0,174,239,0.3)]">
                  Continue to Details <ArrowRight className="ml-2" size={18} />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={prevStep} className="px-4 py-4 shrink-0 bg-white/5 border border-white/10">
                    <ArrowLeft size={18} />
                  </Button>
                  <Button onClick={nextStep} disabled={!email || !name} className="flex-1 py-4 text-base font-bold shadow-[0_0_15px_rgba(0,174,239,0.3)]">
                    Review Proposal
                  </Button>
                </div>
              )}
            </div>
          )}

        </Card>
      </div>
    </section>
  );
};
