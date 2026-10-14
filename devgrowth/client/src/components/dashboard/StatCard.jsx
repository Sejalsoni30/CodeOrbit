import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, change, icon: Icon, subtitle, trend = 'up' }) => {
  const isPositive = trend === 'up';

  return (
    <div className="p-3.5 sm:p-5 glass-card-hover relative overflow-hidden group">
      {/* Ambient background glow on hover */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate pr-1">
          {title}
        </span>
        {typeof Icon === 'string' ? (
          <span className="text-base sm:text-xl p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shrink-0">
            {Icon}
          </span>
        ) : Icon ? (
          <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        ) : null}
      </div>

      <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 sm:mb-2 truncate">
        {value}
      </div>

      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
        {change && (
          <span
            className={`inline-flex items-center space-x-0.5 px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5" />
            ) : (
              <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5" />
            )}
            <span>{change}</span>
          </span>
        )}
        {subtitle && (
          <span className="text-slate-500 dark:text-slate-400 font-medium truncate">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;

