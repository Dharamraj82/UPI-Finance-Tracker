import React, { useState } from "react";
import {
  BarChart3,
  FileSpreadsheet,
  Lock,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import HorizontalPlatformHeroSection from "../../components/HorizontalPlatformHeroSection";
import PlatformSelector from "../../components/PlatformSelector";

export default function Platforms() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-slate-50">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-100 via-sky-100 to-sky-100 blur-[120px] pointer-events-none"></div>

      {/* Main Content */}
      <div className="w-full relative z-10 flex flex-col items-center pt-20 pb-12 px-4 sm:px-6">
        
        {!isUploading && (
          <div className="w-full max-w-[84rem] mx-auto transition-all duration-500">
            <HorizontalPlatformHeroSection />
          </div>
        )}
        
        {/* Platform Selection & Upload Area */}
        <motion.div 
          layout
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`w-full max-w-[84rem] mx-auto ${isUploading ? 'mt-4 sm:mt-12' : 'mt-12 sm:mt-24'}`}
        >
          <PlatformSelector onUploadStateChange={setIsUploading} />
        </motion.div>
      </div>
    </div>
  );
}
