import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Database,
  Bot,
  FileText,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Eye,
  Server,
  Key,
  Trash2,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';
import BackgroundMesh from '../components/common/BackgroundMesh';

export const PrivacyPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'overview', title: '1. Executive Privacy Summary', icon: ShieldCheck },
    { id: 'collection', title: '2. Information We Collect', icon: Database },
    { id: 'usage', title: '3. How Data Powers Velocity', icon: Eye },
    { id: 'ai-privacy', title: '4. Gemini AI & Code Privacy', icon: Bot },
    { id: 'firestore', title: '5. Firestore Security & Encryption', icon: Server },
    { id: 'auth-2fa', title: '6. Authentication & TOTP 2FA', icon: Key },
    { id: 'cookies', title: '7. Cookies & Local Storage', icon: FileText },
    { id: 'rights', title: '8. GDPR, CCPA & User Rights', icon: Globe },
    { id: 'deletion', title: '9. Data Portability & Deletion', icon: Trash2 },
    { id: 'contact', title: '10. Privacy Officer Contact', icon: HelpCircle },
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
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              Legal Portal
            </button>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">Privacy Policy</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Policy</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-semibold text-indigo-600 dark:text-indigo-300 transition-all"
            >
              <span>Contact DPO</span>
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
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 absolute top-0 left-0" />
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Developer Data Privacy Charter</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Privacy Policy & Data Security
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              At CodeOrbit (DevGrowth), we treat your engineering roadmap and telemetry data with the same rigorous standard you apply to production infrastructure. We never sell your personal data, never train public AI models on your private snippets, and guarantee end-to-end transparency.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Effective: October 2026
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                GDPR & CCPA Aligned
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                AES-256 Firestore Encrypted
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                Zero Data Brokerage Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Layout: Sticky Quick Nav & Body Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-6 glass-card p-5 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/80 dark:border-slate-800/80">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Privacy Chapters
              </span>
              <span className="text-[11px] font-bold text-indigo-500">10 Articles</span>
            </div>

            <nav className="space-y-1">
              {sections.map((section) => {
                const IconComponent = section.icon;
                const isSelected = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{section.title}</span>
                    </div>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
              <button
                onClick={() => navigate('/contact')}
                className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 text-xs font-bold transition-colors text-center block"
              >
                Have a Privacy Concern? Contact Us
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="w-full py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold transition-colors text-center block"
              >
                Review Terms of Service →
              </button>
            </div>
          </aside>

          {/* Detailed Policy Text Container */}
          <div className="lg:col-span-8 space-y-8 text-sm sm:text-base leading-relaxed">
            {/* Section 1: Overview */}
            <section id="overview" className="glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  1. Executive Privacy Summary
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                CodeOrbit ("the Platform", "we", "our", or "us") provides a technical velocity suite designed for engineers, architects, and technical leaders. This Privacy Policy outlines our transparent commitment to your privacy under international standards including the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>What We Guarantee</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    Your source code queries, personal goals, and leveling assessments are strictly private to your authenticated account ID.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wide">
                    <Lock className="w-4 h-4" />
                    <span>Zero Data Resale</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    We do not sell, rent, monetize, or distribute developer email addresses or platform telemetry to third-party ad networks.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Collection */}
            <section id="collection" className="glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <Database className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  2. Information We Collect
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                We only collect data that is strictly necessary to deliver intelligent engineering progression metrics:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Identity & Authentication:</strong> Email address, cryptographically hashed passwords, and Firebase Auth UID.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Developer Profile & Leveling:</strong> Current engineering level (e.g., L3 Junior to L7 Principal), target title, bio, and portfolio repository references.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Skill Matrix & Sprints:</strong> Evaluated proficiencies across core domains (System Design, Cloud, DevOps, Frontend, Backend, Security) and active daily goals.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">TOTP Two-Factor Secrets:</strong> Base32 secret keys for Google Authenticator verification, encrypted securely within your personal profile document.
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 3: Usage */}
            <section id="usage" className="glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <Eye className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  3. How Data Powers Velocity
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                Your data is used solely to compute personal velocity curves, calculate promotion readiness milestones, deliver tailored roadmap advice, and authenticate your sessions securely. We do not correlate your profile with external marketing profiles.
              </p>
            </section>

            {/* Section 4: Gemini AI Privacy */}
            <section id="ai-privacy" className="glass-card p-6 sm:p-8 border border-purple-200/50 dark:border-purple-800/40 space-y-4 relative overflow-hidden">
              <div className="flex items-center space-x-3 text-purple-600 dark:text-purple-400">
                <Bot className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  4. Google Gemini 2.5 AI & Code Privacy Guarantee
                </h2>
              </div>
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs sm:text-sm text-purple-900 dark:text-purple-200 space-y-2">
                <p className="font-bold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Enterprise AI Data Isolation</span>
                </p>
                <p className="leading-relaxed">
                  When you submit prompts or architecture queries to the AI Advisor, requests are dispatched via encrypted API to Google Gemini models. Under Google Cloud Developer API terms, prompts are <strong>not retained to train foundation models</strong>. Interactions remain strictly ephemeral.
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                We advise engineers to avoid pasting production proprietary secrets, raw customer personally identifiable information (PII), or private decryption keys into AI consultation prompts.
              </p>
            </section>

            {/* Section 5: Firestore Security */}
            <section id="firestore" className="glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <Server className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  5. Firestore Security & Encryption Architecture
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                CodeOrbit utilizes Google Cloud Firebase Cloud Firestore with automatic multi-zone redundancy. All persistent documents are encrypted at rest using AES-256 and protected in transit with TLS 1.3 cryptographic cipher suites.
              </p>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300">
                <p className="text-emerald-500 font-bold mb-1">// Firestore Granular Security Rule Paradigm</p>
                <p>match /users/{'{userId}'} &#123;</p>
                <p className="pl-4">allow read, write: if request.auth != null &amp;&amp; request.auth.uid == userId;</p>
                <p>&#125;</p>
              </div>
            </section>

            {/* Section 6: Authentication & 2FA */}
            <section id="auth-2fa" className="glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <Key className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  6. Authentication & Google Authenticator (TOTP)
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                Two-Factor Authentication utilizes the standard RFC 6238 Time-based One-Time Password algorithm. Secret generation is performed over secure channels, and the platform never transmits your authenticator secret to external analytical trackers.
              </p>
            </section>

            {/* Section 7: Cookies */}
            <section id="cookies" className="glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <FileText className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  7. Cookies & Local Storage Practices
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                CodeOrbit operates with minimal browser footprint. We use HTML5 Local Storage solely for functional requirements:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Theme Preference:</strong> Stores whether you prefer dark or light mode.</li>
                <li><strong className="text-slate-900 dark:text-white">Session Security Token:</strong> Authenticates active sessions between page reloads.</li>
                <li><strong className="text-slate-900 dark:text-white">Demo Mode Flag:</strong> Caches local mock state during zero-config demo exploration.</li>
              </ul>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                We do not deploy invasive third-party cross-site advertising cookies.
              </p>
            </section>

            {/* Section 8: GDPR & CCPA Rights */}
            <section id="rights" className="glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
                <Globe className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  8. Your Rights Under GDPR & CCPA
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">Right to Access & Portability</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Request an automated JSON machine-readable export of all your career milestones and skill logs at any time.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">Right to Rectification</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Correct or recalibrate any skill proficiency score, target milestone, or profile details in real-time.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">Right to Erasure (To Be Forgotten)</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Completely erase all documents, goals, and credentials from our active Firestore database collections.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">Non-Discrimination Guarantee</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Exercising your privacy rights will never result in penalty, service degradation, or discriminatory pricing.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Deletion */}
            <section id="deletion" className="glass-card p-6 sm:p-8 border border-rose-200/50 dark:border-rose-900/40 space-y-4">
              <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400">
                <Trash2 className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  9. Data Retention & Account Deletion Protocol
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                When you initiate an account deletion request, our system marks your user document for immediate purge. All associated subcollections (`skills`, `goals`, `roadmap`, `analytics`) are cascadingly purged within 72 hours, with residual database backups completely cycled out according to Google Cloud retention schedules.
              </p>
            </section>

            {/* Section 10: Contact */}
            <section id="contact" className="glass-card p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-purple-950/20 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  10. Contact Our Privacy Officer
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                For questions regarding this policy, to exercise your GDPR/CCPA data export rights, or to submit security inquiries, reach out directly to our designated Data Protection Officer:
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">CodeOrbit Privacy Governance Desk</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">privacy@codeorbit.dev</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Official Response SLA: Within 24 Business Hours</p>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  Open Contact Form →
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 CodeOrbit (DevGrowth) Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-semibold">
            <button onClick={() => navigate('/terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Terms & Conditions
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

export default PrivacyPage;
