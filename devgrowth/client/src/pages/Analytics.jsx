import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Calendar,
  Award,
  Layers
} from 'lucide-react';

export const Analytics = () => {
  const [timeframe, setTimeframe] = useState('Weekly');
  const [hoveredDay, setHoveredDay] = useState(null);

  const weeklyData = [
    { day: 'Mon', hours: 4.5, tasks: 3, label: 'Algorithms & Refactoring' },
    { day: 'Tue', hours: 6.0, tasks: 4, label: 'Microservices Design' },
    { day: 'Wed', hours: 5.2, tasks: 3, label: 'React Performance Tuning' },
    { day: 'Thu', hours: 7.8, tasks: 5, label: 'Docker Containerization & CI/CD' },
    { day: 'Fri', hours: 4.0, tasks: 2, label: 'Code Reviews & PR Feedback' },
    { day: 'Sat', hours: 6.5, tasks: 4, label: 'Gemini AI Assistant Integration' },
    { day: 'Sun', hours: 3.5, tasks: 2, label: 'Distributed Systems Reading' },
  ];

  const competencies = [
    { name: 'Distributed Systems & Microservices', score: 84, color: 'from-indigo-500 to-purple-500', change: '+12%' },
    { name: 'Frontend Architecture & React 18', score: 88, color: 'from-blue-500 to-cyan-500', change: '+8%' },
    { name: 'Database Optimization & SQL/NoSQL', score: 76, color: 'from-emerald-500 to-teal-500', change: '+15%' },
    { name: 'Cloud & Kubernetes Infrastructure', score: 68, color: 'from-amber-500 to-orange-500', change: '+5%' },
    { name: 'AI Engineering & Prompt Architecture', score: 72, color: 'from-pink-500 to-rose-500', change: '+20%' },
  ];

  const totalHours = weeklyData.reduce((acc, d) => acc + d.hours, 0).toFixed(1);
  const totalTasks = weeklyData.reduce((acc, d) => acc + d.tasks, 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Timeframe Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Developer Velocity & Growth Analytics
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Quantify dedicated engineering hours, competency acquisition, and focus efficiency.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 p-1 glass-card self-start sm:self-auto text-xs font-semibold">
          {['Weekly', 'Monthly', 'Quarterly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 glass-card relative overflow-hidden">
          <div className="flex items-center space-x-2 text-indigo-500 text-xs font-bold uppercase mb-2">
            <Clock className="w-4 h-4" />
            <span>Time Logged</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalHours} hrs
          </div>
          <p className="text-xs text-emerald-400 font-semibold mt-1">
            +4.2 hrs vs last week
          </p>
        </div>

        <div className="p-5 glass-card relative overflow-hidden">
          <div className="flex items-center space-x-2 text-purple-500 text-xs font-bold uppercase mb-2">
            <Target className="w-4 h-4" />
            <span>Tasks Solved</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalTasks}
          </div>
          <p className="text-xs text-indigo-400 font-semibold mt-1">
            85% on-time completion
          </p>
        </div>

        <div className="p-5 glass-card relative overflow-hidden">
          <div className="flex items-center space-x-2 text-emerald-500 text-xs font-bold uppercase mb-2">
            <Zap className="w-4 h-4" />
            <span>Velocity Score</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            88 / 100
          </div>
          <p className="text-xs text-emerald-400 font-semibold mt-1">
            Tier 1 High Performer
          </p>
        </div>

        <div className="p-5 glass-card relative overflow-hidden">
          <div className="flex items-center space-x-2 text-cyan-500 text-xs font-bold uppercase mb-2">
            <Award className="w-4 h-4" />
            <span>Focus Ratio</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            94%
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Deep work index
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours Dedicated Bar Chart */}
        <div className="p-6 glass-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Daily Engineering Hours ({timeframe})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Peak study on Thursday (7.8 hrs)
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                Avg: {(totalHours / 7).toFixed(1)}h / day
              </span>
            </div>

            {/* Bars Visual */}
            <div className="h-52 flex items-end justify-between space-x-2 sm:space-x-3 pt-6 pb-2">
              {weeklyData.map((d, i) => {
                const heightPercent = (d.hours / 8.5) * 100;
                const isHovered = hoveredDay === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredDay(i)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
                  >
                    {/* Tooltip on bar hover */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 bg-slate-900 text-white border border-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap shadow-xl">
                        {d.hours} hrs • {d.tasks} tasks
                      </div>
                    )}

                    <div className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-xl h-44 flex items-end p-1 overflow-hidden">
                      <div
                        className={`w-full rounded-lg transition-all duration-300 ${
                          d.hours >= 7
                            ? 'bg-gradient-to-t from-purple-600 to-indigo-500 shadow-lg shadow-indigo-500/30'
                            : 'bg-indigo-600/80 dark:bg-indigo-500/70 hover:bg-indigo-500'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-400">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
            <span>
              {hoveredDay !== null
                ? `${weeklyData[hoveredDay].day}: ${weeklyData[hoveredDay].label}`
                : 'Hover over bars to inspect daily focus topics'}
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Competency Distribution */}
        <div className="p-6 glass-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Target Competency Benchmark
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Alignment with Senior / Staff Software Engineer bar
                </p>
              </div>
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="space-y-4">
              {competencies.map((comp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200 truncate pr-2">
                      {comp.name}
                    </span>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-emerald-400 font-bold">{comp.change}</span>
                      <span className="text-slate-900 dark:text-white font-extrabold">{comp.score}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${comp.color} rounded-full transition-all duration-500`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
            <span>Overall Career Preparedness</span>
            <span className="font-bold text-indigo-400">82% Promotion Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

