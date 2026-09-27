import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      
      {/* Premium Glass Container */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="glass rounded-[3rem] p-10 md:p-16 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
          
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 relative z-10">
            
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-6">
              <Link to="/" className="flex items-center gap-2 inline-flex">
                <motion.img 
                  src="/Update Key Logo.svg" 
                  alt="Update Key" 
                  className="h-12 w-auto"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </Link>
              <p className="text-foreground/70 text-base leading-relaxed max-w-sm">
                Stop hiring 5 different agencies. We provide Branding, Ads, Web Development, and AI integrations in one seamless ecosystem.
              </p>
              
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-foreground hover:bg-white hover:text-primary transition-all hover:scale-110 shadow-sm">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-foreground hover:bg-white hover:text-primary transition-all hover:scale-110 shadow-sm">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-foreground hover:bg-white hover:text-primary transition-all hover:scale-110 shadow-sm">
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-bold mb-6 text-foreground text-lg tracking-tight">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium text-foreground/70">
                <li><a href="/#services" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" /> Services</a></li>
                <li><a href="/#case-studies" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" /> Case Studies</a></li>
                <li><a href="/#pricing" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" /> Pricing</a></li>
                <li><Link to="/problem-key" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" /> Problem Key</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" /> Careers</Link></li>
                <li><Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" /> Admin Portal</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h4 className="font-bold mb-6 text-foreground text-lg tracking-tight">Contact</h4>
              <ul className="space-y-5 text-sm font-medium text-foreground/70">
                <li>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-accent transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors flex-shrink-0">
                      <MessageSquare size={14} />
                    </div>
                    <span className="mt-1.5">Chat on WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@updatekey.com" className="flex items-start gap-3 hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors flex-shrink-0">
                      <Mail size={14} />
                    </div>
                    <span className="mt-1.5">hello@updatekey.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter / Audit */}
            <div className="lg:col-span-3">
              <h4 className="font-bold mb-6 text-foreground text-lg tracking-tight">Get a Free Audit</h4>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <p className="text-xs text-foreground/60 mb-2 leading-relaxed">Enter your email and we'll reach out to schedule a free breakdown of your current business ecosystem.</p>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-foreground/40"
                  />
                  <Button variant="primary" className="absolute right-1 top-1 bottom-1 px-4 rounded-lg text-xs font-bold shadow-sm hover:scale-105 transition-transform">
                    Send
                  </Button>
                </div>
              </form>
            </div>

          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/40 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-foreground/50 relative z-10 gap-4 md:gap-0">
            <p>&copy; {new Date().getFullYear()} Update Key. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
