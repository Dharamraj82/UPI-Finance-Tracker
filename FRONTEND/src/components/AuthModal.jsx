import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login'); // 'login', 'register', or 'verify'
  const navigate = useNavigate();
  const location = useLocation();

  const onClose = () => {
    setIsOpen(false);
    // Reset mode after close animation
    setTimeout(() => setMode('login'), 300);
  };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-auth', handleOpen);
    return () => window.removeEventListener('open-auth', handleOpen);
  }, []);

  // Open modal after 3 seconds if hash is #sign-in
  useEffect(() => {
    if (location.hash === '#sign-in') {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setMode('login');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    onClose();
    navigate('/u/demo_user');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMode('verify');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    onClose();
    navigate('/u/demo_user');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 relative z-10">
            <h2 className="text-3xl font-black text-neutral-900 text-center mb-6 tracking-tight">
              {mode === 'verify' ? 'Verify Email' : 'Welcome'}
            </h2>

            {/* Slider Tabs - Only show if not verifying */}
            {mode !== 'verify' && (
              <div className="relative flex items-center bg-neutral-100 border border-neutral-200 p-1 rounded-full mb-8">
                {/* Active Slider Pill */}
                <motion.div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white border border-neutral-200 rounded-full shadow-sm"
                  animate={{ 
                    left: mode === 'login' ? '4px' : 'calc(50% + 2px)'
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />

                <button 
                  onClick={() => setMode('login')}
                  className={`relative z-10 flex-1 py-2 text-sm font-bold rounded-full transition-colors ${mode === 'login' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'} cursor-pointer`}
                >
                  Sign In
                </button>
                
                <button 
                  onClick={() => setMode('register')}
                  className={`relative z-10 flex-1 py-2 text-sm font-bold rounded-full transition-colors ${mode === 'register' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'} cursor-pointer`}
                >
                  Register
                </button>
              </div>
            )}

            {/* Forms */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                {mode === 'login' && (
                  <motion.div 
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <form className="space-y-4" onSubmit={handleLogin}>
                      <div>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-5 h-5 text-neutral-400" />
                          <input 
                            type="email" 
                            required
                            defaultValue="demo@example.com"
                            placeholder="Email Address" 
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 font-medium transition-all"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="relative flex items-center">
                          <Lock className="absolute left-4 w-5 h-5 text-neutral-400" />
                          <input 
                            type="password" 
                            required
                            defaultValue="password123"
                            placeholder="Password" 
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 font-medium transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <a href="#" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors">Forgot password?</a>
                      </div>

                      <button type="submit" className="w-full mt-6 bg-neutral-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer border border-transparent">
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {mode === 'register' && (
                  <motion.div 
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <form className="space-y-4" onSubmit={handleRegister}>
                      <div>
                        <div className="relative flex items-center">
                          <User className="absolute left-4 w-5 h-5 text-neutral-400" />
                          <input 
                            type="text" 
                            required
                            defaultValue="Demo User"
                            placeholder="Full Name" 
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 font-medium transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-5 h-5 text-neutral-400" />
                          <input 
                            type="email" 
                            required
                            defaultValue="demo@example.com"
                            placeholder="Email Address" 
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 font-medium transition-all"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="relative flex items-center">
                          <Lock className="absolute left-4 w-5 h-5 text-neutral-400" />
                          <input 
                            type="password" 
                            required
                            defaultValue="password123"
                            placeholder="Create Password" 
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 font-medium transition-all"
                          />
                        </div>
                      </div>

                      <button type="submit" className="w-full mt-6 bg-neutral-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer border border-transparent">
                        Create Account
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {mode === 'verify' && (
                  <motion.div 
                    key="verify"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center pt-2"
                  >
                    <div className="w-16 h-16 bg-neutral-100 border border-neutral-200 rounded-full flex items-center justify-center mb-6">
                      <ShieldCheck className="w-8 h-8 text-neutral-800" />
                    </div>
                    
                    <p className="text-neutral-600 text-center text-sm mb-8 leading-relaxed px-4">
                      We've sent a secure verification link to your email. Please check your inbox and click the link to verify your account.
                    </p>

                    <form className="space-y-4 w-full" onSubmit={handleVerify}>
                      <button type="submit" className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer border border-transparent">
                        I've verified my email
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <button type="button" onClick={() => setMode('login')} className="w-full bg-white hover:bg-neutral-50 text-neutral-600 font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center cursor-pointer border border-neutral-200">
                        Back to Sign In
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
