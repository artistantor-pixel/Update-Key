import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Global Ambient Background for Glassmorphism */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/40 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/30 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
      
      <Navbar />
      <main className="flex-1 flex flex-col relative z-0 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
