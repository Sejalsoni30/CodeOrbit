import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export const LandingLoadingModal = ({ isOpen, onComplete, targetPage = 'login' }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing CodeOrbit Gateway...');

  const onCompleteRef = React.useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const duration = 2000; // Exact 2 seconds requirement

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < 700) {
        setStatusText('Initializing CodeOrbit Gateway...');
      } else if (elapsed < 1400) {
        setStatusText('Syncing Cloud Firestore Secure Channel...');
      } else {
        setStatusText(
          targetPage === 'register'
            ? 'Redirecting to Account Registration...'
            : 'Redirecting to Authentication Portal...'
        );
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 80);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isOpen, targetPage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative max-w-md w-full p-8 rounded-3xl glass-card border border-indigo-500/30 dark:border-indigo-500/30 shadow-[0_0_60px_rgba(99,102,241,0.25)] flex flex-col items-center text-center overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />

        {/* Futuristic Orbital Ring Spinner */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
          {/* Outer glowing orbital ring */}
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 border-r-purple-500 animate-spin-slow" />
          
          {/* Mid counter-rotating orbital ring */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-purple-500/40 border-b-pink-500 animate-spin-reverse" />
          
          {/* Inner core glow with pulsing logo */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/50 animate-pulse-glow z-10">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Orbiting particle */}
          <div className="absolute w-3 h-3 rounded-full bg-cyan-400 blur-[1px] animate-spin-slow shadow-[0_0_12px_#22d3ee] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Title & Brand */}
        <div className="space-y-1 mb-5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>Launch Sequence Active</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight pt-1">
            Entering CodeOrbit
          </h3>
          <p className="text-xs text-indigo-200/80 font-medium">
            Preparing your developer career workspace
          </p>
        </div>

        {/* Status text */}
        <p className="text-xs font-semibold text-slate-300 min-h-[20px] transition-all duration-300">
          {statusText}
        </p>

        {/* Smooth 2-Second Progress Bar */}
        <div className="w-full mt-4 space-y-2">
          <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(168,85,247,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span className="flex items-center space-x-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS / Cloud Firestore</span>
            </span>
            <span className="font-mono text-indigo-400">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingLoadingModal;
