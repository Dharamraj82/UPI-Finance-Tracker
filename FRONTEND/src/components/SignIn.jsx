import React from "react";
import {
  ShieldCheck,
  Sparkles,
  BarChart3,
  Cloud,
  ArrowRight,
} from "lucide-react";

export default function SignIn() {
  const features = [
    { text: "Save unlimited financial reports" },
    { text: "Track budgets & savings goals" },
    { text: "Export data to PDF & CSV" },
    { text: "Seamless multi-device syncing" },
    { text: "Priority customer support" },
  ];

  return (
    <section
      id="sign-in"
      className="max-w-[84rem] mx-auto px-4 sm:px-6 md:px-8 py-20 scroll-mt-10 w-full"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 backdrop-blur-3xl border-2 border-zinc-50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <div className="relative z-10 p-12 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Your Financial Journey Doesn't End Today
          </h2>

          <p className="mt-4 max-w-4xl mx-auto text-zinc-100 text-lg leading-8 font-medium">
            Guest mode gives you instant analysis without saving data. Create a
            free account to safely unlock personalized AI insights, historical
            reports, and long-term financial tracking.
          </p>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2  items-stretch">
          {/* Left Side */}
          <div className="p-6 sm:p-10 flex flex-col h-full relative group/left">
            <div className="absolute inset-0  pointer-events-none opacity-0 group-hover/left:opacity-100 transition-opacity duration-700"></div>
            
            <h3 className="text-2xl font-bold tracking-tight text-zinc-100 mb-6 relative z-10 shrink-0">
              Everything You Unlock
            </h3>

            <div className="p-6 sm:p-8 w-full h-full rounded-[2rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-white/10 shadow-2xl relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                {/* Item 1 */}
                <div className="flex gap-4 group/item">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                    <Cloud className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover/item:text-blue-300 transition-colors">
                      Secure Cloud History
                    </h4>
                    <p className="text-zinc-400 mt-1 font-medium text-sm leading-relaxed group-hover/item:text-zinc-300 transition-colors">
                      Never lose your reports. Access them anytime from anywhere.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4 group/item">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                    <BarChart3 className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover/item:text-indigo-300 transition-colors">
                      Monthly & Yearly Comparison
                    </h4>
                    <p className="text-zinc-400 mt-1 font-medium text-sm leading-relaxed group-hover/item:text-zinc-300 transition-colors">
                      Understand how your spending changes over time.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-4 group/item">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                    <Sparkles className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover/item:text-purple-300 transition-colors">
                      Personalized AI Insights
                    </h4>
                    <p className="text-zinc-400 mt-1 font-medium text-sm leading-relaxed group-hover/item:text-zinc-300 transition-colors">
                      AI learns from your previous reports to deliver better financial recommendations.
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-4 group/item">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover/item:text-emerald-300 transition-colors">
                      Bank-Grade Security
                    </h4>
                    <p className="text-zinc-400 mt-1 font-medium text-sm leading-relaxed group-hover/item:text-zinc-300 transition-colors">
                      Your data is encrypted and private. We never sell your information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-6 sm:p-10 flex flex-col h-full relative group/right">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/right:opacity-100 transition-opacity duration-700"></div>

            <h3 className="text-2xl font-bold tracking-tight text-zinc-100 mb-6 relative z-10 shrink-0">
              Included With Your Account
            </h3>

            <div className="p-6 sm:p-8 w-full h-full rounded-[2rem] bg-gradient-to-bl from-purple-950 via-slate-900 to-pink-950 border border-white/10 shadow-2xl relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="space-y-4 relative z-10">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item cursor-default p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                      <ShieldCheck className="w-4 h-4 text-fuchsia-300" />
                    </div>
                    <span className="text-zinc-300 font-medium text-sm group-hover/item:text-white transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-col p-2 pb-5">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-auth"))}
            className=" group px-8 py-4 flex-0 bg-white border border-black text-black font-medium text-sm rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-xl"
          >
            Create Free Account
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="mt-6 text-center text-xs text-zinc-900 font-medium">
            Continue using guest mode anytime without storing your data.
          </p>
        </div>

      </div>
    </section>
  );
}

{/* Re-trigger Vite Build */}
