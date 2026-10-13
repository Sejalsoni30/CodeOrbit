import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  ShieldCheck,
  X,
  Copy,
  Check,
  Smartphone,
  RefreshCw,
  AlertCircle,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export const GoogleAuthenticatorModal = () => {
  const {
    isTwoFactorModalOpen,
    closeTwoFactorModal,
    verifyTwoFactorCode,
    twoFactorEnabled,
    toggleTwoFactor,
    currentUser,
  } = useAuth();

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef([]);

  const SECRET_KEY = 'DEVG-TOTP-7492-X9Q1';

  // Countdown timer for 30s TOTP refresh cycle
  useEffect(() => {
    if (!isTwoFactorModalOpen) return;
    const interval = setInterval(() => {
      const seconds = 30 - (Math.floor(Date.now() / 1000) % 30);
      setTimeLeft(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTwoFactorModalOpen]);

  // Focus on first input when modal opens
  useEffect(() => {
    if (isTwoFactorModalOpen) {
      setDigits(['', '', '', '', '', '']);
      setError('');
      setSuccess(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isTwoFactorModalOpen]);

  if (!isTwoFactorModalOpen) return null;

  const handleDigitChange = (index, value) => {
    setError('');
    // Allow only numeric digit
    const cleaned = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);

    // Auto-advance to next input
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits filled
    if (cleaned && index === 5) {
      const fullCode = newDigits.join('');
      if (fullCode.length === 6) {
        submitCode(fullCode);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasteData[i] || '';
    }
    setDigits(newDigits);

    if (pasteData.length === 6) {
      submitCode(pasteData);
    } else {
      inputRefs.current[pasteData.length]?.focus();
    }
  };

  const submitCode = (code) => {
    const result = verifyTwoFactorCode(code);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        closeTwoFactorModal();
      }, 700);
    } else {
      setError(result.error || 'Invalid 6-digit code. Please try again.');
    }
  };

  const handleVerifyClick = (e) => {
    e.preventDefault();
    const fullCode = digits.join('');
    if (fullCode.length < 6) {
      setError('Please enter all 6 digits from your Google Authenticator app.');
      return;
    }
    submitCode(fullCode);
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(SECRET_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="glass-card max-w-xl w-full p-7 sm:p-9 border border-slate-200/90 dark:border-slate-700/80 shadow-2xl relative overflow-hidden my-auto">
        {/* Ambient background glow */}
        <div className="absolute -left-10 -top-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeTwoFactorModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Google Authenticator icon */}
        <div className="flex items-center space-x-3.5 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Google Authenticator
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                TOTP 2FA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Two-factor authentication code required to verify identity
            </p>
          </div>
        </div>

        {/* Step 1: Simulated QR Code & Key */}
        <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* SVG Visual QR Code with center key */}
            <div className="w-32 h-32 bg-white p-2.5 rounded-2xl border border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center shrink-0 shadow-md relative group">
              {/* Decorative QR Pattern */}
              <div className="w-full h-full border-2 border-slate-900 rounded p-1 grid grid-cols-4 grid-rows-4 gap-1">
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-slate-300 rounded-sm" />
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-emerald-600 rounded-sm col-span-2 row-span-2 flex items-center justify-center text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-slate-300 rounded-sm" />
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-slate-900 rounded-sm" />
                <div className="bg-slate-300 rounded-sm" />
                <div className="bg-slate-900 rounded-sm" />
              </div>
            </div>

            <div className="text-xs sm:text-sm space-y-2.5 flex-1 text-center sm:text-left">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Scan with the <strong>Google Authenticator</strong> mobile app, or copy the manual key:
              </p>

              {/* Copyable Secret Key */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 shadow-sm">
                <span className="truncate mr-2 font-bold tracking-wider">{SECRET_KEY}</span>
                <button
                  type="button"
                  onClick={copySecretKey}
                  className="p-1 rounded text-slate-400 hover:text-indigo-400 transition-colors"
                  title="Copy Key"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: 6-Digit Code Input */}
        <form onSubmit={handleVerifyClick} className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
              <span>Enter 6-Digit Verification Code</span>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-normal">
                <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
                <span>Code refresh in {timeLeft}s</span>
              </div>
            </div>

            {/* 6 Digit Input Cells */}
            <div className="flex justify-between gap-2 sm:gap-3 on-paste" onPaste={handlePaste}>
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-extrabold rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          {/* Error / Success Alerts */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs sm:text-sm flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>2FA Verified Successfully! Signing in...</span>
            </div>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] mt-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Verify & Complete Login</span>
          </button>

          {/* Test Hint & Toggle */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Tip: Enter any 6 digits (e.g. 123456)</span>
            <button
              type="button"
              onClick={toggleTwoFactor}
              className="text-indigo-400 hover:underline font-bold"
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoogleAuthenticatorModal;
