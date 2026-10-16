import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FolderGit2,
  Github,
  ExternalLink,
  Star,
  Award,
  Milestone,
  CheckCircle2,
  Share2,
  Printer,
  Mail,
  Linkedin,
  Globe,
  MapPin,
  Sparkles,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  Check,
  Send
} from 'lucide-react';
import UserAvatar from '../components/common/UserAvatar';

// Default mock data for public visitors when local data is empty
const DEFAULT_PORTFOLIO_CONFIG = {
  theme: 'indigo', // 'indigo' | 'emerald' | 'amber' | 'crimson'
  headline: 'Staff Full-Stack & Distributed Systems Architect',
  bio: 'Specialized in building high-throughput distributed architectures, resilient event-streaming microservices, and modern React 18 user interfaces that scale to millions of requests.',
  location: 'San Francisco, CA (Open to Remote)',
  email: 'alex@devgrowth.io',
  githubUrl: 'https://github.com/developer',
  linkedinUrl: 'https://linkedin.com/in/developer',
  websiteUrl: 'https://devgrowth.io',
  availableForHire: true,
  showProofPoints: true,
  showSkills: true,
  showProjects: true,
  showContact: true,
};

const THEME_STYLES = {
  indigo: {
    accent: 'text-indigo-500 dark:text-indigo-400',
    accentBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    accentBorder: 'border-indigo-500/30',
    buttonGrad: 'from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500',
    pill: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
    progressGrad: 'from-indigo-500 via-purple-500 to-indigo-600',
  },
  emerald: {
    accent: 'text-emerald-500 dark:text-emerald-400',
    accentBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    accentBorder: 'border-emerald-500/30',
    buttonGrad: 'from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400',
    pill: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    progressGrad: 'from-emerald-500 via-teal-500 to-cyan-500',
  },
  amber: {
    accent: 'text-amber-500 dark:text-amber-400',
    accentBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    accentBorder: 'border-amber-500/30',
    buttonGrad: 'from-amber-600 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-400',
    pill: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    progressGrad: 'from-amber-500 via-orange-500 to-yellow-500',
  },
  crimson: {
    accent: 'text-rose-500 dark:text-rose-400',
    accentBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    accentBorder: 'border-rose-500/30',
    buttonGrad: 'from-rose-600 via-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-400',
    pill: 'bg-rose-500/15 text-rose-400 border-rose-500/25',
    progressGrad: 'from-rose-500 via-purple-500 to-pink-500',
  },
};

