import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import logo from '../../assets/UPI-Finance-Tracker-logo.png';

export default function UserHeader({ username }) {
  const displayName = username ? username.charAt(0).toUpperCase() + username.slice(1) : 'User';
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center group cursor-pointer hover:opacity-90 transition-opacity">
        <div className="h-9 w-32 sm:w-40 relative flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm border border-slate-200 shrink-0">
          <img 
            src={logo} 
            alt="UPI Finance Tracker" 
            className="absolute w-[150px] sm:w-[280px] h-[160px] max-w-none object-contain"
          />
        </div>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="text-slate-500 hover:text-indigo-600 transition-colors relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="text-slate-500 hover:text-indigo-600 transition-colors hidden sm:block cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-slate-200/60 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-neutral-900 group-hover:bg-black flex items-center justify-center text-white font-bold text-sm shadow-md transition-colors">
            {displayName.charAt(0)}
          </div>
          <span className="text-sm font-bold text-slate-800 hidden sm:block group-hover:text-black transition-colors">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
}
