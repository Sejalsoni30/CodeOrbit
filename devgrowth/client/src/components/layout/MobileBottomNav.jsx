import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  CheckSquare,
  BarChart3,
  Bot,
  Layers
} from 'lucide-react';

const mobileNavItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Skills', path: '/skills', icon: Award },
  { name: 'Goals', path: '/goals', icon: CheckSquare },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'AI Mentor', path: '/ai-assistant', icon: Bot, isAi: true },
];

export const MobileBottomNav = ({ onOpenMore }) => {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 dark:bg-[#080c14]/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 transition-colors safe-area-pb shadow-lg shadow-black/10"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'scale-110' : ''
                      }`}
                    />
                    {item.isAi && !isActive && (
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] tracking-tight mt-0.5">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* More/Menu Drawer Trigger */}
        <button
          onClick={onOpenMore}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all focus:outline-none"
          aria-label="More navigation options"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">More</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
