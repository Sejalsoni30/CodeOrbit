import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Sliders,
  CheckCircle,
  Sparkles,
  Zap
} from 'lucide-react';

const INITIAL_SKILLS = [
  { id: 1, name: 'React & Next.js', category: 'Frontend', proficiency: 88, priority: 'High' },
  { id: 2, name: 'TypeScript & JavaScript', category: 'Languages', proficiency: 85, priority: 'High' },
  { id: 3, name: 'Node.js & Express', category: 'Backend', proficiency: 82, priority: 'High' },
  { id: 4, name: 'Distributed Systems & Microservices', category: 'Backend', proficiency: 74, priority: 'Medium' },
  { id: 5, name: 'MongoDB & PostgreSQL', category: 'Database', proficiency: 78, priority: 'Medium' },
  { id: 6, name: 'Docker & Kubernetes', category: 'DevOps', proficiency: 65, priority: 'Medium' },
  { id: 7, name: 'Google Gemini & LLM Tooling', category: 'AI & Systems', proficiency: 70, priority: 'High' },
  { id: 8, name: 'CI/CD Pipelines & GitHub Actions', category: 'DevOps', proficiency: 62, priority: 'Normal' },
];

export const SkillTracker = () => {
  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_skills');
      return saved ? JSON.parse(saved) : INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newProficiency, setNewProficiency] = useState(70);

  useEffect(() => {
    localStorage.setItem('devgrowth_skills', JSON.stringify(skills));
  }, [skills]);

  const categories = ['All', 'Frontend', 'Backend', 'Languages', 'Database', 'DevOps', 'AI & Systems'];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill = {
      id: Date.now(),
      name: newSkillName.trim(),
      category: newCategory,
      proficiency: Number(newProficiency),
      priority: 'High',
    };

    setSkills([newSkill, ...skills]);
    setNewSkillName('');
    setNewProficiency(70);
    setShowAddModal(false);
  };

  const handleProficiencyChange = (id, delta) => {
    setSkills(
      skills.map((s) => {
        if (s.id === id) {
          const next = Math.max(0, Math.min(100, s.proficiency + delta));
          return { ...s, proficiency: next };
        }
        return s;
      })
    );
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const filteredSkills = skills.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const avgProficiency = skills.length
    ? Math.round(skills.reduce((acc, curr) => acc + curr.proficiency, 0) / skills.length)
    : 0;
  const masterCount = skills.filter((s) => s.proficiency >= 80).length;

  const getRankBadge = (p) => {
    if (p >= 85) return { label: 'Master', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (p >= 70) return { label: 'Advanced', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
    if (p >= 50) return { label: 'Proficient', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { label: 'Novice', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Skill Proficiency Tracker
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track engineering mastery, adjust ratings, and identify skills for promotion readiness.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Link
            to="/resume"
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold transition-all text-center"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Scan Resume ATS for Skills</span>
          </Link>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-4 glass-card">
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Total Skills</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{skills.length}</p>
        </div>
        <div className="p-3 sm:p-4 glass-card">
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Average Depth</p>
          <p className="text-xl sm:text-2xl font-bold text-indigo-500 mt-0.5">{avgProficiency}%</p>
        </div>
        <div className="p-3 sm:p-4 glass-card">
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">Master Level (&gt;80%)</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-0.5">{masterCount}</p>
        </div>
        <div className="p-3 sm:p-4 glass-card">
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Target Stack</p>
          <p className="text-sm sm:text-lg font-bold text-purple-400 mt-1 truncate">Senior Full Stack</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs touch-pan-x scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                  : 'bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => {
          const badge = getRankBadge(skill.proficiency);
          return (
            <div
              key={skill.id}
              className="p-4 sm:p-5 glass-card-hover group relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white break-words">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${badge.color} shrink-0`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-sm font-extrabold text-indigo-500">
                      {skill.proficiency}%
                    </span>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all p-1"
                      title="Delete skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>

              {/* Controls & Category */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  {skill.category}
                </span>

                {/* +/- quick adjusters */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleProficiencyChange(skill.id, -5)}
                    className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center text-xs"
                    title="Decrease 5%"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleProficiencyChange(skill.id, +5)}
                    className="w-6 h-6 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/20"
                    title="Increase 5%"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="p-12 text-center glass-card">
          <Award className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No matching skills found
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or category filter.
          </p>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-card max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Add New Technical Skill
            </h3>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. GraphQL & Apollo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Languages">Languages</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AI & Systems">AI & Systems</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  <span>Current Proficiency</span>
                  <span className="text-indigo-500 font-bold">{newProficiency}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/25"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTracker;

