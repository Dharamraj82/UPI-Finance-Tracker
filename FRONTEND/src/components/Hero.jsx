import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import PrivacyBadge from "./PrivacyBadge";
export default function Hero() {
  return (
    <div className="pt-32 pb-20 text-center max-w-[84rem] mx-auto px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] text-glow">
          UPI Transaction Reports <br className="hidden md:block" />
          That Actually Make Sense.
        </h1>

        <p className="text-lg md:text-xl text-slate-800 mb-8 max-w-3xl mx-auto leading-relaxed font-semibold">
          Upload your UPI or bank statement and get a complete financial report
          with spending insights, charts, category analysis, and AI-powered
          recommendations.
        </p>

        <PrivacyBadge />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary */}
          <a
            href="/platform"
            className="
      group
      relative
      overflow-hidden
      px-8
      py-3.5
      bg-white
      border
      border-neutral-300
      text-neutral-900
      font-medium
      text-sm
      rounded-full
      transition-all
      duration-300
      hover:border-neutral-900
      hover:-translate-y-[1px]
      active:translate-y-0
      active:scale-[0.98]
    "
          >
            {/* Light sweep */}
            <span
              className="
        absolute
        inset-y-0
        -left-1/2
        w-1/3
        -skew-x-12
        bg-white/70
        opacity-0
        group-hover:opacity-100
        group-hover:left-[130%]
        transition-all
        duration-700
      "
            />

            <span className="relative z-10">Explore Platform</span>
          </a>

          {/* Secondary */}
          <a
            href="/#sign-in"
            className="
      group
      px-8
      py-3.5
      bg-black
      border
      border-black
      text-white
      font-medium
      text-sm
      rounded-full
      transition-all
      duration-300
      hover:bg-neutral-900
      hover:-translate-y-[1px]
      active:translate-y-0
      active:scale-[0.98]
      cursor-pointer
    "
          >
            <span className="flex items-center gap-2">
              Sign In
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
