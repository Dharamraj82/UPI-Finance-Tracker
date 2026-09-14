import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileDown, ChevronLeft, X, PlayCircle, ArrowRight, FileText, CheckCircle2, Loader2, AlertCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

import phonePeLogo from '../assets/brands/phonePay-logo.jpg';
import googlePayLogo from '../assets/brands/googlePay-logo.jpg';
import paytmLogo from '../assets/brands/paytm-logo.jpg';
import amazonPayLogo from '../assets/brands/amzonPay-logo.jpg';
import naviLogo from '../assets/brands/navi-logo.jpg';
import othersLogo from '../assets/brands/othes-upi-logo.png';

const platforms = [
  {
    id: "phonepe",
    name: "PhonePe",
    logo: phonePeLogo,
    instructions: [
      "Open PhonePe and go to History",
      "Tap 'Download Statement' button at the top",
      "Select your date range and tap 'Download'",
    ]
  },
  {
    id: "gpay",
    name: "Google Pay",
    logo: googlePayLogo,
    instructions: [
      "Open Google Pay and scroll down to 'Show transaction history'",
      "Tap the download icon at the top of the screen",
      "Choose your desired format and save",
    ]
  },
  {
    id: "paytm",
    name: "Paytm",
    logo: paytmLogo,
    instructions: [
      "Open Paytm and tap on 'Balance & History'",
      "Scroll down to 'Download Statement'",
      "Select the time period and tap 'Confirm'",
    ]
  },
  {
    id: "amazon",
    name: "Amazon Pay",
    logo: amazonPayLogo,
    instructions: [
      "Open Amazon app, go to Amazon Pay",
      "Tap on 'Your Transactions'",
      "Select 'Download Statement' and choose dates",
    ]
  },
  {
    id: "navi",
    name: "Navi UPI",
    logo: naviLogo,
    instructions: [
      "Navigate to 'Transactions' in the Navi app",
      "Tap the 'Statement' option",
      "Download your statement as a PDF",
    ]
  },
  {
    id: "others",
    name: "Other Banks",
    logo: othersLogo,
    instructions: [
      "Log into your bank's mobile app or net banking",
      "Navigate to the 'Account Statement' section",
      "Download the statement in PDF or CSV format",
    ]
  },
];

