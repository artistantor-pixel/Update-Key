import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Code, PenTool, TrendingUp, ArrowRight } from 'lucide-react';

const guidelines = [
  {
    title: 'Frontend Developer Roadmap',
    icon: <Code size={24} className="text-primary" />,
    description: 'Master HTML, CSS, JavaScript, and React. Learn how to build responsive, accessible, and performant web applications from scratch.',
    link: '#'
  },
  {
    title: 'UI/UX Design Path',
    icon: <PenTool size={24} className="text-accent" />,
    description: 'From wireframes to high-fidelity prototyping in Figma. Understand user psychology, typography, and modern glassmorphic trends.',
    link: '#'
  },
  {
    title: 'Growth Marketing Guide',
    icon: <TrendingUp size={24} className="text-green-400" />,
    description: 'Learn how to manage $10k+ ad budgets, write converting copy, and analyze Meta Pixel data to maximize ROAS.',
    link: '#'
  }
];

export const CareerGuidelines = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-surface/30">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Career Guidelines & Roadmaps
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 text-lg max-w-2xl mx-auto"
          >
            Not sure where to start? Follow our curated paths to level up your skills and land your dream role in tech or agency work.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidelines.map((guide, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-8 h-full flex flex-col group hover:border-primary/50 transition-colors cursor-pointer bg-white/5">
                <div className="w-12 h-12 rounded-xl bg-background/50 border border-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {guide.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{guide.title}</h3>
                <p className="text-foreground/60 leading-relaxed mb-6 flex-1">
                  {guide.description}
                </p>
                <div className="mt-auto flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  View Roadmap <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
