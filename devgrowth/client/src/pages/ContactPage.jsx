import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  MessageSquare,
  ShieldCheck,
  Send,
  CheckCircle2,
  Clock,
  Github,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Globe
} from 'lucide-react';
import BackgroundMesh from '../components/common/BackgroundMesh';

export const ContactPage = () => {
  const navigate = useNavigate();
  const [copiedType, setCopiedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

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
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject line is required';
    if (!formData.message.trim()) {
      errors.message = 'Please provide details in your message';
    } else if (formData.message.trim().length < 15) {
      errors.message = 'Message must be at least 15 characters long';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Realistic simulated sending with ticket assignment
    setTimeout(() => {
      const generatedTicket = `CO-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
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

  const faqs = [
    {
      q: 'How do I reset my Google Authenticator 2FA key if I lose my device?',
      a: 'If you have an active session or demo access, you can re-generate a new 2FA secret from your profile security modal. For hard account lockouts, contact our security desk with your verified account email to initiate an identity recovery check.'
    },
    {
      q: 'How does the Gemini 2.5 AI Advisor handle my private codebase questions?',
      a: 'All prompts sent to the AI Mentor are dispatched through enterprise-tier encrypted channels. Under Google Developer API terms, your private queries and code snippets are strictly ephemeral and are never used to train foundation models.'
    },
    {
      q: 'Can I export my developer skill matrix and sprint metrics?',
      a: 'Yes! CodeOrbit provides full data portability under GDPR/CCPA guidelines. You can generate a machine-readable JSON export of your career roadmap and competencies anytime from your account settings.'
    },
    {
      q: 'What is Instant Demo Mode?',
      a: 'Instant Demo Mode lets prospective engineers and reviewers explore the full interactive dashboard, skill leveling matrix, and roadmap simulator immediately with high-fidelity mock data without requiring upfront registration.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-x-hidden">
      <BackgroundMesh />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">Contact & Support</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/privacy')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all"
            >
              <span>Terms & Legal</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Go to Login</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="glass-card p-8 sm:p-10 mb-10 border border-indigo-100 dark:border-slate-800 relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 absolute top-0 left-0" />
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>24/7 Developer Operations & Engineering Support</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Get in Touch with CodeOrbit
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Have questions about roadmap customization, Firestore account security, Google Authenticator setup, or enterprise engineering teams? Our team of engineers is here to help.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational (SLA 99.9%)</span>
              </span>
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Clock className="w-3.5 h-3.5" />
                <span>Typical Response &lt; 24h</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dual Layout: Direct Channels vs Interactive Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column (5 cols): Direct Channels & SLA */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Support Email Box */}
            <div className="glass-card p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Direct Email Support</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">General & Technical Inquiries</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                    support@codeorbit.dev
                  </p>
                </div>
                <button
                  onClick={() => handleCopyEmail('support@codeorbit.dev', 'support')}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 text-xs font-bold transition-all"
                  title="Copy to clipboard"
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

            {/* Security & Vulnerability Channel */}
            <div className="glass-card p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-purple-600 dark:text-purple-400">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Security & Vulnerability Desk</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Responsible Disclosure & PGP</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Security Contact</p>
                  <p className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                    security@codeorbit.dev
                  </p>
                </div>
                <button
                  onClick={() => handleCopyEmail('security@codeorbit.dev', 'security')}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-600 dark:text-purple-300 text-xs font-bold transition-all"
                  title="Copy to clipboard"
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

            {/* Open Source GitHub Repository */}
            <div className="glass-card p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-200">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">GitHub Open Source</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Issue Tracker & Community PRs</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                CodeOrbit (DevGrowth) is maintained on GitHub. Feel free to report frontend bugs, request career leveling roadmap modules, or inspect technical implementations.
              </p>

              <a
                href="https://github.com/Sejalsoni30/CodeOrbit"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Repository →</span>
              </a>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800/80 relative">
              {isSubmitted ? (
                /* Success Confirmation State */
                <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                      Inquiry Dispatched Successfully
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                      We have received your message regarding <strong className="text-indigo-600 dark:text-indigo-400">{formData.subject}</strong>. Our engineering desk has logged support ticket reference:
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 max-w-sm mx-auto">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Ticket ID</p>
                    <p className="text-xl font-mono font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {ticketId}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      A confirmation email has been mirrored to {formData.email}.
                    </p>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* The Contact Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        Send Us a Message
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Fill in the details below and an engineer will reply directly.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Send className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Developer"
                        className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-slate-900/80 text-xs sm:text-sm text-slate-900 dark:text-white transition-all outline-none ${
                          formErrors.name
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                            : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Work / Account Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-slate-900/80 text-xs sm:text-sm text-slate-900 dark:text-white transition-all outline-none ${
                          formErrors.email
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                            : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Technical Support',
                        'Enterprise / Teams',
                        'Feature Suggestion',
                        '2FA & Security',
                        'Account Deletion',
                        'General Question'
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all ${
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

                  {/* Subject Line */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject Line <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief summary of your inquiry..."
                      className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-slate-900/80 text-xs sm:text-sm text-slate-900 dark:text-white transition-all outline-none ${
                        formErrors.subject
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Body */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Detailed Message <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {formData.message.length} characters
                      </span>
                    </div>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe what you are trying to accomplish, any error codes encountered, or feedback..."
                      className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-slate-900/80 text-xs sm:text-sm text-slate-900 dark:text-white transition-all outline-none leading-relaxed resize-none ${
                        formErrors.message
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 disabled:opacity-60"
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
                    <p className="text-[11px] text-slate-400 text-center mt-2.5">
                      Your inquiry is protected by TLS encryption and handled under our Privacy Policy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions (Accordion) */}
        <div className="glass-card p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-500">
              Immediate Answers
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Check here before submitting a ticket — your answer might already be waiting.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-500 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 CodeOrbit (DevGrowth) Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-semibold">
            <button onClick={() => navigate('/terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => navigate('/privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