export default function PlatformSelector({ onUploadStateChange }) {
  const [uploadPlatform, setUploadPlatform] = useState(null);
  const [instructionsPlatform, setInstructionsPlatform] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();


  const handleBack = () => {
    setUploadPlatform(null);
    setSelectedFile(null);
    setIsAnalyzing(false);
    if (onUploadStateChange) onUploadStateChange(false);
  };
  
  const closeInstructions = () => setInstructionsPlatform(null);

  return (
    <div className="w-full max-w-[84rem] mx-auto py-12 px-4 relative z-20">
      
      {/* ──── Export Guide Modal ──── */}
      <AnimatePresence>
        {instructionsPlatform && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeInstructions}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 12 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-white rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-8 sm:p-10 max-w-lg w-full border-[1px] border-zinc-200 z-10"
            >
              {/* Close */}
              <button onClick={closeInstructions} className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl border border-zinc-200 p-1.5 bg-white shadow-sm flex-shrink-0">
                  <img src={instructionsPlatform.logo} alt={instructionsPlatform.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900">How to export</h3>
                  <p className="text-sm text-zinc-500 font-medium">{instructionsPlatform.name} statement</p>
                </div>
              </div>
              
              {/* CSV Warning */}
              <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 mb-6 flex items-start gap-3 shadow-sm">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 font-medium leading-relaxed">
                  You can download either CSV or PDF format. We <span className="font-bold">highly recommend CSV</span> for 100% accurate analysis.
                </p>
              </div>
              
              {/* Steps */}
              <div className="space-y-6 mb-8">
                {instructionsPlatform.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-sm font-bold border border-zinc-200">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-zinc-600 font-medium leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center gap-3">
                <a 
                  href="#" 
                  className="group relative overflow-hidden w-full sm:w-auto py-3 px-6 bg-white border border-zinc-300 text-zinc-800 font-medium text-sm rounded-full transition-all duration-300 hover:border-zinc-900 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-zinc-100 opacity-0 group-hover:opacity-100 group-hover:left-[130%] transition-all duration-700 z-0" />
                  <PlayCircle className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Watch Tutorial</span>
                </a>
                
                <button 
                  onClick={() => {
                     closeInstructions();
                     setUploadPlatform(instructionsPlatform);
                     if (onUploadStateChange) onUploadStateChange(true);
                  }}
                  className="group w-full sm:w-auto py-3 px-6 bg-zinc-900 border border-zinc-900 text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Now</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ──── Main Content ──── */}
      <AnimatePresence mode="wait">
        {!uploadPlatform ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Section Heading */}
            <div id="platform-selection" className="max-w-3xl mx-auto text-center mb-16 scroll-mt-24">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                Select Your Statement Source
              </h2>
              <p className="mt-5 text-neutral-600 text-lg leading-8 font-medium">
                Choose your payment app to get started with analysis.
              </p>
            </div>
            
            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <div
                  key={platform.id}
                  className="group relative border-[1px] border-zinc-300 bg-white/50 backdrop-blur-3xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500 flex flex-col overflow-hidden"
                >
                  {/* Subtle card glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Ghost step number */}
                    <p className="text-6xl font-black text-slate-900/5 mb-3 group-hover:text-sky-500/60 transition-colors duration-500">
                      0{index + 1}
                    </p>

                    {/* Logo box */}
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-zinc-100 p-2 mb-6">
                      <img src={platform.logo} alt={platform.name} className="w-full h-full object-contain" />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold tracking-tight text-zinc-700">
                      {platform.name}
                    </h3>
                    <p className="mt-1.5 text-zinc-500 text-sm font-medium">
                      Upload & analyze transactions
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="relative z-10 mt-8 flex flex-col gap-2.5">
                    <button 
                      onClick={() => setInstructionsPlatform(platform)}
                      className="group/btn relative overflow-hidden w-full py-3 px-5 bg-white border border-zinc-300 text-zinc-800 font-medium text-sm rounded-full transition-all duration-300 hover:border-zinc-900 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-zinc-100 opacity-0 group-hover/btn:opacity-100 group-hover/btn:left-[130%] transition-all duration-700 z-0" />
                      <FileDown className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">How to export</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setUploadPlatform(platform);
                        if (onUploadStateChange) onUploadStateChange(true);
                      }}
                      className="group/btn w-full py-3 px-5 bg-zinc-900 border border-zinc-900 text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload File</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="border-[1px] border-zinc-300 bg-white/50 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-zinc-100 relative z-10">
              <button 
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-500 hover:text-zinc-900 transition-all mr-2 flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-11 h-11 rounded-xl border border-zinc-200 shadow-sm p-1.5 bg-white flex-shrink-0">
                <img src={uploadPlatform.logo} alt={uploadPlatform.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-800 tracking-tight">Analyze your {uploadPlatform.name} statement</h3>
                <div className="mt-2 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Upload CSV (Highly Recommended) or PDF</span>
                </div>
              </div>
              <button 
                onClick={() => setInstructionsPlatform(uploadPlatform)}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 px-4 py-2 rounded-full hover:border-zinc-900 hover:text-zinc-900 transition-all"
              >
                <FileDown className="w-4 h-4" />
                Need help?
              </button>
            </div>

            {/* Upload Zone */}
            <div className="min-h-[320px] rounded-3xl border-[1.5px] border-dashed border-zinc-300 bg-white/60 flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-50/80 group relative z-10">
              {!selectedFile ? (
                <>
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" 
                    accept=".csv, .pdf, .xls, .xlsx" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                        toast.success("File loaded successfully!", { duration: 3000 });
                      }
                    }}
                  />
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-zinc-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <UploadCloud className="w-7 h-7 text-zinc-700" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-700 mb-1.5">
                    Drop your statement here
                  </h4>
                  <p className="text-zinc-500 mb-6 text-sm font-medium max-w-xs mx-auto">
                    Drag and drop your file, or click to browse.
                  </p>
                  
                  <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-4">
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-300/60 text-amber-900 p-3 rounded-xl shadow-sm text-left">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold">Upload CSV</p>
                        <p className="text-xs opacity-80 font-medium mt-0.5">100% accurate analysis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 text-zinc-500 p-3 rounded-xl text-left">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold">Upload PDF (Fallback)</p>
                        <p className="text-xs opacity-80 font-medium mt-0.5">Experimental, may miss transactions</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : isAnalyzing ? (
                <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in-95 duration-500 py-6">
                  <div className="relative mb-10 flex items-center justify-center">
                    {/* Pulsing rings */}
                    <div className="absolute w-24 h-24 bg-indigo-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute w-32 h-32 bg-sky-500/10 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                    
                    {/* Loader */}
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl border border-indigo-100 flex items-center justify-center relative z-10">
                      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500 mb-3 text-center">
                    Analyzing Statement...
                  </h4>
                  <p className="text-zinc-500 font-medium max-w-md mx-auto leading-relaxed mb-8 text-center text-sm">
                    Our servers are securely processing <span className="text-zinc-800 font-bold">{selectedFile?.name}</span>. We are categorizing your transactions and building your personalized financial dashboard.
                  </p>
                  
                  {/* Tip Box */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100/50 rounded-2xl p-5 w-full max-w-sm flex items-start gap-4 shadow-sm"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-indigo-100/50">
                      <span className="text-lg">💡</span>
                    </div>
                    <div className="text-left relative z-10 pt-0.5">
                      <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-1">Financial Tip</p>
                      <p className="text-sm text-indigo-950/80 font-medium leading-snug">Tracking your daily expenses can save you up to 20% on monthly spending by reducing impulse buys.</p>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 relative">
                    <FileText className="w-10 h-10 text-indigo-500" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-zinc-800 mb-2 truncate max-w-sm">
                    {selectedFile.name}
                  </h4>
                  <p className="text-zinc-500 text-sm font-medium mb-8">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedFile(null)}
                      className="px-6 py-2.5 rounded-full border border-zinc-200 text-zinc-600 font-medium text-sm hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                    >
                      Change File
                    </button>
                    <button 
                      onClick={async () => {
                        if (!selectedFile) return;
                        
                        setIsAnalyzing(true);
                        toast.loading("Uploading and analyzing file, please wait...", { id: "analyze" });
                        
                        try {
                          const formData = new FormData();
                          formData.append("file", selectedFile);
                          formData.append("platform", uploadPlatform.name);
                          
                          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/public/upload`, {
                            method: "POST",
                            body: formData
                          });
                          
                          const data = await response.json();
                          if (data.success && data.sessionId) {
                            toast.dismiss("analyze");
                            toast.success("File processed!");
                            sessionStorage.setItem('active_session', data.sessionId);
                            navigate(`/platform/report/${data.sessionId}`);
                          } else {
                            toast.dismiss("analyze");
                            toast.error(data.message || "Failed to upload file");
                            setIsAnalyzing(false);
                          }
                        } catch (error) {
                          console.error("Upload error:", error);
                          toast.dismiss("analyze");
                          toast.error("Server is not responding. Please ensure the backend is running.");
                          setIsAnalyzing(false);
                        }
                      }}
                      className="group relative overflow-hidden px-8 py-2.5 bg-zinc-900 border border-zinc-900 text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-zinc-700 opacity-0 group-hover:opacity-100 group-hover:left-[130%] transition-all duration-700 z-0" />
                      <span className="relative z-10">Analyze Data</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button 
                onClick={() => setInstructionsPlatform(uploadPlatform)}
                className="mt-6 w-full sm:hidden flex items-center justify-center gap-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 px-4 py-3 rounded-full hover:border-zinc-900 transition-all relative z-10"
              >
                <FileDown className="w-4 h-4" />
                Need help exporting?
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
