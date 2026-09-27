import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from './Button';
import { useProblems } from '../../context/ProblemContext';

interface SubmitProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitProblemModal = ({ isOpen, onClose }: SubmitProblemModalProps) => {
  const { addProblem } = useProblems();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Web Dev' | 'Design' | 'Marketing' | 'Career'>('Web Dev');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !author) return;

    addProblem({
      title,
      description,
      category,
      author
    });

    // Reset form and close
    setTitle('');
    setDescription('');
    setAuthor('');
    setCategory('Web Dev');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass rounded-3xl border border-white/20 shadow-2xl overflow-hidden p-6 md:p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-foreground hover:bg-white hover:text-primary transition-colors"
            >
              <X size={16} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Post a Problem</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Problem Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="Web Dev">Web Development</option>
                  <option value="Design">UI/UX Design</option>
                  <option value="Marketing">Marketing / Ads</option>
                  <option value="Career">Career Advice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Problem Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How do I center a div in Tailwind?"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Details</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide context, what you tried, and what went wrong..."
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full rounded-xl py-3 group">
                  Post to Forum
                  <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
