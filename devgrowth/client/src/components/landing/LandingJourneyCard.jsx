import React from 'react';
import { Check } from 'lucide-react';

/**
 * LandingJourneyCard
 * High-impact call-to-action banner recreating the exact tactile, glassmorphic aesthetic:
 * - Frosted glass slab with soft powder-blue to deep atmospheric indigo to lavender wash
 * - Antique brass astrolabe / navigational compass on top-left
 * - Copper/golden PCB circuit board traces
 * - Hand-stitched saddle-tan leather tag with debossed compass emblem & trailing cord
 * - Polished natural granite river pebble
 * - "Updated for 2024" frosted pill badge
 * - "+ START YOUR JOURNEY TODAY +" header pill
 * - "Ready to 10x Your Engineering Velocity?" bold white headline
 * - Tactile cyan/teal metallic button & warm parchment button
 * - Bottom-right contoured organic circuit board island
 * - 4x5 and 6x4 dot matrix grids
 */
export const LandingJourneyCard = ({ onSignIn, onStartTrial }) => {
  return (
    <div className="relative max-w-5xl mx-auto my-12 px-2 sm:px-4 select-none">
      
      {/* EXTERIOR DOT MATRIX GRIDS */}
      {/* Left Dot Grid Matrix (4 cols x 5 rows) */}
      <div className="hidden sm:grid absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 grid-cols-4 gap-2.5 sm:gap-3 pointer-events-none select-none z-10 opacity-75 dark:opacity-60">
        {[...Array(20)].map((_, i) => (
          <span key={`dot-l-${i}`} className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#1e293b]/70 dark:bg-indigo-400/50" />
        ))}
      </div>

      {/* Top-Right Dot Grid Matrix (6 cols x 4 rows) */}
      <div className="hidden sm:grid absolute -right-6 lg:-right-12 top-4 sm:top-6 grid-cols-6 gap-2 sm:gap-2.5 pointer-events-none select-none z-10 opacity-75 dark:opacity-60">
        {[...Array(24)].map((_, i) => (
          <span key={`dot-r-${i}`} className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#1e293b]/70 dark:bg-purple-400/50" />
        ))}
      </div>

      {/* Sparkling 4-point Star (✦) on Right */}
      <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-8 pointer-events-none select-none text-purple-400 dark:text-purple-300 z-20 animate-pulse text-2xl sm:text-3xl font-serif">
        ✦
      </div>

      {/* =========================================================================
          THE MAIN FROSTED GLASS CONTAINER CARD
         ========================================================================= */}
      <div className="relative mx-auto rounded-[32px] sm:rounded-[44px] border border-white/50 dark:border-white/20 shadow-[0_25px_60px_-15px_rgba(30,58,138,0.3)] backdrop-blur-2xl overflow-hidden z-20">
        
        {/* Ambient Gradient Background Layer inside Glass */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {/* Base Soft Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#dbeafe]/85 via-[#312e81]/90 to-[#ddd6fe]/85 dark:from-[#1e293b]/90 dark:via-[#1e1b4b]/95 dark:to-[#311042]/90" />
          
          {/* Central Deep Cosmic Indigo Glow Cloud */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[340px] bg-gradient-to-r from-[#1e40af]/80 via-[#3730a3]/85 to-[#6b21a8]/70 blur-[70px] rounded-full" />
          
          {/* Left Powder Blue Ambient Wash */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-sky-200/50 dark:bg-sky-500/15 blur-[80px] rounded-full" />
          
          {/* Right Mauve/Lilac Ambient Wash */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/50 dark:bg-purple-500/20 blur-[80px] rounded-full" />
          
          {/* Glass Specular Top Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </div>

        {/* =======================================================================
            COPPER / GOLDEN CIRCUIT TRACES (TOP-LEFT & BOTTOM-LEFT)
           ======================================================================= */}
        {/* Top-Left Traces */}
        <svg
          className="absolute -top-1 left-16 sm:left-24 w-64 sm:w-80 h-28 sm:h-36 pointer-events-none select-none text-amber-500/80 dark:text-amber-400/70"
          viewBox="0 0 260 110"
          fill="none"
        >
          <path d="M 12 36 L 68 36 L 90 14 L 160 14 L 178 28 L 225 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="36" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="225" cy="28" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />
          
          <path d="M 45 52 L 85 52 L 105 32 L 140 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="140" cy="32" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />

          <path d="M 98 76 L 132 76 L 152 56 L 195 56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="98" cy="76" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="195" cy="56" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />
        </svg>

        {/* Bottom-Left Traces */}
        <svg
          className="absolute -bottom-4 left-6 sm:left-14 w-60 sm:w-72 h-28 pointer-events-none select-none text-amber-500/80 dark:text-amber-400/70"
          viewBox="0 0 220 90"
          fill="none"
        >
          <path d="M 10 55 L 50 55 L 72 32 L 135 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="10" cy="55" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="135" cy="32" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />

          <path d="M 52 75 L 92 75 L 115 52 L 165 52" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="52" cy="75" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="165" cy="52" r="3.2" fill="#92400e" stroke="currentColor" strokeWidth="1.2" />
        </svg>

        {/* =======================================================================
            BOTTOM-RIGHT CONTOURED ORGANIC CIRCUIT ISLAND
           ======================================================================= */}
        <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-44 sm:w-60 h-36 sm:h-48 pointer-events-none select-none z-10">
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="islandFillGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            {/* Contoured organic island base */}
            <path
              d="M 45 160 C 28 115, 35 75, 70 52 C 110 30, 155 48, 200 20 L 200 160 Z"
              fill="url(#islandFillGrad)"
              stroke="#ca8a04"
              strokeWidth="1.8"
            />
            {/* Concentric etched golden circuit tracks with solder pads */}
            <path
              d="M 62 160 C 50 125, 56 95, 85 75 C 118 55, 162 65, 200 42"
              stroke="#eab308"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="85" cy="75" r="3.2" fill="#92400e" stroke="#fef08a" strokeWidth="1.2" />

            <path
              d="M 85 160 C 72 135, 80 112, 105 95 C 132 80, 172 88, 200 65"
              stroke="#eab308"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="105" cy="95" r="3.2" fill="#92400e" stroke="#fef08a" strokeWidth="1.2" />

            <path
              d="M 110 160 C 100 142, 106 128, 125 115 C 148 102, 178 108, 200 90"
              stroke="#eab308"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="125" cy="115" r="3.2" fill="#92400e" stroke="#fef08a" strokeWidth="1.2" />
          </svg>
        </div>

        {/* =======================================================================
            INNER CARD CONTENT
           ======================================================================= */}
        <div className="relative px-6 py-12 sm:px-14 sm:py-16 md:py-20 text-center z-20">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-white/20 hover:bg-white/25 backdrop-blur-md border border-white/40 text-white text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-[0_2px_12px_rgba(255,255,255,0.2)] mb-6 transition-all select-none">
            <span className="text-white text-xs font-bold">+</span>
            <span>START YOUR JOURNEY TODAY</span>
            <span className="text-white text-xs font-bold">+</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight leading-[1.14] max-w-2xl mx-auto drop-shadow-md">
            Ready to 10x Your <br />
            Engineering Velocity?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-white/95 dark:text-slate-200 max-w-xl mx-auto leading-relaxed font-normal">
            Join high-performing teams accelerating their velocity with verified skill maps, structured leveling roadmaps, and intelligent AI mentorship.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            
            {/* Button 1 (Teal-Cyan Slate Metallic Pill) */}
            <button
              onClick={onSignIn}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-b from-[#4a8a9a] via-[#357282] to-[#245463] hover:from-[#569baa] hover:to-[#2c6576] text-white text-xs sm:text-sm font-bold shadow-[0_6px_20px_rgba(36,84,99,0.45)] border-t border-white/40 border-b border-black/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Sign In to CodeOrbit</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* Button 2 (Warm Parchment / Sand Beige Pill) */}
            <button
              onClick={onStartTrial}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-b from-[#efe4d4] via-[#e5d5be] to-[#d6c2a6] hover:from-[#f5ebdd] hover:to-[#dfccaF] text-[#4a3b2b] text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(0,0,0,0.15)] border-t border-white/60 border-b border-stone-400/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Start Your 14-Day Trial</span>
              <Check className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>

      {/* =========================================================================
          PHYSICAL ARTIFACTS OVERLAPPING THE CARD (TOP-LEFT & BOTTOM)
         ========================================================================= */}
      
      {/* 1. TOP-LEFT ANTIQUE BRASS ASTROLABE / COMPASS */}
      <div className="absolute -top-9 -left-2 sm:-top-12 sm:-left-5 z-30 pointer-events-none select-none transform rotate-6 sm:rotate-12 hover:rotate-0 transition-transform">
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_14px_20px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <radialGradient id="brassOuterGrad" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="28%" stopColor="#eab308" />
              <stop offset="68%" stopColor="#a16207" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>
            <radialGradient id="brassInnerGrad" cx="44%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="38%" stopColor="#ca8a04" />
              <stop offset="85%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#291102" />
            </radialGradient>
            <linearGradient id="brassLoopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Top Hanging Ring & Mounting Swivel */}
          <circle cx="28" cy="12" r="7" fill="none" stroke="url(#brassLoopGrad)" strokeWidth="3" />
          <rect x="25" y="15" width="6" height="5" rx="1" fill="url(#brassOuterGrad)" stroke="#451a03" strokeWidth="0.8" />
          
          {/* Main Heavy Brass Outer Rim */}
          <circle cx="48" cy="56" r="38" fill="url(#brassOuterGrad)" stroke="#3f1c04" strokeWidth="2.2" />
          
          {/* Graduated Celestial Scale Marks */}
          <circle cx="48" cy="56" r="34" fill="none" stroke="#713f12" strokeWidth="1.5" strokeDasharray="1.5 2" />
          
          {/* Recessed Astrolabe Plate Face */}
          <circle cx="48" cy="56" r="30" fill="url(#brassInnerGrad)" stroke="#451a03" strokeWidth="1.2" />
          
          {/* Rete Web & Concentric Coordinates */}
          <circle cx="48" cy="56" r="22" fill="none" stroke="#fef08a" strokeWidth="1.2" strokeOpacity="0.85" />
          <circle cx="48" cy="56" r="14" fill="none" stroke="#fef08a" strokeWidth="1.2" strokeOpacity="0.75" />
          <path d="M 48 26 L 48 86 M 18 56 L 78 56" stroke="#ca8a04" strokeWidth="1" strokeOpacity="0.8" />
          <path d="M 27 35 L 69 77 M 27 77 L 69 35" stroke="#a16207" strokeWidth="0.8" strokeOpacity="0.7" />
          
          {/* Curved Astrological Crescent Overlay */}
          <path
            d="M 32 42 C 40 32, 60 36, 64 50 C 68 64, 52 74, 40 70 C 50 68, 56 56, 46 48 Z"
            fill="#b45309"
            fillOpacity="0.7"
            stroke="#fef08a"
            strokeWidth="0.8"
          />
          
          {/* Central Pivot Pin */}
          <circle cx="48" cy="56" r="4.5" fill="url(#brassOuterGrad)" stroke="#451a03" strokeWidth="1" />
          <circle cx="47" cy="55" r="1.5" fill="#fef9c3" />
        </svg>
      </div>

      {/* 2. FROSTED GLASS "Updated for 2024" PILL BADGE */}
      <div className="absolute -bottom-2 left-[44%] sm:left-[45%] z-20 pointer-events-none select-none">
        <div className="px-3 py-0.5 rounded-full bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-md border border-white/35 text-white/95 text-[9px] sm:text-[10px] font-semibold shadow-sm">
          Updated for 2024
        </div>
      </div>

      {/* 3. STITCHED LEATHER TAG WITH EMBOSSED EMBLEM & CORDS */}
      <div className="absolute -bottom-8 left-10 sm:left-24 md:left-32 z-30 pointer-events-none select-none">
        <svg
          viewBox="0 0 240 70"
          className="w-48 sm:w-56 h-14 sm:h-16 drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="leatherFillGrad" x1="0" y1="0" x2="1" y2="0.6">
              <stop offset="0%" stopColor="#b9713b" />
              <stop offset="50%" stopColor="#8d4922" />
              <stop offset="100%" stopColor="#673113" />
            </linearGradient>
            <radialGradient id="brassRivetGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#ca8a04" />
              <stop offset="85%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#3f1c04" />
            </radialGradient>
          </defs>

          {/* Leather Strings trailing to the left */}
          <path
            d="M 28 35 C 12 38, -4 48, -12 60 M 24 38 C 4 45, -2 62, -18 55"
            fill="none"
            stroke="#3b1502"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Tag Body */}
          <rect x="20" y="8" width="180" height="54" rx="14" fill="url(#leatherFillGrad)" stroke="#451a03" strokeWidth="1.2" />

          {/* Dashed Perimeter Saddle Stitching */}
          <rect
            x="25"
            y="13"
            width="170"
            height="44"
            rx="10"
            fill="none"
            stroke="#fde68a"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            strokeOpacity="0.85"
          />

          {/* Punch Hole for Strings */}
          <circle cx="34" cy="35" r="4.5" fill="#2d1203" stroke="#451a03" strokeWidth="1" />

          {/* Embossed Compass / Geometric Logo */}
          <g transform="translate(85, 35)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="#3d1905" strokeWidth="1.8" strokeOpacity="0.85" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#3d1905" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />
            <line x1="-12" y1="-12" x2="12" y2="12" stroke="#3d1905" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
            <line x1="-12" y1="12" x2="12" y2="-12" stroke="#3d1905" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
            <circle cx="0" cy="0" r="2.5" fill="#3d1905" />
          </g>

          {/* Brass Domed Rivet Stud */}
          <circle cx="174" cy="35" r="8" fill="url(#brassRivetGrad)" stroke="#3f1c04" strokeWidth="1.2" />
          <circle cx="172" cy="33" r="2.5" fill="#fef9c3" fillOpacity="0.7" />
        </svg>
      </div>

      {/* 4. SMOOTH POLISHED RIVER PEBBLE / STONE */}
      <div className="absolute -bottom-6 left-[56%] sm:left-[54%] z-30 pointer-events-none select-none">
        <svg
          viewBox="0 0 70 50"
          className="w-13 sm:w-15 h-9 sm:h-11 drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)]"
        >
          <defs>
            <radialGradient id="pebbleFillGrad" cx="36%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#a8a29e" />
              <stop offset="35%" stopColor="#78716c" />
              <stop offset="70%" stopColor="#44403c" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>
            <linearGradient id="pebbleVeinGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d6d3d1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#78716c" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Natural Pebble Contour */}
          <path
            d="M 12 28 C 10 16, 26 8, 44 10 C 60 12, 66 22, 62 34 C 58 44, 40 48, 24 46 C 14 44, 13 36, 12 28 Z"
            fill="url(#pebbleFillGrad)"
            stroke="#292524"
            strokeWidth="0.8"
          />

          {/* Mineral Veining */}
          <path d="M 22 16 Q 34 26 50 20" fill="none" stroke="url(#pebbleVeinGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 28 36 Q 42 34 54 38" fill="none" stroke="url(#pebbleVeinGrad)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Specular Highlight on Upper Curve */}
          <ellipse cx="32" cy="16" rx="9" ry="4" transform="rotate(-15 32 16)" fill="#ffffff" fillOpacity="0.4" />
        </svg>
      </div>

    </div>
  );
};

export default LandingJourneyCard;
