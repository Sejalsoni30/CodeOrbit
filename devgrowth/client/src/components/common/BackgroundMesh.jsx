import React from 'react';

/**
 * BackgroundMesh
 * High-aesthetic developer canvas featuring dynamic aurora gradient orbs,
 * tech grid mesh, dashed orbital rings, and cosmic gleams.
 * Beautifully calibrated for both Light and Dark modes.
 */
export const BackgroundMesh = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Aurora Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full bg-gradient-to-tr from-indigo-500/30 via-indigo-400/20 to-purple-500/25 blur-[120px] sm:blur-[140px] animate-aurora" />
      <div className="absolute -top-20 -right-20 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-bl from-purple-500/25 via-pink-500/20 to-indigo-400/15 blur-[130px] sm:blur-[150px] animate-aurora-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[160px]" />
      <div className="absolute -bottom-36 -left-20 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-cyan-400/25 via-sky-500/20 to-indigo-500/20 blur-[130px] sm:blur-[140px] animate-aurora" />
      <div className="absolute -bottom-28 -right-28 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-tl from-purple-600/20 via-pink-500/15 to-transparent blur-[120px] animate-aurora-reverse" />

      {/* Tech Grid & Dot Matrix Overlay with Radial Vignette */}
      <div className="absolute inset-0 tech-grid mask-radial-faded opacity-90 dark:opacity-60" />
      <div className="absolute inset-0 tech-dots mask-radial-faded opacity-40 dark:opacity-35" />

      {/* Subtle Orbital Concentric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-dashed border-indigo-400/20 dark:border-indigo-400/15 animate-spin-slow hidden md:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1050px] h-[1050px] rounded-full border border-purple-400/15 dark:border-purple-400/10 animate-spin-reverse hidden lg:block" />

      {/* Subtle Star Particles / Cosmic Gleams */}
      <div className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8] animate-pulse" />
      <div className="absolute top-[28%] right-[15%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] animate-pulse delay-700" />
      <div className="absolute top-[72%] left-[22%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse delay-1000" />
      <div className="absolute top-[82%] right-[25%] w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6] animate-pulse delay-500" />
    </div>
  );
};

export default BackgroundMesh;
