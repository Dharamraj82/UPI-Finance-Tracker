import React from "react";
import {
  FileSpreadsheet,
  Upload,
  BarChart3
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileSpreadsheet,
    title: "Download Your Statement",
    description:
      "Export your transaction statement from PhonePe, Google Pay, Paytm, BHIM, Amazon Pay, or your bank in CSV or PDF format.",
    badge: "CSV • PDF",
  },
  {
    number: "02",
    icon: Upload,
    title: "Upload Securely",
    description:
      "Drag and drop your statement. Your data is processed only for the current session and is never stored unless you create an account.",
    badge: "Session Only",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Explore Your Report",
    description:
      "Get spending insights, merchant analysis, category breakdowns, recurring payments, use our statement tracker, and downloadable reports in seconds.",
    badge: "Charts • Tracker • Export",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full max-w-[84rem] mx-auto px-4 sm:px-6 md:px-8 py-20 scroll-mt-28 relative overflow-hidden"
    >
      {/* Subtle background glow for the whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          How It Works
        </h2>
        <p className="mt-5 text-neutral-600 text-lg leading-8 font-medium">
          Three Steps. Complete Financial Insights.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div 
              key={step.number} 
              className="w-full group relative border-[1px] border-zinc-300 bg-white/50 backdrop-blur-3xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500 flex flex-col justify-between overflow-hidden"
            >
                {/* Subtle background glow inside the card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />

                <div className="relative z-10">
                  <p className="text-7xl font-black text-slate-900/5 mb-4 group-hover:text-sky-500 transition-colors duration-500">
                    {step.number}
                  </p>

                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-slate-100 ">
                    <Icon className="w-6 h-6 text-zinc-950" />
                  </div>

                  <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-700">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-zinc-500 leading-relaxed font-medium text-sm">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10 mt-8 inline-flex bg-white/80 backdrop-blur text-slate-700 border border-zinc-200 px-4 py-2 rounded-full text-xs font-bold tracking-wide self-start shadow-sm">
                  {step.badge}
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
}