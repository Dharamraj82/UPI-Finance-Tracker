import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, PieChart, Activity, AlertCircle, ArrowUpRight, ArrowDownRight, X, Maximize2, TrendingUp, TrendingDown, Search, Scale, Wallet, Save, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell,
  Legend
} from 'recharts';

import phonePeLogo from '../../assets/brands/phonePay-logo.jpg';
import googlePayLogo from '../../assets/brands/googlePay-logo.jpg';
import paytmLogo from '../../assets/brands/paytm-logo.jpg';
import amazonPayLogo from '../../assets/brands/amzonPay-logo.jpg';
import naviLogo from '../../assets/brands/navi-logo.jpg';
import othersLogo from '../../assets/brands/othes-upi-logo.png';

const platforms = [
  { id: "phonepe", name: "PhonePe", logo: phonePeLogo },
  { id: "gpay", name: "Google Pay", logo: googlePayLogo },
  { id: "paytm", name: "Paytm", logo: paytmLogo },
  { id: "amazon", name: "Amazon Pay", logo: amazonPayLogo },
  { id: "navi", name: "Navi UPI", logo: naviLogo },
  { id: "others", name: "Other Banks / UPI", logo: othersLogo },
];

const COLORS = ['#10b981', '#f97316', '#6366f1', '#f59e0b', '#0ea5e9', '#8b5cf6'];

const MarqueeText = ({ children, className }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = React.useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  return (
    <div className={`marquee-wrap w-full ${isOverflowing ? 'can-marquee' : ''}`}>
      <span ref={textRef} className={`marquee-text ${className}`}>
        {children}
      </span>
    </div>
  );
};

