import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';
import {
  Sun,
  Moon,
  LogOut,
  LogIn,
  ChevronDown,
  Sparkles,
  Zap,
  Check,
  Shield,
  Activity,
  User,
  Settings,
  Scale,
  FileText,
  Menu,
  X
} from 'lucide-react';
import UserAvatar, { formatProfessionalRole } from '../common/UserAvatar';
import ProfileModal from '../profile/ProfileModal';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentUser,
    logout,
    loginAsProfile,
    availableProfiles,
    openAuthModal,
    openTwoFactorModal,
    twoFactorEnabled,
  } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [legalMenuOpen, setLegalMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const legalMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (legalMenuRef.current && !legalMenuRef.current.contains(e.target)) {
        setLegalMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    setDropdownOpen(false);
    logout();
  };

  return (
    <>
      <header className="h-16 glass-header px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
        {/* Brand identity (Clickable to home/dashboard) */}
        <div
          onClick={() => navigate(currentUser ? '/dashboard' : '/')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                DevGrowth
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden md:block">
              Career Intelligence Engine
            </p>
          </div>
        </div>

        {/* Professional Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold">
          <button
            onClick={() => navigate(currentUser ? '/dashboard' : '/')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              location.pathname === '/' || location.pathname === '/dashboard'
                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Platform
          </button>
          <button
            onClick={() => navigate('/skills')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              location.pathname === '/skills'
                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => navigate('/roadmap')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              location.pathname === '/roadmap'
                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Roadmap
          </button>
          <button
            onClick={() => navigate('/ai-assistant')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              location.pathname === '/ai-assistant'
                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            AI Mentor
          </button>

          {/* Legal & Terms Dropdown */}
          <div className="relative" ref={legalMenuRef}>
            <button
              onClick={() => setLegalMenuOpen(!legalMenuOpen)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl transition-colors ${
                location.pathname === '/terms'
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-indigo-500" />
              <span>Legal & Terms</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${legalMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {legalMenuOpen && (
              <div className="absolute left-0 mt-2 w-60 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => { setLegalMenuOpen(false); navigate('/terms'); }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  <Scale className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Terms & Conditions</p>
                    <p className="text-[10px] text-slate-400 font-normal">Official Developer Agreement</p>
                  </div>
                </button>
                <button
                  onClick={() => { setLegalMenuOpen(false); navigate('/terms'); }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  <FileText className="w-4 h-4 text-purple-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Privacy Policy</p>
                    <p className="text-[10px] text-slate-400 font-normal">GDPR & Firestore Safeguards</p>
                  </div>
                </button>
                <button
                  onClick={() => { setLegalMenuOpen(false); navigate('/terms'); }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Security & 2FA</p>
                    <p className="text-[10px] text-slate-400 font-normal">TOTP Google Authenticator</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right actions: Theme toggle + Auth & Logout */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Live system status pill */}
          <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>API Online</span>
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-amber-300 transition-all duration-200 shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* User profile dropdown OR Sign In button */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-750 hover:border-indigo-500/40 shadow-sm transition-all text-left group"
              >
                <UserAvatar user={currentUser} size="sm" />

                <div className="hidden sm:block">
                  <div className="flex items-center space-x-1.5">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight truncate max-w-[120px]">
                      {currentUser.displayName}
                    </p>
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                      {currentUser.level || 'L5'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[140px] mt-0.5">
                    {formatProfessionalRole(currentUser.targetRole)}
                  </p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile & Logout Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-700/80 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Executive User Info Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent border border-indigo-500/20 mb-2">
                    <div className="flex items-center space-x-3 mb-2.5">
                      <UserAvatar user={currentUser} size="md" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1.5">
                          <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                            {currentUser.displayName}
                          </p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                            {currentUser.level || 'L5 Senior'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-200 font-semibold truncate">
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{currentUser.targetRole || 'Full Stack Engineer'}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Edit Profile Action */}
                  <div className="px-1 mb-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors group"
                    >
                      <div className="flex items-center space-x-2">
                        <Settings className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Edit Engineer Profile</span>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-indigo-400">Customise ↗</span>
                    </button>
                  </div>

                  {/* Switch Demo Profile */}
                  <div className="px-2 py-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Switch Profile
                    </p>
                    <div className="space-y-1">
                      {availableProfiles?.map((profile) => (
                        <button
                          key={profile.uid}
                          onClick={() => {
                            loginAsProfile(profile);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs transition-colors ${
                            currentUser.uid === profile.uid
                              ? 'bg-indigo-500/15 text-indigo-400 font-semibold border border-indigo-500/30'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <UserAvatar user={profile} size="xs" showStatus={false} />
                          <div className="min-w-0 flex-1 text-left">
                            <p className="font-bold truncate">{profile.displayName}</p>
                            <p className="text-[10px] text-slate-400 truncate">{formatProfessionalRole(profile.targetRole)}</p>
                          </div>
                          {currentUser.uid === profile.uid && (
                            <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Security & Google Authenticator Section */}
                  <div className="px-2 py-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Security & 2FA
                    </p>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        openTwoFactorModal();
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Google Authenticator</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          twoFactorEnabled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                        }`}
                      >
                        {twoFactorEnabled ? 'Active' : 'Setup'}
                      </span>
                    </button>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800 my-1.5" />

                  {/* Explicit Log Out button */}
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out of DevGrowth</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out state: Sign In & Register Buttons */
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all transform active:scale-95"
              >
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-header border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-4 space-y-1.5 sticky top-16 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => { setMobileMenuOpen(false); navigate(currentUser ? '/dashboard' : '/'); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Platform Home
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); navigate('/skills'); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Skills Matrix
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); navigate('/roadmap'); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Career Roadmap
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); navigate('/ai-assistant'); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Gemini AI Mentor
          </button>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
            <p className="text-[10px] uppercase font-bold text-slate-400 px-3 mb-1">Legal & Compliance</p>
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/terms'); }}
              className="w-full flex items-center space-x-2 text-left px-3 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Terms & Conditions</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/terms#data-privacy'); }}
              className="w-full flex items-center space-x-2 text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-card max-w-sm w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 dark:text-white mb-1">
              Confirm Log Out
            </h3>
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to log out? Your local metrics and progress are saved in storage.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-colors"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Engineer Profile Management Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

