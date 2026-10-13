import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { StatCard, Heatmap, ActivityWidget } from '../components/dashboard';
import UserAvatar from '../components/common/UserAvatar';
import {
  Flame,
  Award,
  CheckSquare,
  FolderGit2,
  Sparkles,
  ArrowRight,
  Plus,
  Bot,
  Zap,
  Target
} from 'lucide-react';

export const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header section with quick actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-card border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-4 z-10">
          <UserAvatar user={currentUser} size="lg" />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                Personal Engineering Hub
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                {currentUser?.level || 'L5 Senior'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {currentUser?.displayName || 'Engineer'} 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              You are tracking towards <span className="font-semibold text-slate-900 dark:text-white">{currentUser?.targetRole || 'Full Stack Engineer'}</span>. Your velocity is up 18% this sprint.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <Link
            to="/goals"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Daily Tasks</span>
          </Link>
          <Link
            to="/ai-assistant"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-500" />
            <span>Ask AI Advisor</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Streak"
          value="14 Days"
          change="+3 days"
          icon={Flame}
          subtitle="Top 5% consistency"
          trend="up"
        />
        <StatCard
          title="Skills Tracked"
          value="18 Techs"
          change="+2 this wk"
          icon={Award}
          subtitle="5 at Senior level"
          trend="up"
        />
        <StatCard
          title="Weekly Goals"
          value="9 / 12"
          change="75% rate"
          icon={CheckSquare}
          subtitle="3 left for target"
          trend="up"
        />
        <StatCard
          title="Portfolio Work"
          value="4 Live"
          change="1 featured"
          icon={FolderGit2}
          subtitle="9.4k GitHub views"
          trend="up"
        />
      </div>

      {/* Middle Interactive Grid: Heatmap & Recent Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Heatmap />
        </div>
        <div>
          <ActivityWidget />
        </div>
      </div>

      {/* Target Focus & Quick Route Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/skills"
          className="p-5 glass-card-hover group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Skill Proficiency Radar
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Measure depth in TypeScript, Distributed Systems, Docker, and AI.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 mt-4 group-hover:translate-x-1 transition-transform">
            <span>Explore Skills</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>

        <Link
          to="/analytics"
          className="p-5 glass-card-hover group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Analytics & Velocity
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Analyze dedicated coding hours, completion trends, and focus metrics.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
            <span>View Analytics</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>

        <Link
          to="/roadmap"
          className="p-5 glass-card-hover group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Career Roadmap
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review target milestones to reach Staff / Lead level in 2026.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-4 group-hover:translate-x-1 transition-transform">
            <span>Inspect Milestones</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

