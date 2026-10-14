import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  Sparkles,
  ArrowRight,
  Check,
  ChevronRight
} from 'lucide-react';

/**
 * HeroShowcaseCards
 * Recreates the exact high-fidelity 3-card angled showcase pattern from the user reference:
 * - Left tilted card: "Learning Roadmap" (-6deg tilt, clearly legible)
 * - Center elevated card: "Developer Dashboard" ("Hi, Sejal 🌮")
 * - Right tilted card: "AI Code Review" (+6deg tilt, clearly legible)
 * With authentic handwritten doodle labels ("Learning Roadmap", "Developer Dashboard", "AI Code Review"),
 * curved arrows, floating 3D code & chart badges, and sparkles.
 */
export const HeroShowcaseCards = () => {
  const { currentUser } = useAuth();
  const userName = currentUser?.displayName ? currentUser.displayName.split(' ')[0] : 'Sejal';
  return (
    <div className="relative w-full max-w-[700px] mx-auto pt-10 pb-16 select-none overflow-visible">
      {/* Background Decorative Faint Wavy Orbit Trail */}
      <svg
        className="absolute top-0 right-0 w-[420px] h-[380px] pointer-events-none text-purple-400/30 dark:text-purple-400/20"
        viewBox="0 0 400 360"
        fill="none"
      >
        <path
          d="M 280 20 C 370 70, 400 180, 320 260 C 250 330, 110 320, 80 220"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Sparkling 4-point Stars (✦) */}
      <div className="absolute top-2 right-12 text-purple-400/80 dark:text-purple-300/70 text-lg font-serif animate-pulse pointer-events-none">
        ✦
      </div>
      <div className="absolute top-8 left-[38%] text-indigo-400/80 dark:text-indigo-300/70 text-sm font-serif animate-pulse delay-700 pointer-events-none">
        ✦
      </div>

      {/* Responsive Scaling Wrapper */}
      <div className="relative flex items-center justify-center scale-[0.74] xs:scale-[0.84] sm:scale-[0.92] md:scale-95 lg:scale-[0.92] xl:scale-100 origin-center transition-transform">

        {/* DOODLE 1: Top-Left "Learning Roadmap" with Curved Arrow */}
        <div className="absolute -top-11 left-12 sm:left-14 z-30 pointer-events-none text-indigo-600 dark:text-indigo-400 flex flex-col items-center">
          <span className="font-handwriting text-base sm:text-lg font-bold tracking-wide transform -rotate-12 whitespace-nowrap">
            Learning Roadmap
          </span>
          <svg
            className="w-8 h-8 sm:w-9 sm:h-9 transform rotate-12 -mt-1 text-indigo-500/80 dark:text-indigo-400/80"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 10 12 C 22 10, 36 18, 38 38" />
            <path d="M 30 36 L 38 38 L 40 30" />
          </svg>
        </div>

        {/* DOODLE 2: Top-Right "AI Code Review" with Curved Arrow */}
        <div className="absolute -top-11 right-12 sm:right-16 z-30 pointer-events-none text-indigo-600 dark:text-indigo-400 flex flex-col items-center">
          <span className="font-handwriting text-base sm:text-lg font-bold tracking-wide transform rotate-6 whitespace-nowrap">
            AI Code Review
          </span>
          <svg
            className="w-8 h-8 sm:w-9 sm:h-9 transform -rotate-12 -mt-1 text-indigo-500/80 dark:text-indigo-400/80"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 40 12 C 28 10, 14 18, 12 38" />
            <path d="M 20 36 L 12 38 L 10 30" />
          </svg>
        </div>

        {/* THREE 3D OVERLAPPING CARDS CONTAINER */}
        <div className="relative flex items-center justify-center">

          {/* CARD 1 (LEFT): LEARNING ROADMAP */}
          <div
            className="w-[230px] sm:w-[245px] p-4 bg-white dark:bg-slate-900 rounded-[22px] shadow-[0_15px_35px_-8px_rgba(99,102,241,0.18)] dark:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.65)] border border-slate-100 dark:border-slate-800 text-left transform -rotate-[6deg] -mr-8 sm:-mr-10 translate-y-4 z-10 hover:z-30 hover:rotate-0 hover:scale-105 hover:translate-y-0 transition-all duration-300 cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-2.5 h-2.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                  CodeOrbit
                </span>
              </div>
              <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] font-bold">
                S
              </div>
            </div>

            {/* Title */}
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Learning Roadmap</h4>
            <p className="text-[9px] text-slate-400 mt-0.5">Your path to becoming a full stack expert</p>

            {/* Overall Progress */}
            <div className="mt-2.5">
              <div className="flex justify-between items-center text-[10px] mb-1">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Overall Progress</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">62%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-indigo-500 w-[62%]" />
              </div>
            </div>

            {/* Roadmap Steps */}
            <div className="mt-2.5 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">HTML & CSS</span>
                </div>
                <span className="text-emerald-500 font-bold text-[8.5px]">Completed ✓</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">JavaScript</span>
                </div>
                <span className="text-emerald-500 font-bold text-[8.5px]">Completed ✓</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[8px] font-bold">
                    ●
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">React.js</span>
                </div>
                <span className="text-indigo-500 font-bold text-[8.5px]">In Progress ›</span>
              </div>

              <div className="flex items-center justify-between opacity-75">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 text-transparent text-[8px]">
                    ●
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Node.js</span>
                </div>
                <span className="text-slate-400 text-[8.5px]">Upcoming ›</span>
              </div>

              <div className="flex items-center justify-between opacity-75">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 text-transparent text-[8px]">
                    ●
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">MongoDB</span>
                </div>
                <span className="text-slate-400 text-[8.5px]">Upcoming ›</span>
              </div>
            </div>

            {/* Next Milestone Box */}
            <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[7.5px] uppercase tracking-wider font-extrabold text-slate-400">Next Milestone</p>
                <p className="text-[8.5px] font-bold text-slate-900 dark:text-white leading-tight">Build a Full Stack Project</p>
                <p className="text-[7.5px] text-slate-400">Due in 3 days</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shadow-sm ml-1 shrink-0">
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* CARD 2 (CENTER): DEVELOPER DASHBOARD ("Hi, Sejal 🌮") */}
          <div
            className="w-[280px] sm:w-[310px] p-5 bg-white dark:bg-slate-900 rounded-[26px] shadow-[0_25px_60px_-12px_rgba(99,102,241,0.25)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.75)] border border-slate-100 dark:border-slate-800 text-left relative z-20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                  <Sparkles className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">
                  CodeOrbit
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 text-slate-400 text-xs">🔔</span>
                <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-purple-400/30">
                  S
                </div>
              </div>
            </div>

            {/* Greeting */}
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                Hi, {userName} 🌮
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Keep going! You're building something amazing.
              </p>
            </div>

            {/* 3 KPI Stats */}
            <div className="grid grid-cols-3 gap-2 mt-2.5 p-2 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-left">
                <span className="text-xs text-indigo-600 dark:text-indigo-400">🧬</span>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">6</p>
                <p className="text-[8px] text-slate-400 font-medium leading-none">Skills Tracked</p>
              </div>
              <div className="text-left">
                <span className="text-xs text-emerald-500">📁</span>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">4</p>
                <p className="text-[8px] text-slate-400 font-medium leading-none">Projects</p>
              </div>
              <div className="text-left">
                <span className="text-xs text-purple-500">🔥</span>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">12</p>
                <p className="text-[8px] text-slate-400 font-medium leading-none">Day Streak</p>
              </div>
            </div>

            {/* Skill Progress Circles */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-900 dark:text-white">Skill Progress</span>
                <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
                  View All →
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { name: 'HTML', pct: 90, color: 'text-blue-500' },
                  { name: 'CSS', pct: 85, color: 'text-cyan-500' },
                  { name: 'JavaScript', pct: 78, color: 'text-indigo-500' },
                  { name: 'React', pct: 70, color: 'text-purple-500' }
                ].map((s) => (
                  <div key={s.name} className="flex flex-col items-center">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          className="text-slate-100 dark:text-slate-800"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          className={s.color}
                          strokeWidth="3"
                          strokeDasharray={94.2}
                          strokeDashoffset={94.2 * (1 - s.pct / 100)}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                        />
                      </svg>
                      <span className="absolute text-[8.5px] font-bold text-slate-800 dark:text-slate-200">
                        {s.pct}%
                      </span>
                    </div>
                    <span className="text-[8px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Overview Chart */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                  Performance Overview
                </span>
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                  Last 7 days ∨
                </span>
              </div>

              {/* Wave SVG Chart */}
              <div className="relative w-full h-10">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="orbitChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d="M 0,28 Q 30,30 55,22 T 110,24 T 155,14 T 200,8 L 200,40 L 0,40 Z"
                    fill="url(#orbitChartGrad)"
                  />
                  {/* Wave line */}
                  <path
                    d="M 0,28 Q 30,30 55,22 T 110,24 T 155,14 T 200,8"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-[7.5px] text-slate-400 font-medium px-1 mt-0.5">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Small steps. Big dreams. */}
            <div className="mt-2.5 p-2 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs shrink-0 shadow-sm">
                🚀
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-900 dark:text-white leading-tight">
                  Small steps. Big dreams.
                </p>
                <p className="text-[8px] text-slate-400 leading-tight">
                  Your consistency builds your future.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3 (RIGHT): AI CODE REVIEW */}
          <div
            className="w-[230px] sm:w-[245px] p-4 bg-white dark:bg-slate-900 rounded-[22px] shadow-[0_15px_35px_-8px_rgba(99,102,241,0.18)] dark:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.65)] border border-slate-100 dark:border-slate-800 text-left transform rotate-[6deg] -ml-8 sm:-ml-10 translate-y-4 z-10 hover:z-30 hover:rotate-0 hover:scale-105 hover:translate-y-0 transition-all duration-300 cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-2.5 h-2.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                  CodeOrbit
                </span>
              </div>
              <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] font-bold">
                S
              </div>
            </div>

            {/* Title */}
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">AI Code Review</h4>
            <p className="text-[9px] text-slate-400 mt-0.5">Get instant feedback and improve your code</p>

            {/* Quality Score Gauge Box */}
            <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 flex items-center space-x-2">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    className="text-slate-200 dark:text-slate-700"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    className="text-emerald-500"
                    strokeWidth="3.5"
                    strokeDasharray={94.2}
                    strokeDashoffset={94.2 * (1 - 92 / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                  />
                </svg>
                <span className="absolute text-xs font-black text-slate-900 dark:text-white">
                  92
                </span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-900 dark:text-white leading-tight">
                  Code Quality Score
                </p>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[7.5px] font-bold">
                  + Excellent
                </span>
                <p className="text-[7.5px] text-slate-400 leading-tight mt-0.5">
                  Great job! Your code follows best practices.
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-900 dark:text-white">Suggestions</span>
                <span className="text-[8px] font-bold text-indigo-600 dark:text-indigo-400">View All →</span>
              </div>
              <div className="space-y-1.5 text-[9px]">
                <div className="flex items-start space-x-1.5">
                  <span className="text-blue-500 text-[10px] mt-0.5">📍</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                      Consider using const instead of let
                    </p>
                    <p className="text-[7.5px] text-slate-400">2 instances ›</p>
                  </div>
                </div>

                <div className="flex items-start space-x-1.5">
                  <span className="text-amber-500 text-[10px] mt-0.5">💡</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                      Add error handling for API calls
                    </p>
                    <p className="text-[7.5px] text-slate-400">1 instance ›</p>
                  </div>
                </div>

                <div className="flex items-start space-x-1.5">
                  <span className="text-purple-500 text-[10px] mt-0.5">🛡️</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                      Optimize the database query
                    </p>
                    <p className="text-[7.5px] text-slate-400">1 instance ›</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tip Box */}
            <div className="mt-2.5 p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
              <p className="text-[8px] font-bold text-amber-700 dark:text-amber-400 flex items-center space-x-1">
                <span>💡</span>
                <span>Pro Tip</span>
              </p>
              <p className="text-[7.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                Use meaningful variable names for better readability.
              </p>
            </div>
          </div>
        </div>

        {/* DOODLE 3: Bottom "Developer Dashboard" with Curved Arrow */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-indigo-600 dark:text-indigo-400 flex flex-col items-center">
          <svg
            className="w-8 h-8 sm:w-9 sm:h-9 transform -rotate-45 mb-0.5 text-indigo-500/80 dark:text-indigo-400/80"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 12 40 C 22 25, 34 20, 42 12" />
            <path d="M 34 10 L 42 12 L 40 20" />
          </svg>
          <span className="font-handwriting text-base sm:text-lg font-bold tracking-wide whitespace-nowrap -mt-1">
            Developer Dashboard
          </span>
        </div>

        {/* 3D FLOATING CODE BADGE (</>) */}
        <div className="absolute -bottom-3 left-4 sm:left-8 z-30 pointer-events-none select-none animate-float">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-[0_12px_25px_-5px_rgba(99,102,241,0.5)] transform -rotate-12 border border-white/40">
            {'</>'}
          </div>
        </div>

        {/* 3D FLOATING BAR CHART BADGE */}
        <div className="absolute -bottom-3 right-4 sm:right-8 z-30 pointer-events-none select-none animate-float-delayed">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-indigo-600 text-white flex items-end justify-center pb-2.5 space-x-1 shadow-[0_12px_25px_-5px_rgba(59,130,246,0.5)] transform rotate-12 border border-white/40">
            <span className="w-1.5 h-3 bg-white/90 rounded-t-sm" />
            <span className="w-1.5 h-5 bg-white rounded-t-sm" />
            <span className="w-1.5 h-7 bg-white rounded-t-sm" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroShowcaseCards;
