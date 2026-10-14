import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Sparkles, Shield, Scale, FileText } from 'lucide-react';

export const Footer = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <footer className={`border-t border-slate-200/80 dark:border-slate-800/80 py-6 px-4 sm:px-6 text-xs text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl relative z-10 transition-colors ${
      currentUser ? 'mb-14 lg:mb-0' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-slate-800 dark:text-slate-200">CodeOrbit</span>
          <span className="hidden sm:inline text-slate-400">• Career Velocity Engine</span>
        </div>

        {/* Professional Navigation & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <button
            onClick={() => navigate('/terms')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>
          <button
            onClick={() => navigate('/terms')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => navigate('/terms')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Security & SLA</span>
          </button>
          <button
            onClick={() => navigate('/landing')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Platform Overview
          </button>
        </div>

        {/* Copyright notice */}
        <p className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} CodeOrbit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

