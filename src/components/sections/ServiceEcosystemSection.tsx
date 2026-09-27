import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Check, Globe, ArrowRight, ShieldCheck, Zap, Smartphone } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  identity: <ShieldCheck size={32} />,
  presence: <Globe size={32} />,
  growth: <Zap size={32} />,
  efficiency: <Smartphone size={32} />,
};

const images: Record<string, string> = {
  identity: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  presence: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
  growth: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  efficiency: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
};

export const ServiceEcosystemSection = () => {
  const { content } = useContent();
  const servicesData = content.services;
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Complete Service Ecosystem
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 max-w-2xl mx-auto text-lg"
          >
            Our four pillars of digital dominance. Tailored solutions that work together seamlessly to scale your brand.
          </motion.p>
        </div>

        {/* Horizontal Accordion Layout */}
        <div className="flex flex-col lg:flex-row h-[800px] lg:h-[600px] gap-4 w-full">
          {servicesData.map((service) => {
            const isActive = activeTab === service.id;

            return (
              <motion.div
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                layout
                initial={false}
                animate={{
                  flex: isActive ? (window.innerWidth > 1024 ? 4 : 4) : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer group flex flex-col lg:flex-row border ${
                  isActive ? 'border-primary/50' : 'border-border/50 hover:border-primary/30'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--color-surface)' : 'var(--color-background)',
                }}
              >
                {/* Background Image (visible when active) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0 hidden lg:block"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent z-10" />
                      <img src={images[service.id]} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Vertical Icon/Title (visible when inactive on Desktop) */}
                <div className={`p-6 flex lg:flex-col items-center justify-between lg:justify-center gap-4 z-20 ${isActive ? 'lg:w-[15%] shrink-0' : 'w-full h-full'}`}>
                  <div className={`p-4 rounded-2xl transition-colors duration-500 ${
                    isActive ? 'bg-primary text-white shadow-[0_0_20px_rgba(0,174,239,0.3)]' : 'bg-surface-hover text-primary group-hover:bg-primary/20'
                  }`}>
                    {iconMap[service.id]}
                  </div>
                  
                  {/* Rotated text for desktop inactive state */}
                  {!isActive && (
                    <div className="hidden lg:block whitespace-nowrap -rotate-90 origin-center text-xl font-bold tracking-wider mt-24 text-foreground/50 group-hover:text-foreground transition-colors">
                      {service.title}
                    </div>
                  )}

                  {/* Normal text for mobile inactive state */}
                  {!isActive && (
                    <div className="lg:hidden text-xl font-bold text-foreground/80 flex-1">
                      {service.title}
                    </div>
                  )}
                </div>

                {/* Main Content (visible when active) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="p-8 lg:p-12 z-20 flex-1 flex flex-col justify-center h-full"
                    >
                      <div className="lg:hidden w-full h-48 rounded-xl overflow-hidden mb-6 relative">
                         <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
                         <img src={images[service.id]} alt="" className="w-full h-full object-cover" />
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h3>
                      <p className="text-foreground/70 text-lg mb-8 max-w-xl leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {service.features.map((feature, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (idx * 0.1) }}
                            key={idx} 
                            className="flex items-center gap-3 bg-background/50 backdrop-blur-sm p-3 rounded-xl border border-border/50"
                          >
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                              <Check size={14} className="text-primary" strokeWidth={3} />
                            </div>
                            <span className="font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.6 }}
                      >
                        <button className="group flex items-center gap-2 font-bold text-primary hover:text-white transition-colors">
                          Explore {service.title} capabilities
                          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
