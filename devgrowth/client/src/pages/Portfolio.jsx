import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Plus,
  Star,
  ExternalLink,
  Github,
  Trash2,
  Award,
  Milestone,
  CheckCircle2,
  Share2,
  Printer,
  Sliders,
  Sparkles,
  Eye,
  Check,
  Copy,
  Globe,
  MapPin,
  Mail,
  Linkedin,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  ArrowRight
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'DevGrowth Career Velocity Engine',
    description: 'Developer career acceleration intelligence platform featuring skill radar analytics, Gemini ATS resume parser, and dynamic portfolio generation.',
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
    description: 'Kubernetes-orchestrated microservices cluster with Envoy service mesh, mutual TLS, and OpenTelemetry distributed tracing.',
    tags: ['Kubernetes', 'Envoy', 'gRPC', 'Terraform', 'AWS'],
    repoUrl: 'https://github.com/developer/k8s-mesh',
    liveUrl: '#',
    featured: false,
    stars: 76,
  },
  {
    id: 4,
    title: 'AI Code Review GitHub Action',
    description: 'Automated CI bot that analyzes pull requests against OWASP security patterns and generates automated refactoring proposals.',
    tags: ['TypeScript', 'Gemini 2.5 Flash', 'GitHub API', 'Docker'],
    repoUrl: 'https://github.com/developer/ai-reviewer',
    liveUrl: '#',
    featured: false,
    stars: 215,
  },
];

