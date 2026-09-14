import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-lg">
        <h1 className="text-8xl font-black text-slate-300 mb-6 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold text-red-600 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8 text-lg font-medium leading-relaxed">
          Oops! It looks like the page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center bg-black border-2 border-black hover:bg-white hover:text-black text-white font-bold px-8 py-4 rounded-full  transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
