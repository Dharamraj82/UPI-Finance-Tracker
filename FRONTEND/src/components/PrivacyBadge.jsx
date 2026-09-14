import React from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyBadge({
  borderThickness = 3,
  glowIntensity = "12px",
  duration = 6,
}) {
  return (
    <div className="flex justify-center mb-10">
      {/* Outer container adjusting border width dynamically */}
      <div
        className="relative inline-flex items-center rounded-full overflow-hidden"
        style={{ padding: `${borderThickness}px` }}
      >
        {/* Animated Single 80% Beam (288 deg arc = 80%) */}
        <motion.div
          className="absolute inset-[-200%] aspect-square m-auto rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            filter: `drop-shadow(0 0 ${glowIntensity} rgba(10, 132, 255, 0.5))`,
            background: `
              conic-gradient(
                from 0deg,
                #ff3b30 0deg,
                #ff9500 40deg,
                #ffd60a 80deg,
                #30d158 120deg,
                #0a84ff 160deg,
                #5e5ce6 200deg,
                #bf5af2 240deg,
                #ff375f 288deg,
                transparent 288deg,
                transparent 360deg
              )
            `,
          }}
        />

        {/* Inner Content Card (Clips the background conic beam to form a crisp border) */}
        <div className="relative z-10 flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />

          <span className="text-sm text-black">
            <strong>No Login. No Tracking.</strong></span>
        </div>
      </div>
    </div>
  );
}