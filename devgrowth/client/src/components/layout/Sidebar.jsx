import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Award,
  CheckSquare,
  BarChart3,
  Milestone,
  FolderGit2,
  Bot,
  LogOut,
  LogIn,
  Flame,
  Sparkles,
  FileText
} from 'lucide-react';
import UserAvatar, { formatProfessionalRole } from '../common/UserAvatar';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Skill Tracker', path: '/skills', icon: Award, badge: '18' },
  { name: 'Daily Goals', path: '/goals', icon: CheckSquare, badge: 'Active' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Roadmap', path: '/roadmap', icon: Milestone },
  { name: 'Resume & ATS AI', path: '/resume', icon: FileText, badge: 'NEW' },
  { name: 'Portfolio', path: '/portfolio', icon: FolderGit2, badge: 'Export' },
  { name: 'AI Assistant', path: '/ai-assistant', icon: Bot, highlight: true },
];

export const Sidebar = () => {
  const {
    currentUser,
    logout,
    openAuthModal,
    openTwoFactorModal,
    twoFactorEnabled,
  } = useAuth();

  return (
    <aside className="hidden lg:flex fixed top-16 left-0 bottom-0 w-64 glass-sidebar flex-col p-4 z-30 overflow-y-auto scrollbar-none transition-colors">
      <div className="flex-1 flex flex-col justify-between min-h-max space-y-6">
        <div className="space-y-6">
        {/* Navigation list */}
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Main Navigation
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-transparent text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isActive
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {item.highlight && !isActive && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Momentum Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-900/20 via-slate-900/40 to-slate-900/20 border border-indigo-500/20 dark:border-indigo-500/15">
          <div className="flex items-center space-x-2 text-amber-400 mb-1">
            <Flame className="w-4 h-4 animate-bounce" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              14-Day Streak
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Top 5% consistency this month! Keep shipping code daily.
          </p>
        </div>
      </div>

      {/* Bottom User Area with Log Out & 2FA Options */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
        {currentUser ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40">
              <div className="flex items-center space-x-2.5 min-w-0 flex-1 mr-2">
                <UserAvatar user={currentUser} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {currentUser.displayName}
                  </p>
                  <p className="text-[10px] text-indigo-400 font-medium truncate">
                    {formatProfessionalRole(currentUser.targetRole)}
                  </p>
                </div>
              </div>

              {/* 2FA Quick Shield Trigger */}
              <button
                onClick={openTwoFactorModal}
                className={`p-1.5 rounded-lg border text-xs transition-colors shrink-0 ${
                  twoFactorEnabled
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                    : 'text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title="Google Authenticator (2FA) Status"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Logout button in sidebar */}
            <button
              onClick={() => logout()}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/20 transition-all hover:shadow-sm"
              title="Sign out of DevGrowth"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-1.5">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 transition-all"
            >
              <span>Create Account</span>
            </button>
          </div>
        )}
      </div>
    </div>
  </aside>
  );
};

export default Sidebar;

