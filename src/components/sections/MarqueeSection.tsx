import { motion } from 'framer-motion';

const clients = [
  "Acme Corp", "Global Tech", "Stark Industries", "Wayne Enterprises", 
  "Umbrella Corp", "Cyberdyne Systems", "Massive Dynamic", "InGen",
  "Acme Corp", "Global Tech", "Stark Industries", "Wayne Enterprises", // Duplicate for infinite scroll
];

export const MarqueeSection = () => {
  return (
    <div className="py-10 border-y border-border bg-surface/30 overflow-hidden flex relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className="flex gap-16 items-center whitespace-nowrap px-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {clients.map((client, idx) => (
          <div key={idx} className="text-xl md:text-3xl font-extrabold text-foreground/20 uppercase tracking-widest hover:text-foreground/40 transition-colors">
            {client}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
