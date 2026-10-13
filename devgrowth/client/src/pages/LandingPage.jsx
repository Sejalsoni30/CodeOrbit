import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ThemeContext } from '../context/ThemeContext';
import LandingLoadingModal from '../components/landing/LandingLoadingModal';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  CheckSquare,
  Milestone,
  FolderGit2,
  Bot,
  BarChart3,
  Flame,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Code2,
  Users,
  Compass,
  Star,
  Terminal,
  Lock,
  ArrowUpRight,
  Sun,
  Moon
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext) || { theme: 'dark', toggleTheme: () => {} };
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetAuthPage, setTargetAuthPage] = useState('login');
  const [activePreviewTab, setActivePreviewTab] = useState('dashboard');
  const [calcLevel, setCalcLevel] = useState('L4 Associate');

  // Triggers the 2-second smooth loading animation before redirecting to /login or /register
  const handleStartLogin = (target = 'login') => {
    setTargetAuthPage(target);
    setIsTransitioning(true);
  };

  const handleLoadingComplete = () => {
    setIsTransitioning(false);
    navigate(targetAuthPage === 'register' ? '/register' : '/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden selection:bg-indigo-500/25 selection:text-indigo-400">
      {/* 2-Second Visual Transition Overlay */}
      <LandingLoadingModal
        isOpen={isTransitioning}
        targetPage={targetAuthPage}
        onComplete={handleLoadingComplete}
      />

      {/* Ambient glowing backdrop gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-500/15 dark:bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-2/3 left-1/3 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full glass-header backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                CodeOrbit
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v2.0
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#purpose" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Purpose
            </a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#preview" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Platform Demo
            </a>
            <a href="#velocity" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Velocity
            </a>
            <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Testimonials
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-amber-300 transition-all shadow-sm"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {currentUser ? (
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleStartLogin('login')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleStartLogin('login')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span>Launch Platform</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>The Career Velocity Intelligence Suite for Software Engineers</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight max-w-5xl mx-auto leading-[1.08]">
          Master Technical Velocity. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Architect Your Engineering Legacy.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Bridge the gap between coding daily and advancing your engineering tier. Track technical skills across 6 core domains, orchestrate sprint goals, and receive AI architectural critique with enterprise-grade Firestore precision.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => handleStartLogin('login')}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-bold shadow-xl shadow-indigo-600/35 transition-all hover:scale-105 active:scale-95 group"
          >
            <span>Enter Platform / Login</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#preview"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-4 rounded-2xl glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm sm:text-base font-bold border border-slate-200 dark:border-slate-700 transition-all"
          >
            <span>Explore Platform Demo</span>
          </a>
        </div>

        {/* Live Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Firebase Cloud Firestore</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Google Authenticator 2FA (TOTP)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Bot className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Google Gemini 2.5 AI Advisor</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Zero-Config Instant Demo Mode</span>
          </div>
        </div>

        {/* INTERACTIVE PLATFORM MOCKUP PREVIEW */}
        <div id="preview" className="mt-16 sm:mt-20 max-w-5xl mx-auto rounded-3xl glass-card border border-indigo-500/25 p-3 sm:p-5 shadow-2xl relative overflow-hidden group">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800/80 px-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-slate-400 ml-2">codeorbit.app/dashboard</span>
            </div>

            {/* Interactive Preview Tab Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
              {[
                { id: 'dashboard', label: 'Dashboard Hub' },
                { id: 'skills', label: 'Skill Matrix' },
                { id: 'roadmap', label: 'Career Roadmap' },
                { id: 'ai', label: 'Gemini Mentor' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activePreviewTab === tab.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preview Content */}
          <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-7 text-left text-white border border-slate-800 relative overflow-hidden min-h-[360px]">
            {activePreviewTab === 'dashboard' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-sm ring-2 ring-indigo-400/30">
                      AD
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-base">Alex Developer</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          L5 Senior
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300">Tracking: Senior Full Stack Engineer • Sprint Velocity +24%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>14 Day Streak</span>
                    </span>
                  </div>
                </div>

                {/* KPI metric mock row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <p className="text-xs text-slate-400 font-medium">Sprint Competencies</p>
                    <p className="text-2xl font-black text-indigo-400 mt-1">18 Skills</p>
                    <p className="text-[11px] text-emerald-400 mt-0.5 font-semibold">92% Average Proficiency</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <p className="text-xs text-slate-400 font-medium">Sprint Daily Tasks</p>
                    <p className="text-2xl font-black text-purple-400 mt-1">8 / 10 Done</p>
                    <p className="text-[11px] text-purple-300 mt-0.5 font-semibold">80% Completion Rate</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <p className="text-xs text-slate-400 font-medium">Promotion Target</p>
                    <p className="text-2xl font-black text-pink-400 mt-1">L6 Staff</p>
                    <p className="text-[11px] text-pink-300 mt-0.5 font-semibold">Milestone 2 of 4 Active</p>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'skills' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>Skill Proficiency Matrix</span>
                  </h4>
                  <span className="text-xs text-indigo-300">6 Domains Categorized</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'React 18 & State Architecture', cat: 'Frontend', pct: 92, color: 'bg-indigo-500' },
                    { name: 'Firebase Cloud Firestore & Security', cat: 'Database', pct: 88, color: 'bg-purple-500' },
                    { name: 'Node.js Express & Microservices', cat: 'Backend', pct: 85, color: 'bg-cyan-500' },
                    { name: 'Distributed Systems & Observability', cat: 'Architecture', pct: 78, color: 'bg-emerald-500' },
                  ].map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-200">{s.name} <span className="text-[10px] text-slate-400 ml-1">({s.cat})</span></span>
                        <span className="text-indigo-400">{s.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-700/50 overflow-hidden">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePreviewTab === 'roadmap' && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Milestone className="w-4 h-4 text-purple-400" />
                    <span>Career Leveling Roadmap (L5 Senior → L6 Staff)</span>
                  </h4>
                  <span className="text-xs text-emerald-400 font-bold">In Progress</span>
                </div>
                {[
                  { phase: 'Phase 1: Core System Architecture', desc: 'Design scalable distributed systems, event streams, and decoupled APIs', done: true },
                  { phase: 'Phase 2: Scale & Resiliency', desc: 'Implement redis caching, database partitions, and load resiliency', done: true },
                  { phase: 'Phase 3: Cross-Team Engineering Leadership', desc: 'Author RFCs, conduct design reviews, and establish technical standards', done: false },
                ].map((r, i) => (
                  <div key={i} className={`p-3.5 rounded-xl border flex items-start space-x-3 ${r.done ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-800/40 border-slate-700/50'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${r.done ? 'bg-indigo-600 text-white' : 'border border-slate-600 text-slate-400'}`}>
                      {r.done ? '✓' : i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{r.phase}</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activePreviewTab === 'ai' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span>Google Gemini 2.5 Flash Engineering Advisor</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold uppercase">
                    AI Active
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-indigo-400">User Query: "How can I demonstrate L6 Staff scope while leading my team's cloud migration?"</p>
                  <p className="text-slate-200 leading-relaxed border-t border-slate-700/60 pt-2">
                    <strong className="text-purple-300">Gemini Advisor:</strong> "At L6 Staff, your value lies in cross-organizational clarity. Frame your cloud migration as an architectural blueprint: document trade-offs with an Architecture Decision Record (ADR), implement cost guardrails with observability, and mentor 2 junior engineers through critical modules."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PURPOSE & VALUE PROPOSITION */}
      <section id="purpose" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Platform Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Why We Built CodeOrbit
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Generic project management tools track generic tickets. CodeOrbit is engineered specifically for software engineers seeking deliberate, measurable advancement towards senior and staff engineering tiers.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-7 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Quantifiable Growth Velocity
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Eliminate guesswork during performance evaluations. CodeOrbit provides verifiable metrics, contribution heatmaps, and milestone logs that prove your trajectory.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Domain Skill Depth
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Categorize competencies across Frontend, Backend, Databases, and Distributed Systems. Balance breadth with T-shaped architectural mastery.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              AI-Powered Senior Mentorship
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Direct access to a Google Gemini AI Advisor calibrated for software engineering. Generate interview roadmaps, review architectural tradeoffs, and unblock challenges.
            </p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES (BENTO GRID) */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Engineered For Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Features Tailored For High-Output Engineers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            Every screen in CodeOrbit is focused on reducing friction and accelerating your promotion trajectory.
          </p>
        </div>

        {/* 6 Bento Grid Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Skill Matrix & Verification
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Track proficiency percentages across 6 core technical domains with verified badges and interactive level-up controls.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Daily Sprint Micro-Goals
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Break monolithic goals into daily manageable tasks with streak tracking to build unstoppable momentum.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Milestone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Executive Career Roadmap
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Phase-by-phase roadmap checkpoints outlining what is required to advance from Associate up to Staff & Principal.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Gemini 2.5 AI Advisor
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Context-aware career advice engine that generates mock interview prompts, reviews GitHub projects, and plans milestones.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Portfolio & Showcase Hub
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Highlight your best open-source and internal repositories with tech tags, live preview URLs, and GitHub stars.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Google Authenticator (2FA)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enterprise TOTP two-factor authentication, Cloud Firestore document persistence, and executive profile avatars.
            </p>
          </div>
        </div>
      </section>

      {/* PROMOTION VELOCITY CALCULATOR */}
      <section id="velocity" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
              Interactive Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Estimate Your Promotion Readiness
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              Select your current tier to discover estimated acceleration with deliberate skill tracking:
            </p>

            {/* Level Selector */}
            <div className="flex flex-wrap gap-2.5 mt-5">
              {['L4 Associate', 'L5 Senior', 'L6 Staff'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setCalcLevel(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    calcLevel === lvl
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Dynamic Results Card */}
            <div className="mt-6 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase">Target Promotion</p>
                <p className="text-base font-extrabold text-indigo-400 mt-0.5">
                  {calcLevel === 'L4 Associate' ? 'L5 Senior Engineer' : calcLevel === 'L5 Senior' ? 'L6 Staff Architect' : 'L7 Principal Lead'}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase">Estimated Velocity Lift</p>
                <p className="text-base font-extrabold text-emerald-400 mt-0.5">
                  {calcLevel === 'L4 Associate' ? '+45% Acceleration' : calcLevel === 'L5 Senior' ? '+38% Acceleration' : '+30% Acceleration'}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase">Core Stack Focus</p>
                <p className="text-base font-extrabold text-purple-400 mt-0.5">
                  {calcLevel === 'L4 Associate' ? 'Full Stack Depth & Testing' : calcLevel === 'L5 Senior' ? 'Distributed Systems & RFCs' : 'Org Strategy & Cross-Team'}
                </p>
              </div>
            </div>

            <div className="mt-7">
              <button
                onClick={() => handleStartLogin('login')}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 transition-all"
              >
                <span>Begin Your Progression In CodeOrbit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Social Proof
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Engineered By & For Developers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "CodeOrbit transformed my engineering performance reviews. Rather than trying to recall what I shipped 6 months ago, I had clean verified skill milestones and burn-down data ready."
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Sarah Chen</p>
              <p className="text-[11px] text-indigo-400">Staff Distributed Systems Architect</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "The Gemini 2.5 mentor is unexpectedly helpful. It helped me prepare for my system design interview by drilling down into database sharding and trade-offs."
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Marcus Vance</p>
              <p className="text-[11px] text-purple-400">AI Platform Lead</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "The executive profile customizer and Firestore integration are flawless. The site feels fast, modern, and serious about developer productivity."
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Alex Developer</p>
              <p className="text-[11px] text-pink-400">Senior Full Stack Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-IMPACT CALL TO ACTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/20 text-white mb-4">
            Start Your Journey Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Supercharge Your Engineering Career?
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto mt-4 leading-relaxed">
            Join developers accelerating their velocity with verified skill maps, structured leveling roadmaps, and intelligent AI mentorship.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleStartLogin('login')}
              className="px-8 py-4 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 text-sm sm:text-base font-extrabold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <span>Login to CodeOrbit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStartLogin('register')}
              className="px-8 py-4 rounded-2xl bg-indigo-700/60 hover:bg-indigo-700 border border-white/25 text-white text-sm sm:text-base font-bold transition-all"
            >
              <span>Create Free Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-extrabold text-slate-800 dark:text-slate-200">CodeOrbit (DevGrowth)</span>
          <span>• Powered by Firebase Firestore & Google Gemini</span>
        </div>
        <p>© 2026 CodeOrbit Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
