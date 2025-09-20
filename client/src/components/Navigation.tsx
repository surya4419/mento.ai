import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Video, 
  BarChart3, 
  Settings,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Learn', href: '/session', icon: GraduationCap },
  { name: 'Progress', href: '/dashboard', icon: BarChart3 },
  { name: 'Library', href: '/library', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  // Handle navigation with error clearing
  const handleNavigation = (path: string) => {
    try {
      // Clear any existing errors when navigating
      if (typeof window !== 'undefined' && window.location.pathname !== path) {
        // Small delay to ensure smooth navigation
        setTimeout(() => {
          navigate(path);
        }, 100);
      } else {
        navigate(path);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to direct navigation
      window.location.href = path;
    }
  };

  // No redirect needed; '/session' is the correct route

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50">
      <nav className={`max-w-4xl mx-auto px-6 py-3 rounded-2xl transition-all duration-300 mx-4 md:mx-auto ${
        isScrolled
          ? 'bg-gradient-to-br from-zeo-primary to-zeo-secondary/90 shadow-lg'
          : 'bg-gradient-to-br from-zeo-primary to-zeo-secondary'
      }`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/mento.png" 
              alt="mento.ai Logo" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 rounded-full px-2 py-1 relative">
            {/* Animated glass rectangle for active nav item only */}
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <div key={item.name} className="relative flex items-center" style={{ minWidth: 120, justifyContent: 'center' }}>
                  {active && (
                    <motion.div
                      className="absolute inset-0 rounded-full glass-strong -z-10"
                      layoutId="activeNavGlassBar"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={
                      `flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 z-10 text-white/90 hover:bg-white/20 hover:text-white relative`
                    }
                    style={{ minWidth: 120, justifyContent: 'center' }}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Get Started Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-white text-foreground hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-medium flex items-center"
              onClick={() => handleNavigation('/session')}
            >
              Start
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-white/90 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden mt-4 bg-gradient-to-br from-zeo-primary to-zeo-secondary/90 rounded-2xl p-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavigation(item.href);
                    setIsOpen(false);
                  }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-white/90 hover:bg-white/15 relative overflow-hidden ${
                    isActive(item.href) ? 'glass-strong' : ''
                  }`}
                  style={{transition: 'background 0.3s'}}
                >
                  <AnimatePresence>
                    {isActive(item.href) && (
                      <motion.div 
                        className="absolute inset-0 glass-strong rounded-lg -z-10"
                        layoutId="activeNavGlassMobile"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}
                  </AnimatePresence>
                  {item.name}
                </button>
              ))}
              <Button 
                className="w-full mt-2 bg-white text-foreground hover:bg-gray-100 rounded-lg py-3 font-medium flex items-center justify-center"
                onClick={() => {
                  handleNavigation('/session');
                  setIsOpen(false);
                }}
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}