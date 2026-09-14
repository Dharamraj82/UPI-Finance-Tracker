import React, { useState, useRef, useEffect } from 'react';
import { Bug, Send, ShieldAlert, Sparkles, HelpCircle, Paperclip, X, FileText, ChevronDown, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [issueType, setIssueType] = useState('general');
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [customSubject, setCustomSubject] = useState('');
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleReportBug = () => {
      setIssueType('bug');
    };
    window.addEventListener('report-bug', handleReportBug);
    return () => window.removeEventListener('report-bug', handleReportBug);
  }, []);

  const themes = {
    bug: {
      badgeBg: 'bg-gradient-to-r from-red-100 to-rose-100 border-red-200 text-red-700',
      badgeIcon: Bug,
      badgeText: 'Issue & Security',
      glow: 'bg-gradient-to-tr from-red-600/15 to-rose-600/15',
      accentRing: 'focus:ring-red-500/40',
      btnBg: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/30 text-white transition-all',
      formBg: 'bg-gradient-to-br from-red-50/80 to-rose-50/80 border border-red-200 shadow-xl shadow-red-900/5',
      inputBg: 'bg-white/90 border-red-200 text-slate-900 focus:border-red-400 placeholder-slate-400',
      labelColor: 'text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-rose-800 font-bold',
      fileDropBg: 'bg-white/50 border-red-200 hover:bg-red-100/50',
    },
    feature: {
      badgeBg: 'bg-gradient-to-r from-green-100 via-yellow-100 to-sky-100 border-sky-200 text-sky-800',
      badgeIcon: Sparkles,
      badgeText: 'Product Feedback',
      glow: 'bg-gradient-to-tr from-green-500/20 via-sky-500/20 to-blue-500/20',
      accentRing: 'focus:ring-sky-500/30',
      btnBg: 'bg-gradient-to-r from-green-500 via-sky-500 to-blue-600 hover:from-green-600 hover:via-sky-600 hover:to-blue-700 shadow-sky-500/30 text-white transition-all',
      formBg: 'bg-gradient-to-br from-green-50/50 via-sky-50/50 to-blue-50/50 border border-sky-200 shadow-xl shadow-sky-900/5',
      inputBg: 'bg-white/90 border-sky-200 text-slate-900 focus:border-sky-400 placeholder-slate-400',
      labelColor: 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-sky-600 to-blue-700 font-bold',
      fileDropBg: 'bg-white/50 border-sky-200 hover:bg-sky-100/50',
    },
    general: {
      badgeBg: 'bg-sky-100 border-sky-200 text-sky-700',
      badgeIcon: HelpCircle,
      badgeText: 'General Support',
      glow: 'bg-sky-500/10',
      accentRing: 'focus:ring-sky-500/30',
      btnBg: 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/30 text-white transition-all',
      formBg: 'bg-sky-50/50 border border-sky-200 shadow-xl shadow-sky-900/5',
      inputBg: 'bg-white border-sky-200 text-slate-900 focus:border-sky-400 placeholder-slate-400',
      labelColor: 'text-sky-900 font-bold',
      fileDropBg: 'bg-white/50 border-sky-200 hover:bg-sky-100/50',
    },
    other: {
      badgeBg: 'bg-slate-200 border-slate-300 text-slate-800',
      badgeIcon: MessageSquare,
      badgeText: 'Custom Subject',
      glow: 'bg-slate-500/10',
      accentRing: 'focus:ring-slate-500/40',
      btnBg: 'bg-slate-900 hover:bg-black shadow-slate-900/30 text-white transition-all',
      formBg: 'bg-slate-50 border border-slate-200 shadow-xl shadow-slate-900/5',
      inputBg: 'bg-white border-slate-300 text-slate-900 focus:border-slate-500 placeholder-slate-400',
      labelColor: 'text-slate-900 font-bold',
      fileDropBg: 'bg-slate-100 border-slate-300 hover:bg-slate-200',
    }
  };

  const options = [
    { id: 'general', label: 'Contact / General Query', icon: HelpCircle, colorClass: 'text-sky-500', hoverBg: 'hover:bg-sky-50', activeBg: 'bg-sky-100/80 text-sky-900' },
    { id: 'feature', label: 'Feature Request', icon: Sparkles, colorClass: 'text-green-500', hoverBg: 'hover:bg-sky-50', activeBg: 'bg-gradient-to-r from-green-50 via-sky-50 to-blue-50 text-sky-900' },
    { id: 'bug', label: 'Bug Report / Vulnerability', icon: Bug, colorClass: 'text-red-600', hoverBg: 'hover:bg-red-50', activeBg: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-900' },
    { id: 'other', label: 'Other', icon: MessageSquare, colorClass: 'text-slate-700', hoverBg: 'hover:bg-slate-200', activeBg: 'bg-slate-200 text-black' },
  ];

  const currentTheme = themes[issueType] || themes.bug;
  const BadgeIcon = currentTheme.badgeIcon;
  const selectedOption = options.find(o => o.id === issueType);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const handleOpenGeneral = () => setIssueType('general');
    window.addEventListener('open-general', handleOpenGeneral);
    return () => window.removeEventListener('open-general', handleOpenGeneral);
  }, []);

  return (
    <section id="contact" className="max-w-[84rem] mx-auto px-4 sm:px-6 md:px-8 py-20 scroll-mt-28 relative">
      <div id="report" className="absolute -top-28" />
      {/* Dynamic Theme Glow in Background */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-4xl h-full max-h-[800px] ${currentTheme.glow} blur-[120px] rounded-full pointer-events-none transition-colors duration-1000 -z-10`}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Left Hero Section */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
            How can we help you today?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed font-medium">
            We're dedicated to providing a secure and seamless experience. Whether you have a brilliant feature idea, need support, or want to report a bug, simply select a topic below and let us know.
          </p>
        </div>

        {/* Form Container */}
        <div className="flex-1 w-full max-w-lg">
          <form className={`${currentTheme.formBg} p-8 sm:p-10 rounded-3xl flex flex-col space-y-6 transition-colors duration-500`}>
            
            {/* Custom Issue Type Dropdown */}
            <div ref={dropdownRef}>
              <label className={`block text-sm mb-2 ${currentTheme.labelColor} transition-colors duration-300`}>Subject / Category</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full flex items-center justify-between ${currentTheme.inputBg} border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 ${currentTheme.accentRing} transition-colors duration-300 font-medium text-left`}
                >
                  <span className="flex items-center gap-3">
                    {selectedOption && <selectedOption.icon className={`w-5 h-5 ${selectedOption.colorClass}`} />}
                    {selectedOption?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setIssueType(option.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${option.hoverBg} ${issueType === option.id ? option.activeBg : 'text-slate-700'}`}
                      >
                        <option.icon className={`w-5 h-5 ${option.colorClass}`} />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Custom Subject Input for 'Other' */}
              {issueType === 'other' && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-1">
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="Please specify your subject..."
                    className={`w-full ${currentTheme.inputBg} border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 ${currentTheme.accentRing} text-sm transition-colors duration-300`}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Optional Email Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm ${currentTheme.labelColor} transition-colors duration-300`}>Your Email</label>
                <span className="text-xs text-slate-400 italic">Optional</span>
              </div>
              <input
                type="email"
                placeholder="you@example.com (for updates on fix)"
                className={`w-full ${currentTheme.inputBg} border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 ${currentTheme.accentRing} text-sm transition-colors duration-300`}
              />
            </div>

            {/* Description Field */}
            <div>
              <label className={`block text-sm mb-2 ${currentTheme.labelColor} transition-colors duration-300`}>Description</label>
              <textarea
                rows={4}
                className={`w-full ${currentTheme.inputBg} border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 ${currentTheme.accentRing} resize-none text-sm transition-colors duration-300`}
                placeholder="Provide step-by-step details..."
              />
            </div>

            {/* Drag & Drop File Upload */}
            <div>
              <label className={`block text-sm mb-2 ${currentTheme.labelColor} transition-colors duration-300`}>Attachment</label>
              {file ? (
                <div className={`flex items-center justify-between ${currentTheme.inputBg} border rounded-xl p-3 text-sm transition-colors duration-300`}>
                  <div className="flex items-center space-x-2 truncate pr-2">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-700 font-medium truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed ${currentTheme.fileDropBg} rounded-xl cursor-pointer transition-all duration-300 group`}>
                  <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    <Paperclip className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <p className="text-xs text-slate-500 text-center">
                      <span className="font-semibold text-slate-700">Click to attach</span> or drag & drop
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, LOG, or PDF (max 10MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className={`mt-2 w-full flex justify-center items-center gap-2 ${currentTheme.btnBg} font-bold py-4 px-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg`}
            >
              <Send className="w-4 h-4" />
              Submit Report
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}