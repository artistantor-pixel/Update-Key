import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FolderOpen, Phone, Tag, User } from 'lucide-react';
import { cn } from '../ui/Button';

const TABS = [
  { id: 'services', label: 'Services', icon: Briefcase, href: '#services' },
  { id: 'work', label: 'Work', icon: FolderOpen, href: '#case-studies' },
  { id: 'action', label: 'Book', icon: Phone, href: '#onboarding' },
  { id: 'pricing', label: 'Pricing', icon: Tag, href: '#pricing' },
  { id: 'profile', label: 'Profile', icon: User, href: '#profile' },
];

export const FloatingBottomNav = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with center action active

  // Calculate the X position of the notch (center of the active tab)
  // 5 tabs means each tab is 20% width. Center is at (index * 20) + 10.
  const notchX = (activeIndex * 20) + 10;

  return (
    <div className="md:hidden fixed bottom-6 inset-x-0 mx-auto max-w-[400px] w-[92%] z-50">
      
      {/* Background Container with Dynamic Mask Notch */}
      <div 
        className="absolute inset-0 glass rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-500"
        style={{
          WebkitMaskImage: `radial-gradient(circle at ${notchX}% -12px, transparent 36px, black 37px)`,
          maskImage: `radial-gradient(circle at ${notchX}% -12px, transparent 36px, black 37px)`,
        }}
      />

      {/* Navigation Items */}
      <nav className="relative h-16 flex items-center justify-between px-2">
        {TABS.map((tab, idx) => {
          const isActive = activeIndex === idx;
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveIndex(idx);
                if (tab.href) {
                  window.location.hash = tab.href;
                }
              }}
              className="relative flex-1 h-full flex flex-col items-center justify-center z-10"
            >
              {/* Floating Action Button Bubble (Only visible when active) */}
              <motion.div
                initial={false}
                animate={{
                  y: isActive ? -32 : 0,
                  scale: isActive ? 1.1 : 1,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute flex items-center justify-center w-14 h-14 rounded-full shadow-lg",
                  isActive ? "bg-foreground text-background" : "text-transparent pointer-events-none"
                )}
              >
                <tab.icon size={24} fill={isActive ? "currentColor" : "none"} />
              </motion.div>

              {/* Standard Icon (Visible when inactive) */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 0 : 1,
                  scale: isActive ? 0 : 1,
                  y: isActive ? 20 : 0, // Drop down slightly when fading out
                }}
                transition={{ duration: 0.3 }}
                className="text-foreground/50 mb-1"
              >
                <tab.icon size={20} />
              </motion.div>

              {/* Label */}
              <motion.span
                initial={false}
                animate={{
                  opacity: isActive ? 0 : 1,
                  y: isActive ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-bold tracking-wide text-foreground/50"
              >
                {tab.label}
              </motion.span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
