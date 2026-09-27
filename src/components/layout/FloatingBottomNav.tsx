import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, Phone, Tag, User } from 'lucide-react';
import { cn } from '../ui/Button';

const TABS = [
  { id: 'home', label: 'Home', icon: Home, href: '#' },
  { id: 'sectors', label: 'Ecosystem', icon: LayoutGrid, href: '#sectors' },
  { id: 'action', label: 'Book', icon: Phone, href: '#onboarding' },
  { id: 'pricing', label: 'Pricing', icon: Tag, href: '#pricing' },
  { id: 'profile', label: 'Profile', icon: User, href: '#profile' },
];

export const FloatingBottomNav = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  // Sync active tab based on hash for simple deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#';
      const found = TABS.find(t => t.href === hash);
      if (found) setActiveTab(found.id);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[400px]">
      <div className="flex items-center justify-between px-2 py-2 glass rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/60">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isCenter = tab.id === 'action';
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.href) window.location.hash = tab.href;
              }}
              className="relative flex flex-col items-center justify-center w-[60px] h-[56px] rounded-full"
            >
              {isActive && !isCenter && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-primary/15 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              
              {isCenter ? (
                <div className="absolute -top-6 flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-primary to-accent text-white rounded-full shadow-[0_8px_20px_var(--color-primary)] active:scale-95 transition-all">
                  <tab.icon size={24} fill="currentColor" />
                </div>
              ) : (
                <div className={cn(
                  "relative z-10 flex flex-col items-center gap-1 transition-colors duration-300",
                  isActive ? "text-primary" : "text-foreground/50 hover:text-foreground/80"
                )}>
                  <motion.div
                    animate={{ y: isActive ? -2 : 0, scale: isActive ? 1.05 : 1 }}
                  >
                    <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                  <span className={cn(
                    "text-[9px] font-bold tracking-wide transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0"
                  )}>
                    {tab.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
