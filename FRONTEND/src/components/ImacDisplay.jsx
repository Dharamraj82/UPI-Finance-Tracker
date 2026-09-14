import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star, Shield, Zap, Lock } from 'lucide-react';

import featureAi from '../assets/features/feature_ai.jpg';
import featureSecure from '../assets/features/feature_secure.jpg';
import featureSync from '../assets/features/feature_sync.jpg';

export default function ImacDisplay() {
  return (
    <div className="w-full max-w-[84rem] mx-auto py-8 sm:py-12 flex flex-col items-center px-2 sm:px-4">
      
      {/* The App Window Wrapper - iMac Bezel Design */}
      <div className="w-full max-w-[84rem] rounded-[2.5rem] border-[8px] sm:border-[16px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] bg-slate-50 overflow-hidden mb-12 flex flex-col">
        
        {/* Fake Window Header (Browser Top Bar) */}
        <div className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 border-b bg-white border-slate-200 shrink-0">
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-rose-400 shadow-inner"></div>
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-400 shadow-inner"></div>
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 shadow-inner"></div>
          <div className="flex-grow flex justify-center px-4">
            <div className="w-full max-w-3xl border border-gray-200 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center justify-center space-x-2 bg-slate-50 text-slate-600 shadow-inner">
              <span className="opacity-70">🔒</span>
              <span className="font-medium tracking-wide">upifinancetracker.app</span>
            </div>
          </div>
        </div>

        {/* The Display Content (Inside the iMac) */}
        {/* Uses aspect-[16/10] to maintain approx 800px height at max width, scaling proportionally */}
        <div className="relative w-full aspect-[16/10] bg-slate-50 px-1 py-1 sm:px-2 sm:py-2 lg:px-2 lg:py-3 flex flex-col overflow-hidden">
          
          <div className="text-center mb-2 sm:mb-3 lg:mb-4 shrink-0 mt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Platform Provides
            </h2>
          </div>

          {/* Force 2x2 grid, auto rows to fill remaining height perfectly */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 flex-grow min-h-0">
            
            {/* Compartment 1 (Hover Card) */}
            <div className="relative bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 w-full h-full">
              <img src={featureAi} alt="AI Analytics" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 lg:p-6 text-center z-10">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-2 lg:mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Zap className="w-5 h-5 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Smart AI Analytics</h3>
                <p className="hidden sm:block text-xs lg:text-base text-indigo-100/80 font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 max-w-sm">Get personalized health scores and deep insights into your spending patterns.</p>
              </div>
            </div>

            {/* Compartment 2 (Hover Card) */}
            <div className="relative bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 w-full h-full">
              <img src={featureSecure} alt="Secure Storage" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 lg:p-6 text-center z-10">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2 lg:mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Lock className="w-5 h-5 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Bank-Grade Security</h3>
                <p className="hidden sm:block text-xs lg:text-base text-emerald-100/80 font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 max-w-sm">Your data is stored with 100% security. We prioritize your privacy above all else.</p>
              </div>
            </div>

            {/* Compartment 3 (Hover Card) */}
            <div className="relative bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 w-full h-full">
              <img src={featureSync} alt="Seamless Sync" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 lg:p-6 text-center z-10">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-2 lg:mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Shield className="w-5 h-5 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Seamless Uploads</h3>
                <p className="hidden sm:block text-xs lg:text-base text-sky-100/80 font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 max-w-sm">Instantly upload and parse your bank CSVs and statements without any hassle.</p>
              </div>
            </div>

            {/* Compartment 4: Compare Free vs Pro */}
            <div className="bg-slate-900 rounded-2xl lg:rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col p-4 sm:p-6 lg:p-8 relative w-full h-full justify-between">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-indigo-500/10 rounded-full blur-2xl sm:blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-amber-500/10 rounded-full blur-2xl sm:blur-3xl" />
              
              <div className="relative z-10 flex-grow flex flex-col min-h-0">
                <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white mb-4 sm:mb-6 tracking-tight shrink-0">Access Level</h3>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-grow relative overflow-y-auto sm:overflow-visible custom-scrollbar">
                  {/* Vertical Divider */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-800 -translate-x-1/2" />

                  {/* Free Tier */}
                  <div className="pr-2 sm:pr-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Guest</span>
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[9px] sm:text-[10px] font-bold">FREE</span>
                    </div>
                    <ul className="text-[10px] sm:text-xs lg:text-sm text-slate-300 space-y-2 sm:space-y-3 font-medium">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">One-time statement analysis</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Basic transaction categorizing</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Limited visual charts</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Standard data processing</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pro Tier */}
                  <div className="pl-2 sm:pl-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest hidden sm:inline">Registered</span>
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <ul className="text-[10px] sm:text-xs lg:text-sm text-slate-300 space-y-2 sm:space-y-3 font-medium">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Compare statements over time</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Advanced AI health insights</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Custom category mapping</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Infinite PDF statement parsing</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">Priority cloud processing</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-4 shrink-0">
                  <Link to="/platform" className="flex-1 py-2 sm:py-3 lg:py-4 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center">
                    Try Free
                  </Link>
                  <Link to="/#sign-in" className="glass-shine-btn flex-1 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-950 font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl hover:from-amber-300 hover:to-yellow-500 transition-colors flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] border border-amber-300/50">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
