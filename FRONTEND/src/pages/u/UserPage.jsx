import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Activity, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import UserHeader from './UserHeader';

export default function UserPage() {
  const { username } = useParams();

  // Capitalize username for display
  const displayName = username ? username.charAt(0).toUpperCase() + username.slice(1) : 'User';

  return (
    <>
      <UserHeader username={username} />
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
          Welcome, {displayName}!
        </h1>
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 sm:p-12 max-w-2xl w-full shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="w-20 h-20 bg-white shadow-sm border border-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
            <Wallet className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-900 mb-4 relative z-10">In Development Mode</h2>
          <p className="text-amber-800/80 font-medium leading-relaxed mb-10 text-lg max-w-md mx-auto relative z-10">
            Thanks for visiting! The personal dashboard is currently under active development. Please try the public mode for now.
          </p>
          <Link 
            to="/platform" 
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.4)] hover:-translate-y-1 relative z-10 gap-2"
          >
            <span>Go to Public Platforms</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
