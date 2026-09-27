import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

export const TeamSection = () => {
  const { content } = useContent();
  const team = content.team;

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-background">
      
      {/* Background Orbs for Glassmorphism */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Experts</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 text-lg leading-relaxed"
          >
            We are a collective of designers, engineers, and growth hackers united by a single obsession: building digital excellence.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group relative"
            >
              <div className="glass rounded-3xl p-6 border border-white/40 shadow-xl overflow-hidden relative flex flex-col h-full hover:border-primary/50 transition-colors duration-500">
                
                {/* Image Container with inner shadow */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Hover Social Links */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a href={member.socials.linkedin} className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <FaLinkedin size={18} />
                    </a>
                    <a href={member.socials.twitter} className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <FaTwitter size={18} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm font-semibold text-accent mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-foreground/60 text-sm leading-relaxed mt-auto">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