export default function AnalysisReport() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeChartTab, setActiveChartTab] = useState('both');
  const [chartType, setChartType] = useState('area'); // area | bar | line | radar
  const [selectedTx, setSelectedTx] = useState(null);
  const [txSearchQuery, setTxSearchQuery] = useState('');

  const cancelSession = async () => {
    if (!sessionId) return;
    try {
      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
      await fetch(`${apiBaseUrl}/api/v1/public/cancel/${sessionId}`, {
        method: 'DELETE',
        keepalive: true
      });
    } catch (e) {
      console.error("Failed to cancel session", e);
    }
  };

  // Protect against refresh/close and cancel session on actual exit
  useEffect(() => {
    const sessionOwner = sessionStorage.getItem('active_session');
    if (sessionOwner !== sessionId) {
      toast.error('Session is locked to a single tab for security. Invalidating session.');
      cancelSession().finally(() => {
        navigate('/platform');
      });
      return;
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleCopyPaste = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Prevent refresh
      if ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
      }
      if (e.key === 'F5') {
        e.preventDefault();
      }
      
      // Prevent DevTools, Inspect, View Source, Save, Print
      const forbiddenKeys = ['I', 'i', 'J', 'j', 'C', 'c', 'U', 'u', 'S', 's', 'P', 'p'];
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && forbiddenKeys.includes(e.key))) {
        e.preventDefault();
      }

    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', cancelSession);
    window.addEventListener('popstate', cancelSession);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopyPaste);
    window.addEventListener('cut', handleCopyPaste);
    window.addEventListener('paste', handleCopyPaste);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', cancelSession);
      window.removeEventListener('popstate', cancelSession);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopyPaste);
      window.removeEventListener('cut', handleCopyPaste);
      window.removeEventListener('paste', handleCopyPaste);
    };
  }, [sessionId, navigate]);

  useEffect(() => {
    let pollInterval;
    const fetchData = async () => {
      try {
        const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
        const response = await fetch(`${apiBaseUrl}/api/v1/public/analysis/${sessionId}`);
        if (response.status === 404) {
          toast.error("Session expired or not found. Please upload your file again.", { duration: 5000 });
          navigate('/platform');
          return;
        }
        if (response.status === 202) return;
        const json = await response.json();
        if (json.success && json.data) {
          setData(json.data);
          setIsLoading(false);
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error("Error fetching analysis:", error);
      }
    };
    fetchData();
    pollInterval = setInterval(fetchData, 3000);
    return () => clearInterval(pollInterval);
  }, [sessionId, navigate]);

  // Derive top income sources and top spenders from transactions
  const { topIncomeSources, topSpenders } = useMemo(() => {
    if (!data?.transactions) return { topIncomeSources: [], topSpenders: [] };
    const incomeMap = {};
    const expenseMap = {};
    data.transactions.forEach(tx => {
      const key = tx.description || tx.upiId || 'Unknown';
      if (tx.type === 'Credit') {
        incomeMap[key] = (incomeMap[key] || 0) + Math.abs(tx.amount);
      } else {
        expenseMap[key] = (expenseMap[key] || 0) + Math.abs(tx.amount);
      }
    });
    const topIncomeSources = Object.entries(incomeMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, amount]) => ({ name, amount }));
    const topSpenders = Object.entries(expenseMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, amount]) => ({ name, amount }));
    return { topIncomeSources, topSpenders };
  }, [data]);

  const sortedPlaces = useMemo(() => {
    if (!data?.topPlaces) return [];
    return [...data.topPlaces].sort((a, b) => b.totalAmount - a.totalAmount);
  }, [data]);

  // Also fix Recent Transactions credit check
  const isCredit = (tx) => tx.type === 'Credit';

  const fmtCompact = (val) => `₹${Intl.NumberFormat('en-IN', { notation: 'compact' }).format(val)}`;
  const fmtFull = (val) => `₹${Number(val).toLocaleString('en-IN')}`;

  const CHART_TYPES = [
    { key: 'area', label: 'Wave', icon: '〰️' },
    { key: 'bar', label: 'Bar', icon: '📊' },
    { key: 'line', label: 'Line', icon: '📈' },
    { key: 'radar', label: 'Radar', icon: '🔵' },
  ];

  const renderMainChart = () => {
    if (!data?.graphData || data.graphData.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-2xl bg-zinc-50/50">
          <p className="text-zinc-400 font-medium">No timeline data available</p>
        </div>
      );
    }
    const showIncome = activeChartTab === 'income' || activeChartTab === 'both';
    const showExpenses = activeChartTab === 'expenses' || activeChartTab === 'both';
    const commonProps = { data: data.graphData, margin: { top: 10, right: 10, left: -20, bottom: 0 } };
    const xAxis = <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />;
    const yAxis = <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} tickFormatter={fmtCompact} />;
    const grid = <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />;
    const tooltip = <RechartsTooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} formatter={(v) => [fmtFull(v), undefined]} />;

    if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
              <linearGradient id="go" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
            </defs>
            {grid}{xAxis}{yAxis}{tooltip}
            {showIncome && <Area type="monotone" dataKey="incoming" name="Income" stroke="#10b981" strokeWidth={2.5} fill="url(#gi)" dot={false} activeDot={{ r: 5 }} />}
            {showExpenses && <Area type="monotone" dataKey="outgoing" name="Expenses" stroke="#f59e0b" strokeWidth={2.5} fill="url(#go)" dot={false} activeDot={{ r: 5 }} />}
          </AreaChart>
        </ResponsiveContainer>
      );
    }
    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart {...commonProps}>
            {grid}{xAxis}{yAxis}{tooltip}
            {showIncome && <Bar dataKey="incoming" name="Income" fill="#10b981" radius={[4,4,0,0]} maxBarSize={40} />}
            {showExpenses && <Bar dataKey="outgoing" name="Expenses" fill="#f59e0b" radius={[4,4,0,0]} maxBarSize={40} />}
          </BarChart>
        </ResponsiveContainer>
      );
    }
    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart {...commonProps}>
            {grid}{xAxis}{yAxis}{tooltip}
            {showIncome && <Line type="monotone" dataKey="incoming" name="Income" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />}
            {showExpenses && <Line type="monotone" dataKey="outgoing" name="Expenses" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />}
          </LineChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  // Statement date range derived from transactions
  const { statementStart, statementEnd } = useMemo(() => {
    if (!data?.transactions?.length) return { statementStart: null, statementEnd: null };
    const dates = data.transactions.map(t => new Date(t.date)).filter(d => !isNaN(d));
    if (!dates.length) return { statementStart: null, statementEnd: null };
    const min = new Date(Math.min(...dates));
    const max = new Date(Math.max(...dates));
    return {
      statementStart: min.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      statementEnd: max.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
  }, [data]);

  const stats = useMemo(() => {
    if (!data?.transactions?.length) return { opening: null, closing: null, netFlow: 0, incomingCount: 0, outgoingCount: 0 };
    const sorted = [...data.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let opening = null;
    let closing = null;
    if (sorted.length > 0) {
      opening = sorted[0].amount;
      closing = sorted[sorted.length - 1].amount;
    }

    let incomingCount = 0;
    let outgoingCount = 0;
    data.transactions.forEach(t => {
      if (t.type === 'Credit') incomingCount++;
      else outgoingCount++;
    });
    
    const netFlow = (data.summary?.totalIncoming || 0) - (data.summary?.totalOutgoing || 0);
    return { opening, closing, netFlow, incomingCount, outgoingCount };
  }, [data]);

  // Transaction detail computation
  const getTxDetail = (tx) => {
    const key = tx.upiId || 'Unknown';
    const allRelated = data?.transactions?.filter(t => (t.upiId || 'Unknown') === key) || [];
    const relatedDates = allRelated.map(t => t.date).sort();
    return {
      name: cleanName(tx.description || tx.upiId),
      rawName: tx.description || tx.upiId || 'Transaction',
      upiId: tx.upiId || 'N/A',
      amount: tx.amount,
      type: tx.type,
      date: tx.date,
      firstSeen: relatedDates[0] || tx.date,
      lastSeen: relatedDates[relatedDates.length - 1] || tx.date,
      time: tx.time || 'N/A',
      transactionId: tx.transactionId || 'N/A',
      utr: tx.utr || 'N/A',
      instrument: tx.instrument || 'N/A',
      totalTransactions: allRelated.length,
      totalAmount: allRelated.reduce((sum, t) => sum + Math.abs(t.amount), 0),
      creditTotal: allRelated.filter(t => t.type === 'Credit').reduce((sum, t) => sum + Math.abs(t.amount), 0),
      debitTotal: allRelated.filter(t => t.type !== 'Credit').reduce((sum, t) => sum + Math.abs(t.amount), 0),
    };
  };

  // Strip common prefixes from transaction names
  const cleanName = (str) => {
    if (!str) return 'Transaction';
    return str.replace(/^(Paid to |Received from )/i, '').trim();
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20 relative overflow-hidden select-none">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-60%); }
        }
        .marquee-wrap { overflow: hidden; position: relative; width: 100%; }
        .marquee-text { 
          display: inline-block; 
          max-width: 100%; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
          vertical-align: bottom;
        }
        .marquee-wrap.can-marquee:hover .marquee-text { 
          animation: marquee 4s linear infinite; 
          max-width: none; 
          overflow: visible; 
        }
      `}</style>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100/40 via-zinc-50 to-sky-100/40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[84rem] mx-auto px-4 md:px-8 relative z-10">

        {/* Navigation & Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative">
          
          {/* Left: Report Title */}
          <div className="flex-1">
            <Link
              to="/platform"
              onClick={cancelSession}
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Upload
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">Analysis Report</h1>
            <p className="text-zinc-500 mt-2 font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              Session ID: <span className="font-mono text-zinc-400 text-xs">{sessionId}</span>
            </p>
            <p className="text-red-500 text-sm mt-3 font-medium flex items-center gap-1.5 bg-red-50 w-fit px-3 py-1.5 rounded-lg border border-red-100">
              <AlertCircle className="w-4 h-4" />
              Warning: Your data will be removed when you close this tab.
            </p>
          </div>

          {/* Center: Platform & Date */}
          {(data?.platform || (statementStart && statementEnd)) && (
            <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center justify-center text-center order-first lg:order-none mb-6 lg:mb-0">
              {data?.platform && (() => {
                const platformInfo = platforms.find(p => p.name.toLowerCase() === data.platform.toLowerCase()) || platforms.find(p => p.id === 'others');
                return (
                  <div className="flex items-center gap-3 mb-3">
                    <img src={platformInfo.logo} alt={platformInfo.name} className="w-12 h-12 rounded-xl object-contain border border-zinc-200 shadow-sm" />
                    <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">{data.platform}</h2>
                  </div>
                );
              })()}
              {statementStart && statementEnd && (
                <div className="inline-flex items-center px-3 py-1 bg-white border border-zinc-200/60 rounded-full shadow-sm">
                  <p className="text-zinc-500 font-medium text-xs">
                    Statement period: <span className="text-zinc-900 font-bold">{statementStart}</span> <span className="mx-1 text-zinc-400">→</span> <span className="text-zinc-900 font-bold">{statementEnd}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="group relative">
              <button className="glass-shine-btn relative px-5 py-2.5 bg-gradient-to-r from-amber-200 to-yellow-400 border border-amber-300/50 text-yellow-950 font-bold text-sm rounded-full transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:from-amber-300 hover:to-yellow-500 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer focus:outline-none">
                <Star className="w-4 h-4 fill-yellow-900 relative z-10 text-yellow-900" />
                <span className="relative z-10">Sign In</span>
              </button>
              
              {/* Pro Popup */}
              <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-zinc-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0 p-5">
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-zinc-200 rotate-45" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h4 className="text-lg font-bold text-zinc-900">Unlock Pro Features</h4>
                  </div>
                  <ul className="text-sm text-zinc-600 font-medium space-y-3 mb-4">
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">✓</div>
                      <span>Save and backup unlimited statements securely</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">✓</div>
                      <span>Compare multiple statements side-by-side</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">✓</div>
                      <span>Advanced AI health scores and smart insights</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">✓</div>
                      <span>And many more exclusive features!</span>
                    </li>
                  </ul>
                  <p className="text-xs font-bold text-red-500 text-center mb-3">
                    It will store your data with 100% security.
                  </p>
                  <Link to="/#sign-in" className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md">
                    Go to Sign In & Check It Out!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading || !data ? (
          <div className="h-[60vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 font-medium animate-pulse">Analyzing and extracting data...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ArrowDownRight className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">Total Incoming (Credit)</p>
                  <p className="text-2xl font-bold text-emerald-600">{fmtFull(data.summary.totalIncoming)}</p>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">{stats.incomingCount} transactions</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">Total Outgoing (Debit)</p>
                  <p className="text-2xl font-bold text-amber-500">{fmtFull(data.summary.totalOutgoing)}</p>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">{stats.outgoingCount} transactions</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${stats.netFlow >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">Net Balance Difference</p>
                  <p className={`text-2xl font-bold ${stats.netFlow >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {stats.netFlow >= 0 ? '+' : '-'}{fmtFull(Math.abs(stats.netFlow))}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">First Transaction Amount</p>
                  <p className="text-2xl font-bold text-zinc-900">{stats.opening !== null ? fmtFull(stats.opening) : 'N/A'}</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">Last Transaction Amount</p>
                  <p className="text-2xl font-bold text-zinc-900">{stats.closing !== null ? fmtFull(stats.closing) : 'N/A'}</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">Total Transactions</p>
                  <p className="text-2xl font-bold text-zinc-900">{data.summary.totalTransactions}</p>
                </div>
              </div>
            </div>

            {/* Main Chart + Pie */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Area Chart */}
              <div className="lg:col-span-2 bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8 flex flex-col min-h-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-800">Income vs Expenses</h3>
                    <p className="text-sm text-zinc-500 font-medium">Timeline overview</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Data toggles */}
                    <div className="flex items-center p-1 bg-zinc-100 rounded-lg">
                      {['income', 'expenses', 'both'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveChartTab(tab)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                            activeChartTab === tab
                              ? tab === 'income' ? 'bg-white text-emerald-600 shadow-sm'
                              : tab === 'expenses' ? 'bg-white text-amber-500 shadow-sm'
                              : 'bg-white text-indigo-600 shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    {/* Chart type buttons */}
                    <div className="flex items-center p-1 bg-zinc-100 rounded-lg gap-0.5">
                      {[
                        { key: 'area', label: 'Wave', title: 'Area / Wave' },
                        { key: 'bar', label: 'Bar', title: 'Bar Chart' },
                        { key: 'line', label: 'Line', title: 'Line Chart' },
                      ].map(ct => (
                        <button
                          key={ct.key}
                          title={ct.title}
                          onClick={() => setChartType(ct.key)}
                          className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all ${
                            chartType === ct.key ? 'bg-white text-zinc-800 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                          }`}
                        >
                          {ct.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-grow w-full h-[300px]">
                  {renderMainChart()}
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-zinc-800">Top Categories</h3>
                  <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
                    <PieChart className="w-5 h-5" />
                  </div>
                </div>
                <div className="h-[220px] w-full">
                  {data.pieChartData && data.pieChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={data.pieChartData}
                          cx="50%" cy="50%"
                          innerRadius={60} outerRadius={80}
                          paddingAngle={5} dataKey="value" stroke="none"
                        >
                          {data.pieChartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                          formatter={(value) => [fmtFull(value), undefined]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-2xl bg-zinc-50/50">
                      <p className="text-zinc-400 font-medium text-sm">No category data</p>
                    </div>
                  )}
                </div>
                {data.pieChartData && data.pieChartData.length > 0 && (
                  <div className="mt-4 space-y-2 max-h-32 overflow-y-auto pr-2">
                    {data.pieChartData.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="text-zinc-600 truncate">{entry.name}</span>
                        </div>
                        <span className="font-bold text-zinc-800 flex-shrink-0">{fmtFull(entry.value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Top Income Sources + Top Spenders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-800">Top Income Sources</h3>
                    <p className="text-sm text-zinc-500 font-medium">Most money came from</p>
                  </div>
                </div>
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {topIncomeSources.length > 0 ? topIncomeSources.map((item, i) => {
                    const maxAmt = topIncomeSources[0].amount;
                    const pct = Math.round((item.amount / maxAmt) * 100);
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="min-w-0 flex-1 mr-3">
                            <MarqueeText className="text-sm font-bold text-zinc-800">{cleanName(item.name)}</MarqueeText>
                          </div>
                          <p className="text-sm font-bold text-emerald-600 flex-shrink-0">+{fmtFull(item.amount)}</p>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  }) : <p className="text-zinc-400 text-sm">No income data found.</p>}
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-800">Top Spending Destinations</h3>
                    <p className="text-sm text-zinc-500 font-medium">Most money went to</p>
                  </div>
                </div>
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {topSpenders.length > 0 ? topSpenders.map((item, i) => {
                    const maxAmt = topSpenders[0].amount;
                    const pct = Math.round((item.amount / maxAmt) * 100);
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="min-w-0 flex-1 mr-3">
                            <MarqueeText className="text-sm font-bold text-zinc-800">{cleanName(item.name)}</MarqueeText>
                          </div>
                          <p className="text-sm font-bold text-amber-500 flex-shrink-0">-{fmtFull(item.amount)}</p>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  }) : <p className="text-zinc-400 text-sm">No expense data found.</p>}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Repeated Places - sorted by totalAmount */}
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-800">Most Repeated Places</h3>
                    <p className="text-sm text-zinc-500 font-medium">Top 10</p>
                  </div>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {sortedPlaces.length > 0 ? sortedPlaces.map((place, i) => {
                    const detail = getTxDetail({ upiId: place.upiId });
                    return (
                    <div
                      key={i}
                      onClick={() => {
                        const tx = data.transactions?.find(t => t.upiId === place.upiId);
                        if (tx) setSelectedTx(tx);
                      }}
                      className="flex items-center justify-between py-2.5 border-b border-zinc-100 last:border-0 cursor-pointer hover:bg-zinc-50 rounded-xl px-2 -mx-2 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <MarqueeText className="text-sm font-bold text-zinc-800">{cleanName(place.upiId)}</MarqueeText>
                          <p className="text-xs font-medium text-zinc-400">{place.count} transactions</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center flex-shrink-0">
                        {detail.creditTotal > 0 && <span className="text-sm font-bold text-emerald-600">+{fmtFull(detail.creditTotal)}</span>}
                        {detail.debitTotal > 0 && <span className="text-sm font-bold text-amber-500">-{fmtFull(detail.debitTotal)}</span>}
                        {detail.creditTotal === 0 && detail.debitTotal === 0 && <span className="text-sm font-bold text-zinc-900">{fmtFull(place.totalAmount)}</span>}
                      </div>
                    </div>
                  )}) : <p className="text-zinc-500 text-sm">No places found.</p>}
                </div>
              </div>

              {/* Recent Transactions — no date filter */}
              <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-800">Recent Transactions</h3>
                    <p className="text-sm text-zinc-500 font-medium">Your latest activity</p>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-zinc-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-xl leading-5 bg-zinc-50 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                      value={txSearchQuery}
                      onChange={(e) => setTxSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 flex-1">
                  {(() => {
                    if (!data.transactions || data.transactions.length === 0) {
                      return <p className="text-zinc-500 text-sm">No transactions found.</p>;
                    }
                    const filteredTransactions = txSearchQuery
                      ? data.transactions.filter(tx => 
                          cleanName(tx.description || tx.upiId || 'Transaction').toLowerCase().includes(txSearchQuery.toLowerCase()) ||
                          (tx.upiId || '').toLowerCase().includes(txSearchQuery.toLowerCase())
                        )
                      : data.transactions;
                    
                    if (filteredTransactions.length === 0) {
                      return <p className="text-zinc-500 text-sm text-center py-4">No matching transactions found.</p>;
                    }
                    
                    return filteredTransactions.slice(0, 100).map((tx, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedTx(tx)}
                        className="flex items-center justify-between py-2.5 border-b border-zinc-100 last:border-0 cursor-pointer hover:bg-zinc-50 rounded-xl px-2 -mx-2 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-xs flex-shrink-0 ${isCredit(tx) ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>
                            {isCredit(tx) ? 'In' : 'Out'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <MarqueeText className="text-sm font-bold text-zinc-800">{cleanName(tx.description || tx.upiId || 'Transaction')}</MarqueeText>
                            <p className="text-xs font-medium text-zinc-400">{tx.date}</p>
                          </div>
                        </div>
                        <p className={`text-sm font-bold flex-shrink-0 ${isCredit(tx) ? 'text-emerald-600' : 'text-amber-500'}`}>
                          {isCredit(tx) ? '+' : '-'}{fmtFull(Math.abs(tx.amount))}
                        </p>
                      </div>
                    ))
                  })()}
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTx && (() => {
          const detail = getTxDetail(selectedTx);
          const credit = isCredit(selectedTx);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm"
              onClick={() => setSelectedTx(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 24 }}
                transition={{ duration: 0.28 }}
                className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl border border-zinc-200 p-8 overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none ${credit ? 'bg-emerald-400/20' : 'bg-amber-400/20'}`} />
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 ${credit ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {credit ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${credit ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {credit ? 'Credit · Incoming' : 'Debit · Outgoing'}
                      </p>
                      <h2 className="text-2xl font-extrabold text-zinc-900">{fmtFull(Math.abs(detail.amount))}</h2>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTx(null)} className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Statement Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm font-bold text-zinc-900">{detail.date}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Time</p>
                    <p className="text-sm font-bold text-zinc-900">{detail.time}</p>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-2xl p-4 mb-4 border border-zinc-100">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Transaction Details</p>
                  <p className="text-sm font-mono text-zinc-700 break-all">{detail.rawName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Transaction ID</p>
                    <p className="text-sm font-mono font-bold text-zinc-900 break-all">{detail.transactionId}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">UTR</p>
                    <p className="text-sm font-mono font-bold text-zinc-900 break-all">{detail.utr}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Transaction Type</p>
                    <p className="text-sm font-bold text-zinc-900">{detail.type}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Credit/Debit Instrument</p>
                    <p className="text-sm font-bold text-zinc-900 break-all">{detail.instrument}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 text-center">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Transactions</p>
                    <p className="text-lg font-extrabold text-zinc-900">{detail.totalTransactions}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center">
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Total In</p>
                    <p className="text-sm font-extrabold text-emerald-700">{fmtFull(detail.creditTotal)}</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-center">
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Total Out</p>
                    <p className="text-sm font-extrabold text-amber-700">{fmtFull(detail.debitTotal)}</p>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 text-center mt-5">Click outside or press Esc to close</p>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>


    </div>
  );
}
