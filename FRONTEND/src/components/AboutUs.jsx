import React from "react";
import {
  ShieldCheck,
  Lock,
  Cpu,
  BarChart3,
  Database,
  ArrowRight,
  Sparkles,
  Compass,
} from "lucide-react";
import logo from "../assets/UPI-Finance-Tracker-logo.webp";
import aboutImage1 from "../assets/about-image-1.png";
import aboutImage2 from "../assets/about-image-2.jpg";
import ctaBg from "../assets/giphy.gif";

export default function AboutUs() {
  return (
    <div className="w-full relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-200 via-sky-700 to-sky-200 mix-blend-overlay blur-[120px]  -z-10"
      />

      <section
        id="about-us"
        className="max-w-[84rem] mx-auto px-4 sm:px-6 md:px-8 py-20 scroll-mt-28"
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            <img
              src={logo}
              alt="UPI Finance Tracker"
              className="bg-white shrink-0 rounded-full w-[300px] h-[40px] md:w-[400px] md:h-[50px]  object-cover"
            />
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3 md:mt-4 leading-tight text-slate-800">
              Built Around Privacy.
            </h2>
          </div>

          <p className="mt-6 text-lg leading-8 text-slate-700 font-medium">
            UPI Finance Tracker transforms raw transaction statements into
            meaningful financial insights. Upload your CSV or PDF, explore
            interactive reports, and understand where your money goes-without
            connecting your bank account or giving up your privacy.
          </p>
        </div>

        {/* Section 1: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch mt-20 md:mt-32">
          <div className="order-2 lg:order-1 relative rounded-xl overflow-hidden shadow-2xl h-full min-h-[350px] lg:min-h-[400px]">
            <img
              src={aboutImage1}
              alt="Feature Analysis"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6 p-4 sm:p-8 h-full">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Uncover Hidden Spending Patterns
            </h3>
            <p className="text-lg text-slate-200 font-medium leading-relaxed">
              Gain clarity on exactly where your money goes. With intuitive
              visual charts and detailed breakdowns, you can spot unnecessary
              expenses and make smarter financial decisions effortlessly.
            </p>
            <ul className="space-y-4 mt-4">
              <li className="flex items-center gap-4 text-slate-100">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-indigo-300" />
                </div>
                <span className="font-medium text-base">
                  Categorized spending overview
                </span>
              </li>
              <li className="flex items-center gap-4 text-slate-100">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-indigo-300" />
                </div>
                <span className="font-medium text-base">
                  Actionable data visualization
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch mt-12 md:mt-24">
          <div className="order-1 flex flex-col justify-center space-y-6 p-4 sm:p-8 h-full">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Secure AI Financial Advisor
            </h3>
            <p className="text-lg text-slate-200 font-medium leading-relaxed">
              Receive personalized, intelligent recommendations based on your
              historical data. Our AI analyzes your habits to provide tailored
              advice without ever compromising your privacy.
            </p>
            <ul className="space-y-4 mt-4">
              <li className="flex items-center gap-4 text-slate-100">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-sky-300" />
                </div>
                <span className="font-medium text-base">
                  Smart localized AI analysis
                </span>
              </li>
              <li className="flex items-center gap-4 text-slate-100">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-sky-300" />
                </div>
                <span className="font-medium text-base">
                  100% data encryption & privacy
                </span>
              </li>
            </ul>
          </div>
          <div className="order-2 relative rounded-xl overflow-hidden shadow-2xl h-full min-h-[350px] lg:min-h-[400px]">
            <img
              src={aboutImage2}
              alt="Secure AI Insights"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Exploration CTA Section */}
        <div
          className="mt-20 bg-cover bg-center bg-no-repeat rounded-[2.5rem] p-8 sm:p-14 text-center relative overflow-hidden border border-slate-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
          style={{ backgroundImage: `url(${ctaBg})` }}
        >
          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

          {/* Ambient Glow Accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              Explore Your Spending in Seconds.
            </h3>

            <p className="mt-4 text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
              Upload your statement and get interactive charts & smart
              breakdowns instantly. 100% private & zero account required.
            </p>

            <div className="mt-10 flex items-center justify-center">
              <div className="relative inline-flex overflow-hidden rounded-full p-[2px]">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0ea5e9_0%,#3b82f6_20%,#8b5cf6_40%,#ec4899_60%,#f43f5e_80%,#0ea5e9_100%)]" />
                <a
              href="/platform"
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-bold text-slate-950 backdrop-blur-3xl gap-3 transition-colors duration-300 hover:bg-slate-950 hover:text-white"
                >
                  <Compass className="w-5 h-5" />
                  Start Exploring Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
