import React, { useState } from 'react';
import { Sparkles, Plus, CheckCircle2, Award, FolderGit2, Clock } from 'lucide-react';

export const ActivityWidget = () => {
  const [activities, setActivities] = useState([
    { id: 1, title: 'Completed "System Design Primer" Goal', time: '2 hours ago', type: 'Goal' },
    { id: 2, title: 'Ranked Up TypeScript Skill to 85%', time: 'Yesterday', type: 'Skill' },
    { id: 3, title: 'Added Project "Cloud Task Pipeline"', time: '2 days ago', type: 'Portfolio' },
    { id: 4, title: 'Finished 14-day consistency streak checkpoint', time: '3 days ago', type: 'Goal' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('All');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setActivities([
      {
        id: Date.now(),
        title: newTitle.trim(),
        time: 'Just now',
        type: 'Goal',
      },
      ...activities,
    ]);
    setNewTitle('');
    setShowAdd(false);
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'Skill':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Portfolio':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
    }
  };

  const filtered = filter === 'All' ? activities : activities.filter(a => a.type === filter);

  return (
    <div className="p-5 sm:p-6 glass-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Recent Growth Milestones
            </h3>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Milestone</span>
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex space-x-1.5 mb-3 text-xs">
          {['All', 'Goal', 'Skill', 'Portfolio'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Quick add form */}
        {showAdd && (
          <form onSubmit={handleAdd} className="mb-3 flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Mastered Redis Caching Strategies"
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg"
            >
              Add
            </button>
          </form>
        )}

        {/* List */}
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {filtered.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            >
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {act.title}
                </p>
                <div className="flex items-center space-x-1 text-[11px] text-slate-400 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>{act.time}</span>
                </div>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getBadgeStyle(
                  act.type
                )} shrink-0`}
              >
                {act.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityWidget;

