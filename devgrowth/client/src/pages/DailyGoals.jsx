import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Plus,
  Flame,
  CheckCircle2,
  Circle,
  Trash2,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';

const INITIAL_GOALS = [
  { id: 1, title: 'Solve 1 Medium LeetCode Dynamic Programming problem', completed: true, category: 'Algorithms', priority: 'High' },
  { id: 2, title: 'Read Chapter 4 of Designing Data-Intensive Applications', completed: false, category: 'System Design', priority: 'High' },
  { id: 3, title: 'Implement JWT refresh token rotation with Redis store', completed: true, category: 'Backend', priority: 'Medium' },
  { id: 4, title: 'Review PR & code review architecture checklist for team', completed: false, category: 'Leadership', priority: 'Normal' },
  { id: 5, title: 'Build Gemini streaming chat completion demo endpoint', completed: true, category: 'AI Tools', priority: 'High' },
];

export const DailyGoals = () => {
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_goals');
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  const [inputTitle, setInputTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Coding');
  const [selectedPriority, setSelectedPriority] = useState('High');
  const [filter, setFilter] = useState('All');
  const [streakCount, setStreakCount] = useState(14);

  useEffect(() => {
    localStorage.setItem('devgrowth_goals', JSON.stringify(goals));
  }, [goals]);

  const toggleGoal = (id) => {
    setGoals(
      goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newGoal = {
      id: Date.now(),
      title: inputTitle.trim(),
      completed: false,
      category: selectedCategory,
      priority: selectedPriority,
    };

    setGoals([newGoal, ...goals]);
    setInputTitle('');
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setGoals(goals.filter((g) => g.id !== id));
  };

  const clearCompleted = () => {
    setGoals(goals.filter((g) => !g.completed));
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredGoals = goals.filter((g) => {
    if (filter === 'Active') return !g.completed;
    if (filter === 'Completed') return g.completed;
    return true;
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case 'Medium':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-indigo-500" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Daily Sprint Goals & Habit Momentum
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build compounding engineering consistency. Track daily wins and protect your streak.
          </p>
        </div>

        {/* Streak counter badge */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 self-start sm:self-auto">
          <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              {streakCount}-Day Streak
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Personal best: 28 days
            </div>
          </div>
        </div>
      </div>

      {/* Progress overview banner */}
      <div className="p-5 glass-card bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Today's Sprint Velocity
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {completedCount} of {totalCount} tasks completed ({progressPercent}%)
            </h3>
          </div>
          {progressPercent === 100 && totalCount > 0 && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sprint Goals Crushed! 🎉</span>
            </span>
          )}
        </div>

        <div className="w-full h-3 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Inline Goal Creation Form */}
      <form onSubmit={handleAddGoal} className="p-4 glass-card space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Add new goal... (e.g. Implement distributed rate limiter in Go)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="grid grid-cols-2 sm:flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none w-full sm:w-auto"
            >
              <option value="Coding">Coding</option>
              <option value="Algorithms">Algorithms</option>
              <option value="System Design">System Design</option>
              <option value="Backend">Backend</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Reading">Reading</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none w-full sm:w-auto"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Normal">Normal</option>
            </select>

            <button
              type="submit"
              className="col-span-2 sm:col-span-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>
      </form>

      {/* Filter and Clear row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex space-x-1.5">
          {['All', 'Active', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-slate-400 hover:text-rose-500 font-semibold transition-colors"
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredGoals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`p-3.5 sm:p-4 glass-card-hover flex items-center justify-between cursor-pointer group transition-all ${
              goal.completed ? 'opacity-70 dark:opacity-60 bg-slate-50/50 dark:bg-slate-900/40' : ''
            }`}
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1 mr-3">
              <button
                type="button"
                className="shrink-0 transition-transform group-hover:scale-110 focus:outline-none"
              >
                {goal.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500" />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs sm:text-sm font-semibold transition-all break-words ${
                    goal.completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {goal.title}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                  <span className="font-medium text-indigo-500">{goal.category}</span>
                  <span>•</span>
                  <span className={`px-1.5 py-0.2 rounded font-bold border ${getPriorityStyle(goal.priority)}`}>
                    {goal.priority} Priority
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => handleDelete(goal.id, e)}
              className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1.5 transition-all"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filteredGoals.length === 0 && (
          <div className="p-12 text-center glass-card">
            <CheckSquare className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No tasks match "{filter}"
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Add a new goal above to keep making progress!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyGoals;

