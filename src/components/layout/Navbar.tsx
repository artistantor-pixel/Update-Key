import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, cn } from '../ui/Button';
import { FloatingBottomNav } from './FloatingBottomNav';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isScrolled ? "py-0 md:py-4 bg-surface/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-border md:border-none shadow-sm md:shadow-none" : "py-4 md:py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            isScrolled 
              ? "h-16 md:h-16 px-2 md:px-6 md:glass md:rounded-full md:shadow-lg md:border md:border-white/60" 
              : "h-14 md:h-20 bg-transparent px-2 md:px-4 border-transparent rounded-full"
          )}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.img 
                src="/Update Key Logo.svg" 
                alt="Update Key" 
                className="h-7 md:h-9 w-auto"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </Link>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-bold">
              <a href="/#services" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">Services</a>
              <a href="/#case-studies" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">Work</a>
              <a href="/#pricing" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">Pricing</a>
              <Link to="/problem-key" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">Problem Key</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Button */}
              <Button variant="primary" size="sm" className="hidden md:inline-flex rounded-full px-6 font-bold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-transform">
                Book a Call
              </Button>
              {/* Mobile CTA */}
              <a href="#onboarding" className="md:hidden text-xs font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-md active:scale-95 transition-transform">
                Start Now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Trendy Curved Dynamic Bottom Navigation - Mobile Only */}
      <FloatingBottomNav />
    </>
  );
};
