import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5">
          <span className="font-bold text-slate-700 dark:text-slate-300">DevGrowth</span>
          <span>• Career Intelligence & Velocity Engine</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Built for high-velocity software engineers • {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