const DEFAULT_CONFIG = {
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

const THEMES = [
  { id: 'indigo', name: 'Cyber Indigo', color: 'bg-indigo-600', border: 'border-indigo-500' },
  { id: 'emerald', name: 'Emerald Aurora', color: 'bg-emerald-600', border: 'border-emerald-500' },
  { id: 'amber', name: 'Solar Amber', color: 'bg-amber-600', border: 'border-amber-500' },
  { id: 'crimson', name: 'Nebula Crimson', color: 'bg-rose-600', border: 'border-rose-500' },
];

export const Portfolio = () => {
  // Mode: 'builder' | 'preview'
  const [activeView, setActiveView] = useState('builder');
  const [copied, setCopied] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  // Projects state
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Customizer Configuration State
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_portfolio_config');
      return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  // Aggregated Completed Roadmap Proof Points
  const [proofPoints, setProofPoints] = useState(() => {
    try {
      const rawRoadmap = localStorage.getItem('devgrowth_roadmap');
      if (rawRoadmap) {
        const milestones = JSON.parse(rawRoadmap);
        const collected = [];
        milestones.forEach((m) => {
          (m.subtasks || []).forEach((st) => {
            if (st.done) {
              collected.push({
                id: `st-${Math.random()}`,
                text: st.text,
                milestone: m.title,
                quarter: m.date || 'Q1',
                featured: true,
              });
            }
          });
        });
        if (collected.length > 0) return collected;
      }
    } catch {}

    return [
      { id: 'p1', text: 'Solve 75 curated LeetCode Blind algorithms & dynamic programming patterns', milestone: 'Foundations & Algorithm Mastery', quarter: 'Q1', featured: true },
      { id: 'p2', text: 'Architect reusable design system & TailwindCSS token design architecture', milestone: 'Production Full-Stack Architecture', quarter: 'Q2', featured: true },
      { id: 'p3', text: 'Build production auth with JWT token rotation & Redis distributed session store', milestone: 'Production Full-Stack Architecture', quarter: 'Q2', featured: true },
      { id: 'p4', text: 'Implement Kafka event bus with consumer group rebalancing & dead-letter queue', milestone: 'Cloud Infrastructure & High Availability', quarter: 'Q3', featured: true },
      { id: 'p5', text: 'Configure Redis distributed lock for transaction deduplication under 25k req/s load', milestone: 'Cloud Infrastructure & High Availability', quarter: 'Q3', featured: true },
      { id: 'p6', text: 'Author RFC on company-wide AI integration architecture and disaster recovery', milestone: 'Staff Engineer & System Leadership', quarter: 'Q4', featured: true },
    ];
  });

  // Aggregated Skill Stats
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

  // New project modal form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('React 18, TypeScript, Express');
  const [newRepoUrl, setNewRepoUrl] = useState('https://github.com/');
  const [newLiveUrl, setNewLiveUrl] = useState('https://');

  useEffect(() => {
    localStorage.setItem('devgrowth_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('devgrowth_portfolio_config', JSON.stringify(config));
  }, [config]);

  const handleCopyPublicLink = () => {
    const publicUrl = `${window.location.origin}/portfolio/public`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedTags = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['Full Stack'],
      repoUrl: newRepoUrl.trim() || '#',
      liveUrl: newLiveUrl.trim() || '#',
      featured: false,
      stars: 1,
    };

    setProjects([newProject, ...projects]);
    setNewTitle('');
    setNewDescription('');
    setShowAddProject(false);
  };

  const toggleStar = (id) => {
    setProjects(
      projects.map((p) =>
        p.id === id
          ? {
              ...p,
              featured: !p.featured,
              stars: p.featured ? Math.max(1, p.stars - 1) : p.stars + 1,
            }
          : p
      )
    );
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const toggleProofPoint = (idx) => {
    const updated = [...proofPoints];
    updated[idx].featured = !updated[idx].featured;
    setProofPoints(updated);
  };

  const featuredProofPoints = proofPoints.filter((p) => p.featured);
  const avgProficiency = skills.length
    ? Math.round(skills.reduce((acc, curr) => acc + curr.proficiency, 0) / skills.length)
    : 85;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="no-print flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-6 glass-card border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Dynamic Portfolio Builder</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Roadmap Aggregated
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Portfolio & Public Showcase
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Automatically aggregates completed roadmap proof points, GitHub repositories, and skill proficiency radar into a customizable, shareable public portfolio with one-click PDF export.
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 z-10">
          {/* One-Click PDF Export */}
          <button
            onClick={handlePrintPdf}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            title="Download formatted executive PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          {/* Copy Shareable Link */}
          <button
            onClick={handleCopyPublicLink}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>

          {/* Open Public Page */}
          <Link
            to="/portfolio/public"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 px-3.5 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Open Public View ↗</span>
          </Link>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="no-print flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView('builder')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'builder'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Portfolio Customizer & Editor</span>
          </button>

          <button
            onClick={() => setActiveView('preview')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Interactive Preview</span>
          </button>
        </div>

        {activeView === 'builder' && (
          <button
            onClick={() => setShowAddProject(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* VIEW 1: PORTFOLIO BUILDER & CUSTOMIZER */}
      {activeView === 'builder' && (
        <div className="space-y-6">
          {/* Customization Settings Studio */}
          <div className="glass-card p-4 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Portfolio Design System & Profile Settings
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select color themes, edit your recruiter headline, and toggle sections for your shareable page.
                </p>
              </div>

              {/* Theme Picker */}
              <div className="flex items-center space-x-2">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setConfig({ ...config, theme: t.id })}
                    className={`w-6 h-6 rounded-full ${t.color} transition-all ${
                      config.theme === t.id
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-md'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={t.name}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Headline */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={(e) => setConfig({ ...config, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Location & Availability
                </label>
                <input
                  type="text"
                  value={config.location}
                  onChange={(e) => setConfig({ ...config, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Bio Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Executive Engineering Summary (Bio)
                </label>
                <textarea
                  value={config.bio}
                  onChange={(e) => setConfig({ ...config, bio: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Social URLs */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={config.githubUrl}
                  onChange={(e) => setConfig({ ...config, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={config.linkedinUrl}
                  onChange={(e) => setConfig({ ...config, linkedinUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Section Visibility Toggles */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Public Section Toggles
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showProofPoints}
                    onChange={(e) => setConfig({ ...config, showProofPoints: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <span>Show Roadmap Proof Points</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showSkills}
                    onChange={(e) => setConfig({ ...config, showSkills: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <span>Show Skill Stats Radar</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showProjects}
                    onChange={(e) => setConfig({ ...config, showProjects: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <span>Show GitHub Repositories</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.availableForHire}
                    onChange={(e) => setConfig({ ...config, availableForHire: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <span>Available for Hire Badge</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 1: Aggregated Completed Roadmap Proof Points Manager */}
          <div className="glass-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Milestone className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Aggregated Roadmap Proof Points ({featuredProofPoints.length} featured)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Proof points automatically synced from your completed roadmap checkpoints. Toggle to show on public portfolio.
                </p>
              </div>

              <Link
                to="/roadmap"
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Edit Roadmap</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {proofPoints.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleProofPoint(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                    item.featured
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-900 dark:text-white'
                      : 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 text-slate-400'
                  }`}
                >
                  <button
                    type="button"
                    className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                      item.featured
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'border-slate-500'
                    }`}
                  >
                    {item.featured && <Check className="w-3 h-3" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold leading-snug">{item.text}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1">
                      <span className="font-extrabold text-indigo-400">{item.quarter}</span>
                      <span>•</span>
                      <span className="truncate">{item.milestone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Aggregated Skills Overview */}
          <div className="glass-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Aggregated Skill Mastery Radar
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {skills.length} skills tracked • Average depth: {avgProficiency}%
                </p>
              </div>

              <Link
                to="/skills"
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Edit Skills</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.slice(0, 8).map((skill) => (
                <div key={skill.id} className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-900 dark:text-white truncate">{skill.name}</span>
                    <span className="text-indigo-400">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Featured GitHub Repositories */}
          <div className="glass-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Featured GitHub Repositories ({projects.length})
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage repositories featured on your public showcase and one-click PDF export.
                </p>
              </div>

              <button
                onClick={() => setShowAddProject(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
              >
                + Add Repository
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 sm:p-5 glass-card-hover flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white break-words">
                          {proj.title}
                        </h4>
                        {proj.featured && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center space-x-1 shrink-0">
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          onClick={() => toggleStar(proj.id)}
                          className="p-1 text-slate-400 hover:text-amber-400"
                          title="Toggle Featured"
                        >
                          <Star className={`w-4 h-4 ${proj.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1 text-slate-400 hover:text-rose-500"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.tags?.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center space-x-3">
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 text-indigo-400 hover:underline"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                      {proj.liveUrl && proj.liveUrl !== '#' && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center space-x-1 text-slate-400 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">★ {proj.stars || 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: LIVE INTERACTIVE PREVIEW */}
      {activeView === 'preview' && (
        <div className="space-y-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold">
              <Eye className="w-4 h-4" />
              <span>Live Public Portfolio Preview ({config.theme.toUpperCase()} Theme)</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrintPdf}
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs"
              >
                Export PDF
              </button>
              <button
                onClick={handleCopyPublicLink}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
              >
                {copied ? 'Copied' : 'Share Link'}
              </button>
            </div>
          </div>

          {/* Embedded Render of Portfolio Preview */}
          <div className="glass-card p-6 sm:p-8 space-y-8 border border-slate-200/90 dark:border-slate-800 rounded-3xl">
            {/* Header Preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Alex Developer</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                      L6 Staff
                    </span>
                  </div>
                  <p className="text-xs font-bold text-indigo-500">{config.headline}</p>
                  <p className="text-xs text-slate-500 max-w-lg">{config.bio}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a href={config.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-400">
                  <Github className="w-4 h-4" />
                </a>
                <a href={config.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-400">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Proof Points Preview */}
            {config.showProofPoints && (
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Roadmap Proof Points</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featuredProofPoints.map((item, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start space-x-2.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.text}</p>
                        <p className="text-[10px] text-slate-400">{item.quarter} • {item.milestone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Radar Preview */}
            {config.showSkills && (
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>Technical Proficiency Stats</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {skills.slice(0, 8).map((s) => (
                    <div key={s.id} className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="truncate">{s.name}</span>
                        <span className="text-indigo-400">{s.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Repositories Preview */}
            {config.showProjects && (
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  <span>Production Repositories</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex justify-between font-bold text-sm">
                        <span>{proj.title}</span>
                        <span className="text-xs text-slate-400">★ {proj.stars}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{proj.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {proj.tags?.map((t, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-card max-w-lg w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Add GitHub Project to Portfolio
            </h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus Engine (Raft)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Description & Key Architecture Decisions
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Key technical achievements, architectural choices, and quantifiable metrics..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Tech Stack Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="React 18, Node.js, Redis, Docker"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={newRepoUrl}
                    onChange={(e) => setNewRepoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={newLiveUrl}
                    onChange={(e) => setNewLiveUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/25"
                >
                  Save to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
