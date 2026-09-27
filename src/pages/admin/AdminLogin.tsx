import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK LOGIN: In a real app, this would authenticate against an API.
    if (email && password) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md glass rounded-3xl p-8 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[40px] rounded-full pointer-events-none" />
      
      <div className="text-center mb-8 relative z-10">
        <img src="/Update Key Logo.svg" alt="Logo" className="h-10 mx-auto mb-6" />
        <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome Back</h1>
        <p className="text-foreground/60 text-sm">Sign in to the Admin OS to manage your ecosystem.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5 relative z-10">
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground/80 pl-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border/50 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="admin@updatekey.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between pl-1">
            <label className="text-sm font-medium text-foreground/80">Password</label>
            <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot?</a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border/50 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full h-12 mt-4 rounded-xl font-bold group">
          Sign In
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
        </Button>
      </form>
    </motion.div>
  );
};