export const PublicPortfolio = () => {
  const { username } = useParams();
  const [copied, setCopied] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Load customizer settings and portfolio data
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_portfolio_config');
      return saved ? { ...DEFAULT_PORTFOLIO_CONFIG, ...JSON.parse(saved) } : DEFAULT_PORTFOLIO_CONFIG;
    } catch {
      return DEFAULT_PORTFOLIO_CONFIG;
    }
  });

  // Load aggregated projects
  const [projects] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_projects');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 1,
        title: 'DevGrowth Career Velocity Engine',
        description: 'Developer career intelligence platform with skill radar analytics, Gemini ATS resume parser, and dynamic portfolio generation.',
        tags: ['React 18', 'Node.js', 'Firebase Firestore', 'Gemini AI', 'TailwindCSS'],
        repoUrl: 'https://github.com/developer/devgrowth',
        liveUrl: 'http://localhost:5173',
        featured: true,
        stars: 184,
      },
      {
        id: 2,
        title: 'Distributed Event Streaming Engine',
        description: 'High-throughput real-time Kafka event processor written in Go, processing 25,000 requests/sec with zero packet drops.',
        tags: ['Go', 'Kafka', 'Redis', 'Docker', 'Prometheus'],
        repoUrl: 'https://github.com/developer/event-streamer',
        liveUrl: '#',
        featured: true,
        stars: 98,
      },
      {
        id: 3,
        title: 'Cloud Native Microservices Mesh',
        description: 'Kubernetes-orchestrated multi-region cluster with Envoy sidecar service mesh, mutual TLS, and OpenTelemetry tracing.',
        tags: ['Kubernetes', 'Envoy', 'gRPC', 'Terraform', 'AWS'],
        repoUrl: 'https://github.com/developer/k8s-mesh',
        liveUrl: '#',
        featured: true,
        stars: 76,
      },
    ];
  });

  // Load aggregated completed roadmap proof points
  const [proofPoints] = useState(() => {
    try {
      const rawRoadmap = localStorage.getItem('devgrowth_roadmap');
      if (rawRoadmap) {
        const milestones = JSON.parse(rawRoadmap);
        const collected = [];
        milestones.forEach((m) => {
          (m.subtasks || []).forEach((st) => {
            if (st.done) {
              collected.push({
                text: st.text,
                milestone: m.title,
                quarter: m.date || 'Q1',
              });
            }
          });
        });
        if (collected.length > 0) return collected;
      }
    } catch {}

    return [
      { text: 'Solve 75 curated LeetCode Blind algorithms & dynamic programming patterns', milestone: 'Foundations & Algorithm Mastery', quarter: 'Q1' },
      { text: 'Architect reusable design system & TailwindCSS token design architecture', milestone: 'Production Full-Stack Architecture', quarter: 'Q2' },
      { text: 'Build production auth with JWT token rotation & Redis distributed session store', milestone: 'Production Full-Stack Architecture', quarter: 'Q2' },
      { text: 'Implement Kafka event bus with consumer group rebalancing & dead-letter queue', milestone: 'Cloud Infrastructure & High Availability', quarter: 'Q3' },
      { text: 'Configure Redis distributed lock for transaction deduplication under 25k req/s load', milestone: 'Cloud Infrastructure & High Availability', quarter: 'Q3' },
      { text: 'Author RFC on company-wide AI integration architecture and disaster recovery', milestone: 'Staff Engineer & System Leadership', quarter: 'Q4' },
    ];
  });

  // Load aggregated skills
  const [skills] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_skills');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 1, name: 'React 18 & Next.js', category: 'Frontend', proficiency: 92 },
      { id: 2, name: 'TypeScript & JavaScript', category: 'Languages', proficiency: 88 },
      { id: 3, name: 'Node.js & Express APIs', category: 'Backend', proficiency: 86 },
      { id: 4, name: 'Distributed Systems & Kafka', category: 'AI & Systems', proficiency: 84 },
      { id: 5, name: 'Docker & Kubernetes', category: 'DevOps', proficiency: 78 },
      { id: 6, name: 'PostgreSQL & Redis Caching', category: 'Database', proficiency: 82 },
      { id: 7, name: 'Google Gemini AI & LLM Tooling', category: 'AI & Systems', proficiency: 85 },
      { id: 8, name: 'AWS & Cloud Architecture', category: 'DevOps', proficiency: 80 },
    ];
  });

  const themeStyle = THEME_STYLES[config.theme] || THEME_STYLES.indigo;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactModalOpen(false);
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 2000);
  };

  const avgProficiency = skills.length
    ? Math.round(skills.reduce((acc, curr) => acc + curr.proficiency, 0) / skills.length)
    : 85;

  return (
    <div className="min-h-screen pb-16 selection:bg-indigo-500/25 selection:text-indigo-400">
      {/* Top Floating Action Bar for Visitors / Sharing */}
      <div className="no-print sticky top-3 z-30 max-w-5xl mx-auto px-4 mb-6">
        <div className="glass-card p-2.5 sm:p-3 flex items-center justify-between border border-slate-200/90 dark:border-slate-800 shadow-xl rounded-2xl">
          <div className="flex items-center space-x-2">
            <Link
              to="/portfolio"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
            >
              <span>← Back to Builder</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Public Live Portfolio</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* One-Click PDF Export */}
            <button
              onClick={handlePrintPdf}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                copied
                  ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Public Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Printable Portfolio Sheet Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 print-full-width">
        {/* Executive Header Card */}
        <section className="glass-card p-6 sm:p-8 relative overflow-hidden print-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center space-x-4 sm:space-x-5 min-w-0 flex-1">
              {/* Profile Avatar with Verified Ring */}
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  alt="Developer Avatar"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bio & Details */}
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Alex Developer
                  </h1>
                  <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${themeStyle.pill}`}>
                    L6 Staff Engineer
                  </span>
                </div>

                <p className={`text-xs sm:text-sm font-bold ${themeStyle.accent}`}>
                  {config.headline}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  {config.bio}
                </p>

                {/* Location & Status Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{config.location}</span>
                  </span>
                  {config.availableForHire && (
                    <span className="flex items-center space-x-1 text-emerald-500 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available for Staff & Lead Roles</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Connect & Social Links (Hidden on print) */}
            <div className="no-print flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setContactModalOpen(true)}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-white text-xs font-extrabold shadow-lg bg-gradient-to-r ${themeStyle.buttonGrad} transition-all`}
              >
                <span>Connect / Hire Me</span>
              </button>

              <div className="flex items-center space-x-2">
                {config.githubUrl && (
                  <a
                    href={config.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {config.linkedinUrl && (
                  <a
                    href={config.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {config.email && (
                  <a
                    href={`mailto:${config.email}`}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
              <p className="text-[10px] uppercase font-bold text-slate-400">Mastery Index</p>
              <p className="text-xl font-extrabold text-indigo-500 mt-0.5">{avgProficiency}%</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
              <p className="text-[10px] uppercase font-bold text-slate-400">Roadmap Proofs</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">{proofPoints.length} Completed</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
              <p className="text-[10px] uppercase font-bold text-slate-400">Featured Systems</p>
              <p className="text-xl font-extrabold text-purple-400 mt-0.5">{projects.length} Repos</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
              <p className="text-[10px] uppercase font-bold text-slate-400">Production Streak</p>
              <p className="text-xl font-extrabold text-amber-400 mt-0.5">14-Day Active</p>
            </div>
          </div>
        </section>

        {/* Section 1: Aggregated Completed Roadmap Proof Points */}
        {config.showProofPoints && (
          <section className="space-y-4 print-break-inside-avoid">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Completed Roadmap Proof Points & Deliverables
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2">
              Verified technical milestones achieved through structured career roadmap execution.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {proofPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 glass-card-hover border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-start space-x-3 print-card"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {item.text}
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                      <span className="font-extrabold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded">
                        {item.quarter}
                      </span>
                      <span>•</span>
                      <span className="truncate">{item.milestone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Aggregated Skill Stats & Proficiency Breakdown */}
        {config.showSkills && (
          <section className="space-y-4 print-break-inside-avoid">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Technical Stack & Skill Proficiency Radar
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2">
              Quantitative proficiency ratings across core architecture, backend systems, and frontend stacks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 glass-card-hover border border-slate-200/80 dark:border-slate-800 rounded-2xl flex flex-col justify-between print-card"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-slate-900 dark:text-white truncate">{skill.name}</span>
                      <span className={themeStyle.accent}>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${themeStyle.progressGrad}`}
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
                    {skill.category}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Aggregated GitHub Repositories & Systems */}
        {config.showProjects && (
          <section className="space-y-4 print-break-inside-avoid">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Production-Grade Engineering Repositories
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2">
              Open-source repositories, distributed microservices, and system architecture benchmarks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 glass-card-hover border border-slate-200/80 dark:border-slate-800 rounded-2xl flex flex-col justify-between group print-card"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 flex items-center space-x-1">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags?.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold">
                    <div className="flex items-center space-x-3">
                      {proj.repoUrl && proj.repoUrl !== '#' && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center space-x-1 text-indigo-500 hover:text-indigo-400"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                      )}
                      {proj.liveUrl && proj.liveUrl !== '#' && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center space-x-1 text-slate-400 hover:text-slate-200"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live System</span>
                        </a>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-400">
                      ★ {proj.stars || 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Contact / Hire Me CTA */}
        {config.showContact && (
          <section className="no-print p-6 sm:p-8 rounded-2xl glass-card bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/30 text-center space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Interested in collaborating or discussing staff opportunities?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Open to high-impact technical leadership, staff architecture roles, and distributed systems consulting.
            </p>
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setContactModalOpen(true)}
                className={`px-6 py-2.5 rounded-xl text-white text-xs font-extrabold shadow-lg bg-gradient-to-r ${themeStyle.buttonGrad}`}
              >
                Get in Touch
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Recruiter / Visitor Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-card max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Contact Alex Developer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Send a direct recruitment inquiry or project collaboration note.
            </p>

            {contactSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Message Dispatched!</h4>
                <p className="text-xs text-slate-500">Thank you for reaching out. Alex will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins (Tech Talent Lead)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Work Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="s.jenkins@enterprise.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Message / Opportunity Scope
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="We loved your Kafka streaming benchmarks and would love to chat regarding our Staff Architect opening..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="flex space-x-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(false)}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 px-4 py-2 rounded-xl text-white text-xs font-bold bg-gradient-to-r ${themeStyle.buttonGrad}`}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicPortfolio;
