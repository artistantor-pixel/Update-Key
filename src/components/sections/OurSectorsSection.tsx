import { motion } from 'framer-motion';
import { Newspaper, Smile, Users, ShoppingCart, ArrowUpRight } from 'lucide-react';

import { useContent } from '../../context/ContentContext';

const iconMap: Record<string, any> = {
  Newspaper,
  Smile,
  Users,
  ShoppingCart,
};

export const OurSectorsSection = () => {
  const { content } = useContent();
  const sectors = content.sectors;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Discover Our Ecosystem
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto text-lg md:text-xl font-light">
              Beyond our core services, we're building specialized platforms designed to cater to every aspect of your life.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6">
          {sectors.map((sector, index) => {
            const Icon = iconMap[sector.iconName] || Newspaper;
            return (
              <motion.a
                href={sector.link}
                key={sector.title}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className={`group block relative rounded-[2rem] overflow-hidden bg-surface hover:bg-surface-hover border border-border transition-all duration-500 p-8 shadow-sm hover:shadow-xl ${sector.className}`}
              >
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${sector.bgGlow} blur-3xl`} />
                
                {/* Large faded background icon for visual flair */}
                <Icon className="absolute -bottom-6 -right-6 w-64 h-64 text-foreground/[0.03] group-hover:text-foreground/[0.06] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />

                <div className={`relative z-10 h-full flex flex-col ${sector.horizontal ? 'md:flex-row md:items-center w-full gap-8' : ''}`}>
                  
                  <div className={`${sector.horizontal ? 'md:w-1/2' : 'flex-1'}`}>
                    <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md">
                      <Icon className={`w-7 h-7 text-primary bg-clip-text bg-gradient-to-br ${sector.color}`} />
                    </div>
                    
                    <h3 className={`font-bold text-foreground mb-4 ${sector.large ? 'text-3xl' : 'text-xl'}`}>
                      {sector.title}
                    </h3>
                    
                    <p className={`text-foreground/70 font-light leading-relaxed ${sector.large ? 'text-lg max-w-md' : 'text-sm'}`}>
                      {sector.description}
                    </p>
                  </div>

                  {sector.horizontal && (
                    <div className="hidden md:flex md:w-1/2 justify-end relative">
                       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full animate-pulse opacity-50" />
                       <Icon className={`w-32 h-32 text-primary opacity-20`} />
                    </div>
                  )}

                  {!sector.horizontal && (
                    <div className="mt-auto pt-6 flex justify-between items-end">
                      <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary text-foreground group-hover:text-white transition-all duration-300 shadow-sm">
                        <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  )}

                  {sector.horizontal && (
                     <div className="absolute bottom-8 right-8 md:hidden">
                       <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary text-foreground group-hover:text-white transition-all duration-300 shadow-sm">
                         <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       </div>
                     </div>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

