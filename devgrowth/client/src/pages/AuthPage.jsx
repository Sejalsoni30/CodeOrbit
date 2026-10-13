import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Zap,
  Briefcase,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

export const AuthPage = ({ initialTab = 'login' }) => {
  const {
    loginWithGoogle,
    loginAsGoogleDemo,
    loginWithEmail,
    registerWithEmail,
    availableProfiles,
    loginAsProfile,
    twoFactorEnabled,
    openTwoFactorModal,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(
    location.pathname === '/register' ? 'register' : initialTab
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (location.pathname === '/register') {
      setTab('register');
    } else {
      setTab('login');
    }
    setError('');
  }, [location.pathname]);

  // Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [role, setRole] = useState('Senior Full Stack Engineer');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !regEmail || !regPassword) {
      setError('Please complete all required fields.');
      return;
    }
    if (regPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail({
        name,
        email: regEmail,
        targetRole: role,
        password: regPassword,
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Google sign-in was cancelled.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 sm:px-6 relative z-10">
      <div className="relative max-w-xl w-full">
        {/* Floating Decorative Tech Chips for desktop */}
        <div className="hidden xl:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-xl absolute -left-20 top-20 -rotate-6 animate-float z-20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Cloud Firestore TLS</span>
        </div>
        <div className="hidden xl:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-xl absolute -right-20 bottom-24 rotate-6 animate-float-delayed z-20">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span>TOTP 2FA Protected</span>
        </div>

        {/* Spacious Card Container */}
        <div className="glass-card w-full border border-indigo-100 dark:border-slate-800/90 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.22),0_0_40px_rgba(168,85,247,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_rgba(99,102,241,0.2)] rounded-3xl overflow-hidden relative">
          {/* Top Iridescent Gradient Beam */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Ambient Inner Glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/15 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="p-8 sm:p-10 relative z-10">
            <div className="mb-6 text-center">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigate('/landing')}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1.5 px-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Landing Page</span>
                </button>
                <span className="text-[10px] font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  Secure Gateway
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/35 ring-4 ring-indigo-500/15">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {tab === 'login' ? 'Welcome Back' : 'Create Your Account'}
              </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            {tab === 'login'
              ? 'Sign in to access your engineering metrics, synced directly with Firebase.'
              : 'Join DevGrowth to measure engineering velocity with real Firebase authentication.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-6">
          <button
            onClick={() => { setTab('login'); setError(''); navigate('/login', { replace: true }); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              tab === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); navigate('/register', { replace: true }); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              tab === 'register'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Register
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
                    navigate('/');
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

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3.5 py-3.5 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold shadow-sm transition-all mb-5 group"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase font-bold text-slate-400">
            <span className="bg-white/90 dark:bg-slate-900/90 px-3.5 py-0.5 rounded-full border border-slate-200/60 dark:border-slate-800">
              Or continue with email
            </span>
          </div>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@devgrowth.io"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <button
                type="button"
                onClick={openTwoFactorModal}
                className="flex items-center space-x-1.5 text-slate-400 hover:text-emerald-400 font-semibold"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Google Authenticator (2FA)</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all mt-2"
            >
              <span>Sign In with Firebase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Developer"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all"
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
                  placeholder="alex@devgrowth.io"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Role
              </label>
              <div className="relative">
                <Briefcase className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all cursor-pointer"
                >
                  <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
                  <option value="Staff Distributed Systems Architect">Staff Distributed Systems Architect</option>
                  <option value="DevOps & Cloud Architect">DevOps & Cloud Architect</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
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
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all mt-2 active:scale-98"
            >
              <span>Create Account in Firebase</span>
            </button>
          </form>
        )}

        {/* Demo Profiles */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800">
          <p className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-2.5 flex items-center">
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 mr-1.5" />
            <span>Instant Demo Accounts:</span>
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {availableProfiles?.slice(0, 2).map((p) => (
              <button
                key={p.uid}
                onClick={() => {
                  loginAsProfile(p);
                  navigate('/');
                }}
                className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 hover:border-indigo-500/40 text-left transition-all shadow-sm hover:shadow-md group"
              >
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {p.displayName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-indigo-400 truncate mt-0.5">{p.targetRole}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default AuthPage;
