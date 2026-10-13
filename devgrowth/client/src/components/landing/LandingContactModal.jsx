import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Mail,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Github,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const LandingContactModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Technical Support',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('support@codeorbit.dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 15) {
      errors.message = 'Please provide at least 15 characters';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generated = `CO-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generated);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1100);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      category: 'Technical Support',
      subject: '',
      message: ''
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/30 dark:border-indigo-500/30 shadow-[0_20px_70px_rgba(99,102,241,0.25)] text-left overflow-y-auto max-h-[92vh] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800/80 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Developer Operations Desk</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Contact CodeOrbit Support
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Have a question, feedback, or need engineering support? Send us a message directly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-4 relative z-10">
          {isSubmitted ? (
            /* Success confirmation */
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-1">
                  Message Dispatched
                </span>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  Thank You, {formData.name}!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Your inquiry regarding <strong className="text-indigo-600 dark:text-indigo-400">{formData.subject}</strong> has been logged into our support triage queue.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 max-w-xs mx-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ticket ID Reference</p>
                <p className="text-lg font-mono font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {ticketId}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Response target: Within 24h to {formData.email}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all"
                >
                  Send Another Message
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Alex Developer"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/70 text-xs sm:text-sm text-slate-900 dark:text-white outline-none transition-all ${
                      formErrors.name
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                        : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[10px] text-rose-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Work / Account Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/70 text-xs sm:text-sm text-slate-900 dark:text-white outline-none transition-all ${
                      formErrors.email
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                        : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[10px] text-rose-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Category Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Topic Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Technical Support',
                    'Enterprise Roadmap',
                    '2FA & Security',
                    'Feature Request',
                    'General Question'
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                        formData.category === cat
                          ? 'bg-indigo-600 text-white font-bold shadow-sm'
                          : 'border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Line <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Summary of what you need help with..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/70 text-xs sm:text-sm text-slate-900 dark:text-white outline-none transition-all ${
                    formErrors.subject
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                      : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                {formErrors.subject && (
                  <p className="text-[10px] text-rose-500 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Message Details <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {formData.message.length} chars
                  </span>
                </div>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share details or questions with the engineering desk..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/70 text-xs sm:text-sm text-slate-900 dark:text-white outline-none leading-relaxed resize-none transition-all ${
                    formErrors.message
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                      : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-[10px] text-rose-500 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Dispatching Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Support Inquiry</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Quick Channels Footer */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
              support@codeorbit.dev
            </span>
            <button
              onClick={handleCopyEmail}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-500 transition-colors"
              title="Copy email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/Sejalsoni30/CodeOrbit"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href="/contact"
              className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingContactModal;
