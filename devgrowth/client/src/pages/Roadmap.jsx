import React, { useState, useEffect } from 'react';
import {
  Milestone,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Sparkles,
  ChevronRight,
  Target,
  Layers
} from 'lucide-react';

const INITIAL_MILESTONES = [
  {
    id: 1,
    title: 'Foundations & Algorithm Mastery',
    date: 'Q1',
    status: 'Completed',
    summary: 'Master dynamic programming, graph traversal, and computational complexity.',
    subtasks: [
      { text: 'Solve 75 curated LeetCode Blind problems', done: true },
      { text: 'Understand Trie & Union-Find data structures', done: true },
      { text: 'Pass mock algorithmic bar raiser interview', done: true },
    ],
  },
  {
    id: 2,
    title: 'Production Full-Stack Architecture',
    date: 'Q2',
    status: 'In Progress',
    summary: 'Design modular React architectures, SSR with Next.js, and Express microservices.',
    subtasks: [
      { text: 'Build production auth with JWT rotation & Redis', done: true },
      { text: 'Architect reusable design system & Tailwind tokens', done: true },
      { text: 'Implement automated integration testing with Vitest', done: false },
    ],
  },
  {
    id: 3,
    title: 'Cloud Infrastructure & High Availability',
    date: 'Q3',
    status: 'Upcoming',
    summary: 'Deploy distributed event-driven services on Docker, Kubernetes, and AWS.',
    subtasks: [
      { text: 'Implement Kafka event streaming and consumer groups', done: false },
      { text: 'Configure CI/CD automated staging & canary deploy pipelines', done: false },
      { text: 'Instrument OpenTelemetry distributed tracing & Grafana', done: false },
    ],
  },
  {
    id: 4,
    title: 'Staff Engineer & System Leadership',
    date: 'Q4',
    status: 'Upcoming',
    summary: 'Drive cross-functional technical RFCs, mentor senior developers, and shape org roadmaps.',
    subtasks: [
      { text: 'Author RFC on company-wide AI integration architecture', done: false },
      { text: 'Design multi-region disaster recovery strategy', done: false },
      { text: 'Lead post-mortem culture and SLO/SLA observability', done: false },
    ],
  },
];

export const Roadmap = () => {
  const [milestones, setMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_roadmap');
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });

  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newQuarter, setNewQuarter] = useState('Q4');
  const [newSummary, setNewSummary] = useState('');

  useEffect(() => {
    localStorage.setItem('devgrowth_roadmap', JSON.stringify(milestones));
  }, [milestones]);

  const toggleStatus = (id) => {
    setMilestones(
      milestones.map((m) => {
        if (m.id === id) {
          const next =
            m.status === 'Completed'
              ? 'In Progress'
              : m.status === 'In Progress'
              ? 'Upcoming'
              : 'Completed';
          return { ...m, status: next };
        }
        return m;
      })
    );
  };

  const toggleSubtask = (milestoneId, subIndex) => {
    setMilestones(
      milestones.map((m) => {
        if (m.id === milestoneId) {
          const updated = [...m.subtasks];
          updated[subIndex] = { ...updated[subIndex], done: !updated[subIndex].done };
          return { ...m, subtasks: updated };
        }
        return m;
      })
    );
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newM = {
      id: Date.now(),
      title: newTitle.trim(),
      date: newQuarter,
      status: 'Upcoming',
      summary: newSummary.trim() || 'Custom strategic engineering milestone.',
      subtasks: [
        { text: 'Establish technical scope & design document', done: false },
        { text: 'Execute implementation and test benchmarks', done: false },
      ],
    };

    setMilestones([...milestones, newM]);
    setNewTitle('');
    setNewSummary('');
    setShowAdd(false);
  };

  const completedCount = milestones.filter((m) => m.status === 'Completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'In Progress':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Milestone className="w-5 h-5 text-indigo-500" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Staff Engineer Career Roadmap
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Quarterly engineering checkpoints and technical leadership objectives.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* Progress banner */}
      <div className="p-5 glass-card bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Target Level: L6 Staff Engineer
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {completedCount} of {milestones.length} Strategic Milestones Achieved ({progressPercent}%)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">Target ETA: Q4 2026</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Timeline view */}
      <div className="relative border-l-2 border-indigo-500/30 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
        {milestones.map((m) => (
          <div key={m.id} className="relative group">
            {/* Status node */}
            <button
              onClick={() => toggleStatus(m.id)}
              className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                m.status === 'Completed'
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                  : m.status === 'In Progress'
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20 animate-pulse'
                  : 'bg-slate-700 text-slate-400 ring-4 ring-slate-800'
              }`}
              title="Click to toggle status"
            >
              {m.status === 'Completed' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Circle className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Card Content */}
            <div className="p-6 glass-card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold text-indigo-500 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                    {m.date}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {m.title}
                  </h4>
                </div>
                <button
                  onClick={() => toggleStatus(m.id)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border self-start sm:self-auto cursor-pointer ${getStatusBadge(
                    m.status
                  )}`}
                >
                  {m.status} (Click to toggle)
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {m.summary}
              </p>

              {/* Subtasks */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Deliverables & Proof Points:
                </p>
                {m.subtasks?.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => toggleSubtask(m.id, sIdx)}
                    className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-400 transition-colors"
                  >
                    <button
                      type="button"
                      className="shrink-0 focus:outline-none"
                    >
                      {st.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </button>
                    <span className={st.done ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                      {st.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Milestone Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-card max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Add Career Milestone
            </h3>
            <form onSubmit={handleAddMilestone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master Domain-Driven Design & Event Sourcing"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Target Quarter
                </label>
                <select
                  value={newQuarter}
                  onChange={(e) => setNewQuarter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Description / Focus Summary
                </label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Key technical capabilities and business outcomes..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
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
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;

