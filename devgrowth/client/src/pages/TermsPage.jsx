import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  Lock,
  Bot,
  Database,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import BackgroundMesh from '../components/common/BackgroundMesh';

export const TermsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('terms');
  const [activeSection, setActiveSection] = useState('acceptance');

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: Scale },
    { id: 'accounts', title: '2. Developer Accounts & Firebase', icon: Lock },
    { id: 'security', title: '3. Google Authenticator & 2FA', icon: ShieldCheck },
    { id: 'ai-mentor', title: '4. Gemini AI Advisory Policy', icon: Bot },
    { id: 'ip-rights', title: '5. Code Ownership & IP', icon: FileText },
    { id: 'data-privacy', title: '6. Firestore Privacy & GDPR', icon: Database },
    { id: 'sla', title: '7. System Uptime & SLAs', icon: CheckCircle2 },
    { id: 'termination', title: '8. Account Deletion & Termination', icon: AlertTriangle },
    { id: 'contact', title: '9. Legal Contact & Governance', icon: HelpCircle },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-x-hidden">
      <BackgroundMesh />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span>/</span>
            <span>Legal Portal</span>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">Terms & Conditions</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Terms</span>
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs font-semibold text-emerald-600 dark:text-emerald-300 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-semibold text-indigo-600 dark:text-indigo-300 transition-all"
            >
              <span>Contact Us</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Go to Login</span>
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="glass-card p-8 sm:p-10 mb-10 border border-indigo-100 dark:border-slate-800 relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute top-0 left-0" />
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Developer Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Terms & Conditions
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              These Terms and Conditions govern your access to and use of the CodeOrbit platform, including our Cloud Firestore infrastructure, Google Authenticator (TOTP) two-factor safeguards, and Google Gemini 2.5 AI architecture advisor.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Last Updated: <strong className="text-indigo-600 dark:text-indigo-400">October 14, 2026</strong>
              </span>
              <span>•</span>
              <span>Version: <strong className="text-slate-700 dark:text-slate-300">2.4-PRO</strong></span>
              <span>•</span>
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                SOC-2 & GDPR Aligned
              </span>
            </div>
          </div>
        </div>

        {/* Legal Framework Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'terms', label: 'Terms of Service', icon: Scale },
            { id: 'privacy', label: 'Privacy & Data Protection', icon: Database },
            { id: 'security', label: '2FA & Cloud Security', icon: ShieldCheck },
            { id: 'ai', label: 'Gemini AI Usage Guidelines', icon: Bot },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-5 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Table of Contents Navigation (Desktop) */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="glass-card p-5 border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">
                Table of Contents
              </p>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                        activeSection === section.id
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate">{section.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Need specific custom terms?</p>
                <p className="text-[11px] leading-relaxed">
                  Enterprise tiers with custom SLA agreements can reach our legal team at <a href="mailto:legal@codeorbit.app" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">legal@codeorbit.app</a>.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Detailed Terms Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1 */}
            <section id="acceptance" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  1. Acceptance of Terms & Developer Agreement
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                By creating an account, authenticating via Firebase or Google Sign-In, or accessing the CodeOrbit web platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you must discontinue using CodeOrbit immediately.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
                <strong>Key Takeaway:</strong> CodeOrbit is designed for software developers, engineering leads, and technical contributors to track skill development and career leveling. Use of the service confirms acceptance of these terms.
              </div>
            </section>

            {/* Section 2 */}
            <section id="accounts" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  2. Developer Accounts & Firebase Authentication
                </h2>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials. All authentication sessions are managed via Google Identity Platform / Firebase Authentication.
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>You must provide accurate and verifiable account information.</li>
                  <li>Account sharing or unauthorized session delegation is strictly prohibited.</li>
                  <li>You agree to notify CodeOrbit security administrators immediately if you suspect unauthorized account access.</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="security" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  3. Google Authenticator (TOTP 2FA) & Security
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                CodeOrbit supports Time-based One-Time Password (TOTP) two-factor authentication via applications such as Google Authenticator, Authy, or 1Password. When 2FA is active, a 6-digit cryptographic verification code is required for elevated account operations and session revalidation.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>Zero-Knowledge Secret:</strong> Your 2FA base32 secret is encrypted before persistence in Firestore. We strongly encourage storing backup recovery codes safely.
              </div>
            </section>

            {/* Section 4 */}
            <section id="ai-mentor" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  4. Google Gemini 2.5 AI Advisory Guidelines
                </h2>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  The AI Assistant feature utilizes Google's Gemini 2.5 Flash model to provide software architecture feedback, milestone breakdown, and career coaching.
                </p>
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <p className="font-bold flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Important Advisory Notice</span>
                  </p>
                  <p>
                    AI responses are generated programmatically and should be validated before production implementation. Do not submit unredacted proprietary trade secrets, production API keys, or private customer records into AI prompts.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="ip-rights" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  5. Code Ownership & Developer Intellectual Property
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>You retain 100% intellectual property ownership</strong> over all skills, roadmap milestones, architectural notes, and portfolio links stored within CodeOrbit. CodeOrbit claims zero ownership or exclusive rights to your code or career trajectory data.
              </p>
            </section>

            {/* Section 6 */}
            <section id="data-privacy" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  6. Cloud Firestore Data Storage & Privacy
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                All platform metrics, daily tasks, and skill levels are stored in Google Cloud Firestore documents. All data in transit is encrypted using TLS 1.3, and all data at rest is encrypted using AES-256 standards. We do not sell your personal engineering information to third-party data brokers.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sla" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  7. System Uptime & Service Level Guarantees (SLA)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                CodeOrbit strives for 99.9% monthly platform availability. Scheduled maintenance is broadcast in advance via platform notifications. We implement automated Firestore replication to guarantee recovery against data loss.
              </p>
            </section>

            {/* Section 8 */}
            <section id="termination" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  8. Account Deletion & Right to be Forgotten
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Under GDPR and CCPA compliance frameworks, you have the right to request full account purging. Upon request, all associated Firestore documents, profile preferences, and telemetry logs will be permanently deleted from our active databases.
              </p>
            </section>

            {/* Section 9 */}
            <section id="contact" className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  9. Legal Inquiries & Governance
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have questions regarding these Terms & Conditions or wish to report a security vulnerability, please contact our security and legal compliance team:
              </p>
              <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">CodeOrbit Legal & Compliance Office</p>
                <p className="text-slate-600 dark:text-slate-300">Email: <a href="mailto:legal@codeorbit.app" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">legal@codeorbit.app</a></p>
                <p className="text-slate-600 dark:text-slate-300">Security Inquiries: <a href="mailto:security@codeorbit.app" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">security@codeorbit.app</a></p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1">CodeOrbit Platform v2.4 • Registered Software Engineering Intelligence Suite</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 CodeOrbit (DevGrowth) Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-semibold">
            <button onClick={() => navigate('/privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/contact')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Contact Us
            </button>
            <button onClick={() => navigate('/')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
