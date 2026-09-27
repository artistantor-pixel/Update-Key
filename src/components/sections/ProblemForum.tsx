import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, CheckCircle2, Search, Plus } from 'lucide-react';
import { useProblems } from '../../context/ProblemContext';
import { Button } from '../ui/Button';
import { SubmitProblemModal } from '../ui/SubmitProblemModal';

export const ProblemForum = () => {
  const { problems } = useProblems();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Web Dev', 'Design', 'Marketing', 'Career'];

  const filteredProblems = problems.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 bg-background relative z-10">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Controls: Search, Filter, Add */}
        <div className="glass rounded-3xl p-4 border border-white/10 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-30 shadow-lg">
          
          <div className="flex-1 w-full relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search for a problem..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:bg-white/10 focus:border-primary/50 transition-all"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white/5 hover:bg-white/10 text-foreground/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Button variant="primary" className="w-full md:w-auto rounded-full shrink-0" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} className="mr-2" /> Ask Problem
          </Button>
        </div>

        {/* Forum List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredProblems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 text-foreground/50 glass rounded-3xl border border-white/10"
              >
                No problems found matching your criteria. Be the first to ask!
              </motion.div>
            ) : (
              filteredProblems.map((problem) => {
                const isExpanded = expandedProblem === problem.id;
                
                return (
                  <motion.div
                    key={problem.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass rounded-2xl border border-white/20 overflow-hidden"
                  >
                    {/* Problem Header / Summary */}
                    <div 
                      onClick={() => setExpandedProblem(isExpanded ? null : problem.id)}
                      className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h3 className="text-xl font-bold">{problem.title}</h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                          problem.status === 'Solved' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-accent/20 text-accent border border-accent/30'
                        }`}>
                          {problem.status}
                        </div>
                      </div>
                      
                      <p className={`text-foreground/70 text-sm leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
                        {problem.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-4 text-xs font-medium text-foreground/50">
                        <span>By {problem.author}</span>
                        <span>•</span>
                        <span>{problem.date}</span>
                        <span>•</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-primary">{problem.category}</span>
                        <div className="ml-auto flex items-center gap-1.5 text-foreground/60">
                          <MessageCircle size={14} />
                          {problem.answers.length} {problem.answers.length === 1 ? 'Answer' : 'Answers'}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Answers Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-white/10 bg-black/20"
                        >
                          <div className="p-6 space-y-6">
                            {problem.answers.length === 0 ? (
                              <div className="text-center text-sm text-foreground/40 py-4">
                                No expert has answered this yet. Check back later!
                              </div>
                            ) : (
                              problem.answers.map(answer => (
                                <div key={answer.id} className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden">
                                  {/* Top Right solved badge on answer */}
                                  <div className="absolute top-0 right-0 bg-primary/20 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl border-b border-l border-primary/20 flex items-center gap-1">
                                    <CheckCircle2 size={10} /> Expert Solution
                                  </div>

                                  <div className="flex items-center gap-3 mb-4">
                                    <img src={answer.avatar} alt={answer.expertName} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                                    <div>
                                      <div className="font-bold text-sm text-primary">{answer.expertName}</div>
                                      <div className="text-xs text-foreground/50">{answer.expertRole} • {answer.date}</div>
                                    </div>
                                  </div>
                                  <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                                    {answer.content}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      <SubmitProblemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
