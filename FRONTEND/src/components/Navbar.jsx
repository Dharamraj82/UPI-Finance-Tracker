import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/UPI-Finance-Tracker-logo.webp';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'About Us', href: '/#about-us' },
    { name: 'Docs', href: '/docs', target: '_blank' },
    { name: 'Report Bugs & Vulnerabilities', href: '/#report' }
  ];

  return (
    <nav className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 flex justify-center">
      <div className="max-w-[84rem] w-full flex flex-col">
        {/* Main Navbar Bar - Uniform Height & Style across Big and Small Screens */}
        <div className="w-full rounded-full bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.08)] flex items-center justify-between px-3 sm:px-5 py-2 h-14">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="h-9 w-48 sm:h-10 sm:w-56 relative flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm border-[1px] border-gray-200 shrink-0">
              <img
                src={logo}
                alt="UPI Finance Tracker"
                className="absolute w-[250px] h-[166px] sm:w-[300px] sm:h-[200px] max-w-none object-contain"
              />
            </div>
          </Link>

          {/* Desktop Links - Gray Text (gray-950) + Google Dark Multi-Color Text Gradient on Hover (Blue, Red, Yellow, Green) */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                target={item.target} 
                onClick={() => {
                  if (item.name === 'Report Bugs & Vulnerabilities') {
                    window.dispatchEvent(new CustomEvent('report-bug'));
                  }
                }}
                className="text-gray-950 rounded-full hover:text-zinc-50 hover:bg-zinc-950 hover:px-2.5 hover:py-1 transition-all duration-300 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions & Single Sign In Button */}
          <div className="flex items-center space-x-2">
            {/* The ONLY Sign In Button - Now Premium Golden with Shine */}
            <Link 
              to="/#sign-in"
              className="glass-shine-btn group flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-950 font-bold hover:from-amber-300 hover:to-yellow-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] border border-amber-300/50 transition-all text-xs sm:text-sm cursor-pointer"
            >
              <span>Sign In</span>
              <ArrowUpRight className="w-4 h-4 text-yellow-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            {/* Mobile Menu Toggle - Bold Red Icon/Text Only, No BG, 100% Circle */}
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex lg:hidden items-center justify-center w-10 h-10 rounded-full transition-colors cursor-pointer ${mobileMenuOpen ? "bg-transparent text-red-600 hover:text-red-700" : "bg-white/20 text-gray-700 hover:bg-white/40"}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-red-300 stroke-[2]" />
              ) : (
                <Menu className="w-5 h-5 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu - Matches Gray Text (gray-700) & Blue/Red/Yellow/Green Text Gradient Hover */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl flex flex-col space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                target={item.target} 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.name === 'Report Bugs & Vulnerabilities') {
                    window.dispatchEvent(new CustomEvent('report-bug'));
                  }
                }}
                className="text-gray-950 rounded-full hover:text-zinc-50 px-3 py-2 hover:bg-zinc-950 hover:px-3.5 hover:py-2.5 transition-all duration-300 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
