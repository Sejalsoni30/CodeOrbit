import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ExternalLink
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    loginWithGoogle,
    loginAsGoogleDemo,
    loginWithEmail,
    registerWithEmail,
    loginAsProfile,
    availableProfiles,
    twoFactorEnabled,
    openTwoFactorModal,
  } = useAuth();

  const [tab, setTab] = useState(authModalTab || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('Senior Full Stack Engineer');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  React.useEffect(() => {
    if (authModalTab) {
      setTab(authModalTab);
    }
    setError('');
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      await loginWithEmail(loginEmail, loginPassword);
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept terms of service to proceed.');
      return;
    }

    setLoading(true);
    try {
      await registerWithEmail({
        name: regName.trim(),
        email: regEmail.trim(),
        targetRole: regRole,
        password: regPassword,
      });
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Google authentication was cancelled.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      {/* Expanded, spacious modal container: max-w-xl (576px) */}
      <div className="glass-card max-w-xl w-full p-7 sm:p-9 md:p-10 border border-slate-200/90 dark:border-slate-700/80 shadow-2xl relative overflow-hidden my-auto">
        {/* Ambient background glow */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title with brand identity */}
        <div className="mb-7">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                DevGrowth
              </span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Firebase Live
              </span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {tab === 'login' ? 'Sign in to your account' : 'Create developer profile'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {tab === 'login'
              ? 'Connect your engineering metrics, daily goals, and roadmap to Firebase.'
              : 'Join engineers accelerating their career velocity with real Firebase Auth.'}
          </p>
        </div>

        {/* Spacious Tab Switcher */}
        <div className="flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 mb-6">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              tab === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              tab === 'register'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert & Intelligent Firebase Helper */}
        {error && (
          error.includes('Firebase Authentication has not been activated') || error.includes('CONFIGURATION_NOT_FOUND') ? (
            <div className="mb-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm animate-in fade-in space-y-3">
              <div className="flex items-start space-x-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <p className="font-bold text-amber-200">Firebase Auth Not Activated in Console</p>
                  <p className="text-xs text-amber-300/90 mt-1 leading-relaxed">
                    Google Identity Toolkit is not enabled yet for project <code className="px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono">codeorbit-70b7c</code>. To enable live Google & Email sign-in:
                  </p>
                  <ol className="list-decimal list-inside text-xs text-amber-300/80 mt-1.5 space-y-0.5 pl-1">
                    <li>Open Firebase Console &gt; Build &gt; Authentication</li>
                    <li>Click <strong className="text-amber-200">"Get Started"</strong></li>
                    <li>Under <strong className="text-amber-200">Sign-in method</strong>, enable <strong className="text-amber-200">Google</strong> and <strong className="text-amber-200">Email/Password</strong></li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-500/20">
                <a
                  href="https://console.firebase.google.com/project/codeorbit-70b7c/authentication"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-bold transition-colors"
                >
                  <span>Open Firebase Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    loginAsGoogleDemo();
                  }}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Continue with Instant Demo Login</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-xs sm:text-sm flex items-start space-x-2.5 animate-in fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )
        )}

        {/* Large Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3.5 py-3.5 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-600 active:scale-[0.99] group"
        >
          {/* Authentic Google Multi-Color G Icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>
            {tab === 'login' ? 'Continue with Google' : 'Sign up with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase font-bold text-slate-400">
            <span className="bg-white dark:bg-[#0f172a] px-3">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Tab 1: Sign In Form */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="engineer@devgrowth.io"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password Reset: You can use your registered Firebase email password or test with the quick demo profiles below.')}
                  className="text-xs font-semibold text-indigo-500 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs sm:text-sm">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>Remember this session</span>
              </label>

              {/* 2FA Indicator Badge */}
              <button
                type="button"
                onClick={openTwoFactorModal}
                className={`flex items-center space-x-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border ${
                  twoFactorEnabled
                    ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                    : 'text-slate-400 bg-slate-500/10 border-slate-500/20'
                }`}
                title="Google Authenticator 2FA setting"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>2FA {twoFactorEnabled ? 'Active' : 'Setup'}</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Authenticating with Firebase...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Register Form */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="jordan.lee@devgrowth.io"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Engineering Role
              </label>
              <div className="relative">
                <Briefcase className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                >
                  <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
                  <option value="Staff Distributed Systems Architect">Staff Distributed Systems Architect</option>
                  <option value="Frontend Platform Architect">Frontend Platform Architect</option>
                  <option value="DevOps & Cloud SRE Lead">DevOps & Cloud SRE Lead</option>
                  <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <label className="flex items-center space-x-2.5 text-xs text-slate-600 dark:text-slate-400 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>I agree to DevGrowth Developer Terms & Firebase Storage</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {loading ? <span>Saving to Firebase DB...</span> : <span>Create Account</span>}
            </button>
          </form>
        )}

        {/* Quick Demo Fast-Switch */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800/80">
          <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-2.5 flex items-center">
            <Zap className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
            Quick Demo Profiles (Offline / Instant Access):
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {availableProfiles?.slice(0, 2).map((profile) => (
              <button
                key={profile.uid}
                type="button"
                onClick={() => {
                  loginAsProfile(profile);
                  closeAuthModal();
                }}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-left transition-colors"
              >
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {profile.displayName.split(' ')[0]}
                </p>
                <p className="text-[11px] text-indigo-400 truncate">
                  {profile.targetRole.split(' ')[0]}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
