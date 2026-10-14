import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';

export const Heatmap = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  // 14 weeks of activity data
  const weeks = 14;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek;

  const data = Array.from({ length: totalDays }, (_, i) => {
    const pseudoRandom = ((i * 13) % 17) / 17;
    const level = pseudoRandom > 0.65 ? 3 : pseudoRandom > 0.4 ? 2 : pseudoRandom > 0.2 ? 1 : 0;
    const hours = level === 3 ? 4.5 : level === 2 ? 2.5 : level === 1 ? 1.0 : 0;
    return {
      index: i,
      dayNumber: i + 1,
      level,
      hours,
      tasks: level * 2,
    };
  });

  const levelStyles = [
    'bg-slate-200/80 dark:bg-slate-800/60 border-transparent',
    'bg-indigo-300 dark:bg-indigo-950 text-indigo-400 border border-indigo-500/20',
    'bg-indigo-500 dark:bg-indigo-700/80 border border-indigo-400/30',
    'bg-indigo-600 dark:bg-indigo-500 shadow-sm shadow-indigo-500/40 border border-indigo-300/40',
  ];

  return (
    <div className="p-4 sm:p-6 glass-card relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Contribution & Momentum Heatmap
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            48 commits & learning sprints in the last 90 days
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
          <span>Less</span>
          <div className="flex space-x-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-800" />
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-300 dark:bg-indigo-950" />
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 dark:bg-indigo-700" />
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 dark:bg-indigo-500" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Grid with smooth touch scrolling */}
      <div className="overflow-x-auto pb-2 touch-pan-x scrollbar-thin">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[480px]">
          {data.map((d) => (
            <button
              key={d.index}
              onClick={() => setSelectedDay(d)}
              onMouseEnter={() => setSelectedDay(d)}
              className={`w-3.5 h-3.5 rounded-sm ${levelStyles[d.level]} transition-all duration-150 hover:scale-125 hover:z-10 focus:outline-none`}
              title={`Day ${d.dayNumber}: ${d.hours} hrs, ${d.tasks} tasks`}
              aria-label={`Activity day ${d.dayNumber}`}
            />
          ))}
        </div>
      </div>

      {/* Tooltip / Active Inspection Bar */}
      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2 min-w-0">
          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          {selectedDay ? (
            <span className="truncate">
              <strong className="text-slate-800 dark:text-white">Day {selectedDay.dayNumber}:</strong>{' '}
              {selectedDay.hours > 0
                ? `${selectedDay.hours} hours logged • ${selectedDay.tasks} tasks completed`
                : 'Rest day / No logged activity'}
            </span>
          ) : (
            <span className="text-[11px] sm:text-xs">Tap or hover any square to inspect activity details</span>
          )}
        </div>
        <span className="font-semibold text-indigo-500 shrink-0">92% Consistency</span>
      </div>
    </div>
  );
};

export default Heatmap;
