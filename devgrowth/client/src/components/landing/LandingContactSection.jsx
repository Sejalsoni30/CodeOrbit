import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Github,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const LandingContactSection = ({ onOpenModal }) => {
  const [copiedType, setCopiedType] = useState(null);
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

  const handleCopyEmail = (email, type) => {
    navigator.clipboard.writeText(email);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
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
      errors.email = 'Valid email is required';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Please provide details';
    } else if (formData.message.trim().length < 15) {
      errors.message = 'Must be at least 15 characters';
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
    <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Developer Operations & Support Desk</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Get in Touch with Our Engineering Team
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Questions about roadmap leveling, Firestore security, Gemini AI mentorship, or custom engineering setups? We're ready to assist.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Support Desk Active (99.9% Uptime)</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Response &lt; 24h</span>
          </span>
          {onOpenModal && (
            <button
              onClick={onOpenModal}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 transition-all font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open in Modal Window</span>
            </button>
          )}
        </div>
      </div>

      {/* Dual Layout: Direct Channels & Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Channels */}
        <div className="lg:col-span-5 space-y-5">
          {/* Support Email Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Direct Email</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Technical & General Support</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                <p className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                  support@codeorbit.dev
                </p>
              </div>
              <button
                onClick={() => handleCopyEmail('support@codeorbit.dev', 'support')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 text-xs font-bold transition-all"
              >
                {copiedType === 'support' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Security Desk Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center space-x-3 text-purple-600 dark:text-purple-400">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Security & 2FA Desk</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Vulnerability & Key Inquiries</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security Contact</p>
                <p className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                  security@codeorbit.dev
                </p>
              </div>
              <button
                onClick={() => handleCopyEmail('security@codeorbit.dev', 'security')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-600 dark:text-purple-300 text-xs font-bold transition-all"
              >
                {copiedType === 'security' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GitHub Repo Link */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-200">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Open Source GitHub</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Issue Tracker & Community</p>
              </div>
            </div>

            <a
              href="https://github.com/Sejalsoni30/CodeOrbit"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-2 transition-all shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Code on GitHub →</span>
            </a>
          </div>
        </div>

        {/* Right Column (7 cols): Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 relative">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-1">
                    Support Ticket Logged
                  </span>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                    We received your message regarding <strong className="text-indigo-600 dark:text-indigo-400">{formData.subject}</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 max-w-xs mx-auto">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ticket ID</p>
                  <p className="text-lg font-mono font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {ticketId}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Notification sent to {formData.email}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    Send Us a Message
                  </h3>
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Alex Dev"
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-rose-500">*</span>
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Inquiry Topic
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject Line <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief summary..."
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
                    placeholder="Describe how we can help you..."
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
                        <span>Submit Support Inquiry</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingContactSection;
