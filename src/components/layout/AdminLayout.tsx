import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Bell, FileText } from 'lucide-react';
import { cn } from '../ui/Button';
import { motion } from 'framer-motion';

export const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Content CMS', href: '/admin/content', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // We don't want the admin sidebar to show up on the login page
  if (location.pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-primary/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] bg-accent/30 blur-[150px] rounded-full" />
        </div>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/30 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[150px] rounded-full opacity-50" />
      </div>

      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-72 h-screen glass border-r border-border/50 shadow-xl fixed z-40 top-0 left-0">
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/Update Key Logo.svg" alt="Update Key" className="h-8 group-hover:scale-105 transition-transform" />
            <span className="font-bold tracking-tight">Admin OS</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-foreground/70 hover:bg-white/50 hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Link to="/admin/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium">
            <LogOut size={20} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-72 flex flex-col min-h-screen z-10 relative pb-24 lg:pb-0">
        
        {/* Topbar */}
        <header className="h-20 glass border-b border-border/50 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight">
              {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/50 transition-colors text-foreground/70">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-white shadow-sm" />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* Trendy Animated Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-6 left-4 right-4 z-50 glass rounded-full p-2 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative flex-1 flex flex-col items-center justify-center py-3 rounded-full transition-colors z-10",
                isActive ? "text-primary" : "text-foreground/50 hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-bubble"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon size={24} className="mb-1" />
              <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
            </Link>
          );
        })}
        {/* Sign Out Button in Bottom Nav */}
        <Link
          to="/admin/login"
          className="relative flex-1 flex flex-col items-center justify-center py-3 rounded-full transition-colors z-10 text-red-400 hover:text-red-500"
        >
          <LogOut size={24} className="mb-1" />
          <span className="text-[10px] font-bold tracking-wide">Sign Out</span>
        </Link>
      </nav>

    </div>
  );
};
