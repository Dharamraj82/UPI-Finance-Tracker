import React, { useState, useEffect } from 'react';
import { 
  BookOpen, X, ChevronRight, Terminal, Search, Copy, Check, 
  ShieldCheck, Cpu, Database, Zap, Layers, Sparkles, ChevronDown,
  ExternalLink, Info, AlertTriangle, FileCode2
} from 'lucide-react';
import { Link } from 'react-router-dom';



const NAVIGATION_TREE = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { id: 'overview', title: 'System Overview' },
      { id: 'quickstart', title: 'Quick Start Guide', badge: 'v1.1' },
      { id: 'architecture', title: 'Core Architecture' },
    ],
  },
  {
    id: 'data-pipeline',
    title: 'Data Engine & Parsing',
    items: [
      { id: 'upi-parser', title: 'UPI Payload Extraction' },
      { id: 'sanitization', title: 'PII Masking & Privacy' },
      { id: 'categorization', title: 'ML Categorization Pipeline', badge: 'Updated' },
    ],
  },
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    items: [
      { id: 'encryption', title: 'AES-256 Protocol' },
      { id: 'zero-trust', title: 'Zero-Trust Architecture' },
      { id: 'audit-logs', title: 'Immutable Audit Logs' },
    ],
  }
];

export default function AdvancedDocs() {
  const [isReadMode, setIsReadMode] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('v1.1.0-stable');
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Prevent scrolling when Read Mode is active
  useEffect(() => {
    document.body.style.overflow = isReadMode ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReadMode]);

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const sampleCodePayload = `{
  "transaction_id": "UPI-8921094810293",
  "timestamp": "2026-08-04T18:24:37Z",
  "amount": 420.50,
  "currency": "INR",
  "merchant": {
    "vpa": "merchant.pay@okbank",
    "name": "Blue Tokai Coffee",
    "category_code": 5812
  },
  "privacy_flag": "LOCAL_PARSED_ONLY"
}`;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased">
      
      {/* ------------------ READ MODE OVERLAY ------------------ */}
      {isReadMode && (
        <div className="fixed inset-0 z-[100] bg-[#FAF8F5] overflow-y-auto font-serif text-stone-900 transition-all duration-300">
          <div className="max-w-3xl mx-auto px-6 py-16 relative">
            
            <button 
              onClick={() => setIsReadMode(false)}
              className="fixed top-8 right-8 p-3 rounded-full bg-stone-200/60 hover:bg-stone-300 text-stone-700 transition-all z-50 backdrop-blur-md flex items-center gap-2 text-sm font-sans font-medium"
              aria-label="Exit read mode"
            >
              <X className="w-5 h-5" />
              <span>Exit Reader</span>
            </button>

            <article className="prose prose-stone prose-lg sm:prose-xl mx-auto">
              <div className="font-sans text-xs uppercase tracking-widest text-amber-800 font-bold mb-4">
                Documentation Editorial • {selectedVersion}
              </div>
              <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-tight text-stone-900 font-serif">
                The Architecture of Modern UPI Systems
              </h1>
              <p className="text-xl text-stone-600 italic mb-12 font-sans">
                An editorial deep dive into how modern transaction tracking transforms localized raw telemetry into privacy-first telemetry.
              </p>

              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Data Analysis Dashboard" 
                  className="w-full rounded-2xl shadow-xl grayscale contrast-125 object-cover h-[400px]" 
                />
                <figcaption className="text-center text-stone-500 text-sm mt-4 italic font-sans">
                  Fig 1. Visualizing transaction processing flows at scale.
                </figcaption>
              </figure>

              <h2 className="text-3xl font-bold mt-16 mb-6 font-serif text-stone-900">1. Architectural Paradigm</h2>
              <p className="leading-relaxed mb-6 font-sans text-stone-700">
                <span className="text-6xl float-left mr-4 mt-2 font-black text-stone-900 leading-none font-serif">I</span>n contemporary financial technology, real-time transaction telemetry faces two competing pressures: low latency requirements and rigorous privacy compliance. By decentralizing initial parser routines directly to client runtimes, processing overhead on centralized clusters is reduced by up to 74%.
              </p>

              <blockquote className="border-l-4 border-stone-900 pl-6 my-10 italic text-2xl text-stone-800 font-serif font-medium leading-relaxed">
                "Privacy shouldn't be an afterthought patched with policy; it must be an immutable property of the system's runtime physics."
              </blockquote>

              <p className="leading-relaxed mb-6 font-sans text-stone-700">
                Data sanitization occurs before transport layers encrypt payloads with AES-256 key pairs rotated per session.
              </p>
            </article>
          </div>
        </div>
      )}

      {/* ------------------ MAIN DOCUMENTATION LAYOUT ------------------ */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Navigation Tree */}
          <aside className="lg:col-span-3 sticky top-24 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
            
            {/* Version Switcher */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
                Documentation Version
              </label>
              <div className="relative">
                <select 
                  value={selectedVersion} 
                  onChange={(e) => setSelectedVersion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="v1.1.0-stable">v1.1.0 (Current)</option>
                  <option value="v1.0.1" disabled>v1.1.1 (Upcoming)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <hr className="border-slate-100" />

            {/* Categories & Subcategories Tree */}
            <nav className="space-y-6">
              {NAVIGATION_TREE.map((section) => (
                <div key={section.id} className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                              isActive 
                                ? 'bg-indigo-50 text-indigo-700 shadow-sm font-semibold' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold tracking-wide ${
                                isActive ? 'bg-indigo-200/60 text-indigo-800' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* MAIN DOCUMENTATION CONTENT */}
          <main className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 lg:p-12">
            
            {/* Header Meta */}
            <div className="mb-10 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full font-bold text-xs">
                  {selectedVersion}
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-500 text-xs font-medium">Updated 2 days ago</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Architecture & Privacy Protocols
              </h1>
              <p className="text-lg text-slate-600 font-normal leading-relaxed">
                Comprehensive documentation on client-side UPI parsing, local data sanitization, zero-knowledge sync, and real-time intelligence engines.
              </p>
            </div>

            {/* Main Body */}
            <div className="space-y-10 text-slate-600 leading-relaxed font-normal">
              
              {/* Callout Banner */}
              <div className="flex gap-4 p-5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-amber-900 text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 mb-1">Important Migration Notice (v1.1)</h4>
                  <p className="leading-relaxed">
                    Starting in version 1.1, local parser execution requires explicit device key initialization. Ensure you update your implementation if upgrading from legacy v1.0 builds.
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <section id="overview" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-6 h-6 text-indigo-600" />
                  1. Local-First Processing Architecture
                </h2>
                <p>
                  The fundamental requirement of modern financial telemetry is protecting user privacy without sacrificing speed. Our engine operates on a <strong>Local-First Parsing Pattern</strong>:
                </p>
                
                {/* Visual Architecture Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:border-slate-300 transition-all">
                    <Cpu className="w-6 h-6 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-slate-900 text-base mb-1">On-Device Regex Engine</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sms payload extraction occurs strictly within isolated local runtimes before network invocation.
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:border-slate-300 transition-all">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-slate-900 text-base mb-1">Zero-Knowledge Sync</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Server sync payloads are encrypted with client keys—our infrastructure never stores raw text.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Code Example */}
              <section id="code-example" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <FileCode2 className="w-6 h-6 text-indigo-600" />
                  2. Sanitized Transaction Payload
                </h2>
                <p>
                  Below is an example of an anonymized, localized transaction object generated by the client runtime before cloud ingestion:
                </p>

                {/* Styled Code Box */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800/60 border-b border-slate-800 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="ml-2 text-slate-300 font-semibold">payload.json</span>
                    </div>
                    <button 
                      onClick={() => handleCopyCode(sampleCodePayload)}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-5 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{sampleCodePayload}</code>
                  </pre>
                </div>
              </section>

              {/* Section 3: Parameter Table */}
              <section id="parameters" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Database className="w-6 h-6 text-indigo-600" />
                  3. Field Definition Reference
                </h2>
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <tr>
                        <th className="p-4">Field</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-4 font-mono font-semibold text-indigo-600">transaction_id</td>
                        <td className="p-4 font-mono text-slate-500">string</td>
                        <td className="p-4 text-slate-600">Unique cryptographic hash derived from local device timestamp & amount.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono font-semibold text-indigo-600">merchant.category_code</td>
                        <td className="p-4 font-mono text-slate-500">integer</td>
                        <td className="p-4 text-slate-600">Standard MCC identifier used for budget categorization.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono font-semibold text-indigo-600">privacy_flag</td>
                        <td className="p-4 font-mono text-slate-500">enum</td>
                        <td className="p-4 text-slate-600">Denotes whether raw payload was purged before client exit.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Navigation Pagination */}
              <div className="pt-10 mt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                <button className="flex flex-col items-start p-5 border border-slate-200/80 rounded-2xl hover:border-slate-800 hover:shadow-xl transition-all duration-300 group text-left w-full sm:w-[48%] bg-white hover:bg-slate-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-slate-300 transition-colors relative z-10">Previous</span>
                  <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-white transition-colors relative z-10">Quick Start Guide</span>
                </button>
                <button className="flex flex-col items-end p-5 border border-transparent rounded-2xl hover:shadow-xl transition-all duration-300 group text-right w-full sm:w-[48%] bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-slate-300 transition-colors relative z-10">Next</span>
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-indigo-200 transition-colors relative z-10">Data Engine & Parsing</span>
                </button>
              </div>

            </div>
          </main>

          {/* RIGHT SIDEBAR: On-This-Page Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">


            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Developer Links
              </h4>
              <div className="flex flex-col gap-3">
                <Link 
                  to="/#contact" 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-general'))}
                  className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs text-center hover:bg-black transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  Developer Support
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full px-4 py-3 bg-white text-slate-800 border border-slate-200 rounded-xl font-bold text-xs text-center hover:border-slate-800 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* FLOATING READ MODE BUTTON */}
      <button 
        onClick={() => setIsReadMode(true)}
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-full shadow-2xl border border-slate-700 hover:scale-105 hover:bg-black transition-all cursor-pointer"
        aria-label="Open distraction-free reader mode"
      >
        <BookOpen className="w-4 h-4 text-amber-400" />
        <span className="font-bold text-xs tracking-wider uppercase">Focus Reader</span>
      </button>

    </div>
  );
}