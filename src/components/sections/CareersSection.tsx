import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ArrowRight, MapPin, Briefcase, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export const CareersSection = () => {
  const { content } = useContent();
  const careers = content.careers;

  return (
    <section id="careers" className="py-24 relative overflow-hidden bg-background">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 text-lg leading-relaxed"
          >
            We're always looking for brilliant minds who want to build the future of branding, advertising, and web technology.
          </motion.p>
        </div>

        {/* Careers List */}
        <div className="space-y-4">
          {careers.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 border border-white/20 hover:border-primary/50 transition-all duration-300 group flex flex-col md:flex-row gap-6 justify-between items-start md:items-center cursor-pointer hover:shadow-[0_10px_40px_rgba(0,174,239,0.15)] hover:-translate-y-1">
                
                {/* Job Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{job.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground/60">
                      <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                        <Briefcase size={14} className="text-accent" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                        <MapPin size={14} className="text-primary" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                        <Clock size={14} className="text-foreground/80" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-foreground/60 leading-relaxed max-w-3xl">
                    {job.description}
                  </p>
                </div>

                {/* Apply Button */}
                <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
                  <Button variant="outline" className="w-full md:w-auto rounded-full bg-white/5 border-white/20 hover:bg-primary hover:text-white hover:border-primary group-hover:scale-105 transition-all">
                    Apply Now
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
