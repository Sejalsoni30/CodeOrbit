import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Star,
  ExternalLink,
  Github,
  Trash2,
  Tag,
  Code2
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'DevGrowth Intelligence Platform',
    description: 'Career acceleration engine featuring developer velocity metrics, skill proficiency radar, and Gemini AI career advisory.',
    tags: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Gemini AI', 'Tailwind CSS'],
    repoUrl: 'https://github.com/developer/devgrowth',
    liveUrl: 'http://localhost:5173',
    featured: true,
    stars: 142,
  },
  {
    id: 2,
    title: 'Distributed Event Streaming Engine',
    description: 'High-throughput real-time Kafka event processor written in Go, capable of processing 25,000 requests/sec with zero packet drop.',
    tags: ['Go', 'Kafka', 'Redis', 'Docker', 'Prometheus'],
    repoUrl: 'https://github.com/developer/event-streamer',
    liveUrl: '#',
    featured: true,
    stars: 89,
  },
  {
    id: 3,
    title: 'Cloud Native Microservices Mesh',
    description: 'Kubernetes-orchestrated microservices cluster with Envoy service mesh, mutual TLS, and OpenTelemetry distributed tracing.',
    tags: ['Kubernetes', 'Envoy', 'gRPC', 'Terraform', 'AWS'],
    repoUrl: 'https://github.com/developer/k8s-mesh',
    liveUrl: '#',
    featured: false,
    stars: 64,
  },
  {
    id: 4,
    title: 'AI Code Review GitHub Action',
    description: 'Automated CI bot that analyzes pull requests against OWASP security patterns and generates automated refactoring proposals.',
    tags: ['TypeScript', 'Gemini 1.5 Pro', 'GitHub API', 'Docker'],
    repoUrl: 'https://github.com/developer/ai-reviewer',
    liveUrl: '#',
    featured: false,
    stars: 215,
  },
];

export const Portfolio = () => {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [activeTag, setActiveTag] = useState('All');
  const [showAdd, setShowAdd] = useState(false);

  // New project form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('React, TypeScript, Express');
  const [repoUrl, setRepoUrl] = useState('https://github.com/');
  const [liveUrl, setLiveUrl] = useState('https://');

  useEffect(() => {
    localStorage.setItem('devgrowth_projects', JSON.stringify(projects));
  }, [projects]);

  const allTags = ['All', 'React 18', 'Node.js', 'Go', 'Kubernetes', 'Gemini AI', 'Docker'];

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['Full Stack'],
      repoUrl: repoUrl.trim() || '#',
      liveUrl: liveUrl.trim() || '#',
      featured: false,
      stars: 1,
    };

    setProjects([newProject, ...projects]);
    setTitle('');
    setDescription('');
    setShowAdd(false);
  };

  const toggleStar = (id) => {
    setProjects(
      projects.map((p) =>
        p.id === id
          ? {
              ...p,
              featured: !p.featured,
              stars: p.featured ? p.stars - 1 : p.stars + 1,
            }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const filtered = projects.filter((p) => {
    if (activeTag === 'All') return true;
    return p.tags.some((t) => t.toLowerCase().includes(activeTag.toLowerCase()));
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-indigo-500" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineering Portfolio Showcase
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Production-grade systems, open source tools, and architecture repositories.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs touch-pan-x scrollbar-none">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTag === tag
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : 'bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-4 sm:p-6 glass-card-hover flex flex-col justify-between group relative"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors break-words">
                    {proj.title}
                  </h3>
                  {proj.featured && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center space-x-1 shrink-0">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => toggleStar(proj.id)}
                    className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Star project"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        proj.featured ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {proj.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                {proj.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-medium border border-slate-200/50 dark:border-slate-700/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links and Stats */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold">
              <div className="flex flex-wrap gap-2.5 sm:gap-4">
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-indigo-500 hover:text-indigo-400 transition-colors text-[11px] sm:text-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                {proj.liveUrl !== '#' && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 transition-colors text-[11px] sm:text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <span className="text-slate-400 text-[11px]">
                ★ {proj.stars}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-card max-w-lg w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Add Portfolio Project
            </h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus Engine (Raft)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key technical achievements, architectural choices, and metrics..."
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
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
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
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/25"
                >
                  Save Project
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

