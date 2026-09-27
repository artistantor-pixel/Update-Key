import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check, ArrowRight, ArrowLeft, Minus, DollarSign, ChevronDown, Clock, Zap, Rocket, Calculator } from 'lucide-react';
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
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase mb-6 shadow-sm"
          >
            <Calculator size={16} />
            Project Calculator
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">Estimate Your Scope</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">Select the specific services you need, choose your timeline, and get an instant transparent estimate for your project.</p>
        </div>

        {/* Step Indicators */}
        <div className="mb-12 flex justify-center items-center gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 shadow-md ${
                step >= i 
                  ? 'bg-primary text-white shadow-primary/30 scale-110' 
                  : 'bg-surface text-foreground/40 border border-border'
              }`}>
                {step > i ? <Check size={20} strokeWidth={3} /> : i}
              </div>
              {i < 3 && <div className={`w-16 md:w-24 h-1 rounded-full transition-all duration-500 ${step > i ? 'bg-primary shadow-[0_0_10px_rgba(0,174,239,0.4)]' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <Card className="p-0 relative overflow-hidden border border-border/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-surface/80 backdrop-blur-2xl flex flex-col md:flex-row min-h-[650px] rounded-3xl">
          
          {/* Left Column (Content area) */}
          <div className="flex-1 p-6 md:p-12 flex flex-col relative bg-gradient-to-br from-surface to-background/50">
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
                  <h3 className="text-3xl font-bold mb-8 text-foreground">What do you need help with?</h3>
                  
                  <div className="flex-1 space-y-4 mb-24 md:mb-8 overflow-y-auto pr-4 custom-scrollbar">
                    {categories.map((cat, idx) => (
                      <div key={idx} className="border border-border rounded-2xl overflow-hidden bg-background shadow-sm transition-all hover:shadow-md">
                        {/* Category Header */}
                        <button 
                          onClick={() => toggleCategory(cat.category)}
                          className={`w-full flex items-center justify-between p-5 transition-colors text-left ${expandedCategory === cat.category ? 'bg-primary/5' : 'hover:bg-surface-hover'}`}
                        >
                          <span className="font-bold text-lg text-foreground">{cat.category}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${expandedCategory === cat.category ? 'bg-primary/20 text-primary rotate-180' : 'bg-surface text-foreground/50 border border-border'}`}>
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
                              className="border-t border-border bg-surface/50"
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
                                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.01]' 
                                          : 'border-border bg-surface hover:border-primary/40 hover:shadow-sm'
                                      }`}
                                    >
                                      <div className="flex items-start gap-4 pr-4">
                                        <div className={`mt-1 w-6 h-6 rounded flex items-center justify-center border shrink-0 transition-all ${
                                          selected ? 'bg-primary border-primary text-white scale-110' : 'border-foreground/20 text-transparent group-hover:border-primary/50'
                                        }`}>
                                          <Check size={16} strokeWidth={4} />
                                        </div>
                                        <div>
                                          <div className={`font-bold text-lg mb-1 transition-colors ${selected ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                                            {item.name}
                                          </div>
                                          <div className="text-sm text-foreground/60 leading-relaxed max-w-sm">{item.description}</div>
                                        </div>
                                      </div>
                                      <div className={`shrink-0 font-mono font-bold text-lg flex items-center gap-1 transition-colors ${
                                        selected ? 'text-primary' : 'text-foreground/70'
                                      }`}>
                                        <DollarSign size={16} />{item.price.toLocaleString()}
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
                  <div className="hidden md:flex justify-end pt-6 border-t border-border mt-auto">
                    <Button onClick={nextStep} disabled={selectedItems.length === 0} className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold group shadow-lg">
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
                  <h3 className="text-3xl font-bold mb-8 text-foreground">Project Timeline & Details</h3>
                  
                  <div className="space-y-10 flex-1 mb-24 md:mb-8 overflow-y-auto pr-4 custom-scrollbar">
                    
                    {/* Timeline Selection */}
                    <div>
                      <label className="block text-sm font-bold text-foreground/80 mb-4 uppercase tracking-widest text-primary">Desired Timeline</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { id: 'Standard', label: 'Standard', desc: 'Normal pacing', icon: <Clock size={20} />, mult: '+0%' },
                          { id: 'Rush', label: 'Rush', desc: 'Fast-tracked', icon: <Zap size={20} />, mult: '+20%' },
                          { id: 'Critical', label: 'Critical', desc: 'Top priority', icon: <Rocket size={20} />, mult: '+50%' },
                        ].map(t => (
                          <button
                            key={t.id}
                            onClick={() => setTimeline(t.id as any)}
                            className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${
                              timeline === t.id 
                                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                                : 'border-border bg-surface hover:border-primary/40 hover:shadow-md'
                            }`}
                          >
                            {timeline === t.id && <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-2xl rounded-full pointer-events-none" />}
                            <div className={`mb-3 flex items-center gap-2 text-lg ${timeline === t.id ? 'text-primary' : 'text-foreground/70 group-hover:text-foreground'}`}>
                              {t.icon} <span className="font-bold">{t.label}</span>
                            </div>
                            <div className="text-sm text-foreground/60 mb-2">{t.desc}</div>
                            <div className={`text-sm font-bold ${timeline === t.id ? 'text-primary' : 'text-foreground/40'}`}>
                              {t.mult} Cost
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full h-px bg-border" />

                    {/* Contact Details */}
                    <div>
                      <label className="block text-sm font-bold text-foreground/80 mb-4 uppercase tracking-widest text-primary">Your Details</label>
                      <div className="space-y-5">
                        <div>
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full bg-background border-2 border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground placeholder:text-foreground/40 shadow-sm"
                          />
                        </div>
                        <div>
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Work Email Address"
                            className="w-full bg-background border-2 border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground placeholder:text-foreground/40 shadow-sm"
                          />
                        </div>
                        <div>
                          <input 
                            type="text" 
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company / Project Name"
                            className="w-full bg-background border-2 border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground placeholder:text-foreground/40 shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Nav Buttons */}
                  <div className="hidden md:flex justify-between pt-6 border-t border-border mt-auto">
                    <Button variant="ghost" onClick={prevStep} className="px-6 py-4 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:text-foreground text-foreground/70">
                      <ArrowLeft className="mr-2" size={18} /> Back
                    </Button>
                    <Button onClick={nextStep} disabled={!email || !name} className="px-8 py-4 rounded-xl font-bold group shadow-lg">
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
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-[0_0_40px_rgba(0,174,239,0.15)] relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
                      <Check size={48} className="text-primary" />
                    </div>
                    <h3 className="text-4xl font-bold mb-3 text-foreground">Ready to launch!</h3>
                    <p className="text-foreground/60 text-lg">Review your selected services and timeline below.</p>
                  </div>

                  <div className="bg-surface rounded-3xl p-8 border border-border mb-8 flex-1 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[60px] pointer-events-none" />
                    
                    <div className="flex justify-between text-xs font-bold text-foreground/40 border-b border-border pb-4 mb-6 uppercase tracking-widest relative z-10">
                      <span>Service Item</span>
                      <span>Est. Investment</span>
                    </div>
                    
                    <div className="space-y-6 mb-10 relative z-10">
                      {selectedItems.map((item, idx) => (
                         <div key={idx} className="flex justify-between items-start group">
                           <span className="text-base font-semibold pr-4 text-foreground/90">{item.name}</span>
                           <span className="text-base font-mono font-bold text-foreground/60 shrink-0 group-hover:text-primary transition-colors">${item.price.toLocaleString()}</span>
                         </div>
                      ))}
                      
                      {/* Timeline Multiplier Row */}
                      {timeline !== 'Standard' && (
                        <div className="flex justify-between items-start pt-6 border-t border-border border-dashed">
                          <span className="text-base font-bold text-accent flex items-center gap-2">
                            {timeline === 'Rush' ? <Zap size={16} /> : <Rocket size={16} />} 
                            {timeline} Timeline Priority
                          </span>
                          <span className="text-base font-mono font-bold text-accent shrink-0 bg-accent/10 px-3 py-1 rounded-lg">
                            +{(totalEstimate - baseEstimate).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t-2 border-border relative z-10 gap-4">
                      <span className="font-bold text-xl uppercase tracking-wider text-foreground/80">Total Estimate</span>
                      <span className="text-4xl md:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">
                        ${totalEstimate.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 relative z-10">
                    <Button variant="primary" size="lg" className="w-full text-xl font-bold py-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
                      Submit Proposal Request
                    </Button>
                    <Button variant="ghost" onClick={prevStep} className="w-full py-4 text-foreground/60 hover:text-foreground font-semibold bg-surface border border-border">
                      <ArrowLeft className="mr-2" size={18} /> Edit Details
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Column (Live Summary Sticky Bar) - Only visible on desktop steps 1 & 2 */}
          <div className={`w-full md:w-96 bg-surface/50 border-l border-border p-8 flex flex-col backdrop-blur-xl ${step === 3 ? 'hidden md:flex opacity-40 pointer-events-none grayscale' : 'hidden md:flex'}`}>
            <h4 className="font-bold text-xl mb-8 flex items-center gap-3 uppercase tracking-widest text-foreground">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <DollarSign size={16} />
              </span>
              Your Scope
            </h4>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
              {selectedItems.length === 0 ? (
                <div className="text-sm text-foreground/40 text-center py-12 px-4 italic border-2 border-dashed border-border rounded-2xl bg-background/50">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-border" />
                  Select services from the left to build your estimate.
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {selectedItems.map((item, idx) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="flex justify-between items-start text-sm group bg-background p-4 rounded-xl border border-border shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-foreground/90 font-semibold pr-2 leading-relaxed">{item.name}</span>
                        <button 
                          onClick={() => toggleItem(item)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 transition-all p-1.5 rounded-md shrink-0 border border-red-100 bg-white"
                        >
                          <Minus size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {timeline !== 'Standard' && selectedItems.length > 0 && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="flex justify-between items-center text-sm p-4 mt-6 border-2 border-accent/20 bg-accent/5 rounded-xl"
                     >
                       <span className="text-accent flex items-center gap-2 font-bold">
                         <Zap size={16} /> {timeline} Pace
                       </span>
                     </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t-2 border-border relative">
              <div className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-3">Total Estimate</div>
              <div className="text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-tighter drop-shadow-sm">
                ${totalEstimate.toLocaleString()}
              </div>
              <p className="text-xs text-foreground/50 mt-4 leading-relaxed bg-background/50 p-3 rounded-lg border border-border inline-block">
                *Preliminary estimate only. Final pricing may vary based on discovery.
              </p>
            </div>
          </div>

          {/* Mobile Bottom Sticky Bar (Visible on mobile for steps 1 & 2) */}
          {step < 3 && (
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-2xl border-t border-border p-5 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-end mb-5">
                <div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-1">Total Estimate</div>
                  <div className="text-2xl font-mono font-black text-primary">${totalEstimate.toLocaleString()}</div>
                </div>
                <div className="text-xs bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-full border border-primary/20">
                  {selectedItems.length} {selectedItems.length === 1 ? 'Item' : 'Items'}
                </div>
              </div>
              
              {step === 1 ? (
                <Button onClick={nextStep} disabled={selectedItems.length === 0} className="w-full py-5 text-base font-bold shadow-lg shadow-primary/20 rounded-xl">
                  Continue to Details <ArrowRight className="ml-2" size={18} />
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={prevStep} className="px-5 py-5 shrink-0 bg-background border-2 border-border rounded-xl text-foreground">
                    <ArrowLeft size={18} />
                  </Button>
                  <Button onClick={nextStep} disabled={!email || !name} className="flex-1 py-5 text-base font-bold shadow-lg shadow-primary/20 rounded-xl">
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
