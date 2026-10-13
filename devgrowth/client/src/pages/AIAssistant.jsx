import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { useAuth } from '../hooks/useAuth';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Zap,
  Code2,
  Terminal,
  HelpCircle
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'What should I prioritize to reach Staff Engineer level?',
  'Give me 3 Senior System Design interview questions on Kafka & caching',
  'How do I transition from Frontend Engineer to Full Stack?',
  'Draft a 30-day mastery plan for Distributed Systems & Docker',
];

const LOCAL_KNOWLEDGE_BASE = {
  staff: `To advance to Staff Engineer (L6), elevate your scope beyond individual features:
1. **System & RFC Leadership:** Drive cross-team Architectural RFCs. Design systems with fault-tolerance, clear SLAs, and disaster recovery.
2. **Technical Leverage:** Build platforms, shared SDKs, or developer tools that make 20+ other engineers 2x faster.
3. **Strategic Alignment:** Connect technical initiatives directly to business outcomes (e.g., cutting latency by 40% to prevent checkout abandonment).
4. **Mentorship & Culture:** Uplift mid-level and senior engineers through high-bar code reviews and blameless post-mortems.`,

  design: `Here are 3 Senior System Design interview challenges:
1. **Global Rate Limiter (Token Bucket Algorithm):**
   - *Requirement:* Handle 500,000 RPS across multi-region clusters with Redis or Local sliding-window memory and Cassandra audit trail.
2. **Distributed Job Queue with Delayed Execution:**
   - *Requirement:* Guarantees at-least-once delivery, idempotent consumer workers, and dead-letter queue (DLQ) retry policies.
3. **Real-time Collaborative Document Engine:**
   - *Requirement:* Handle concurrent multi-user cursor updates using Operational Transformation (OT) or CRDTs over WebSockets.`,

  transition: `Strategic Roadmap: Frontend ➔ High-Performance Full Stack:
1. **Core Runtime & Networking:** Deep-dive into the Node.js Event Loop, HTTP/2 & HTTP/3 multiplexing, and WebSocket lifecycles.
2. **Data Persistence Mastery:** Learn ACID properties, PostgreSQL index types (B-Tree, GIN), connection pooling (PgBouncer), and NoSQL caching (Redis).
3. **API & Contract Engineering:** Master REST idempotency, GraphQL query complexity analysis, and gRPC protobuf contracts.
4. **Containerization & CI/CD:** Package applications with Docker multi-stage builds and automate GitHub Actions deploys.`,

  plan: `Your 30-Day Intensive Distributed Systems & Docker Plan:
- **Week 1 (Foundations):** Docker multi-stage builds, Alpine base images, and Linux cgroups/namespaces isolation.
- **Week 2 (Data Pipelines):** Set up Apache Kafka or RabbitMQ with consumer groups and poison-pill message handling.
- **Week 3 (Resilience Patterns):** Implement Circuit Breakers (Resilience4j / opossum), bulkhead isolation, and exponential backoff jitter.
- **Week 4 (Observability):** Instrument metrics with Prometheus, tracing with OpenTelemetry, and visualize dashboards in Grafana.`,
};

export const AIAssistant = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello ${currentUser?.displayName?.split(' ')[0] || 'Alex'}! I am your DevGrowth Gemini Engineering Career Advisor. I analyze your current stack (${currentUser?.targetRole || 'Full Stack Engineer'}) to help you prepare for technical interviews, architect distributed systems, and plan career milestones.`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const getSmartFallback = (query) => {
    const q = query.toLowerCase();
    if (q.includes('staff') || q.includes('lead') || q.includes('promotion') || q.includes('prioritize')) {
      return LOCAL_KNOWLEDGE_BASE.staff;
    }
    if (q.includes('system design') || q.includes('interview') || q.includes('question') || q.includes('kafka')) {
      return LOCAL_KNOWLEDGE_BASE.design;
    }
    if (q.includes('frontend') || q.includes('transition') || q.includes('full stack') || q.includes('backend')) {
      return LOCAL_KNOWLEDGE_BASE.transition;
    }
    if (q.includes('plan') || q.includes('30-day') || q.includes('docker') || q.includes('learn')) {
      return LOCAL_KNOWLEDGE_BASE.plan;
    }

    return `Here is tailored guidance for: "${query}"\n\n1. **Core Recommendation:** Break down this objective into measurable sprint deliverables.\n2. **Architecture Focus:** Ensure you understand the underlying trade-offs (latency vs consistency, read vs write heavy).\n3. **Practical Validation:** Build a runnable proof-of-concept repository to reinforce theoretical knowledge and add it to your DevGrowth portfolio.`;
  };

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query.trim() || loading) return;

    const userMessage = {
      role: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.askGemini(query);
      if (response?.data?.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: response.data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('No reply from server');
      }
    } catch {
      // Graceful smart local career guidance
      const fallbackReply = getSmartFallback(query);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: fallbackReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setLoading(false);
      }, 450);
      return;
    }

    setLoading(false);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        text: 'Chat history cleared. How can I assist your engineering goals next?',
        time: 'Just now',
      },
    ]);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Gemini Engineering Advisor
              </h2>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                AI Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Personalized career strategy, system design mock interviews, and code feedback
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Clear chat history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Suggested prompts carousel chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs shrink-0">
        <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap flex items-center">
          <Sparkles className="w-3 h-3 text-indigo-400 mr-1 inline" />
          Suggestions:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold whitespace-nowrap border border-indigo-500/20 transition-all hover:scale-105 active:scale-95"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 glass-card space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5 pb-1 border-b border-white/10 dark:border-slate-700/50">
                <span className="font-bold uppercase tracking-wider text-indigo-400">
                  {m.role === 'user' ? 'You' : 'Gemini Advisor'}
                </span>
                <div className="flex items-center space-x-2">
                  <span>{m.time}</span>
                  {m.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(m.text, i)}
                      className="text-slate-400 hover:text-white p-0.5"
                      title="Copy response"
                    >
                      {copiedIndex === i ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="whitespace-pre-line font-normal">
                {m.text}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-indigo-400 p-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            <span className="font-medium">Synthesizing engineering recommendation...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for system design guidance, mock interview prompts, or career planning..."
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 flex items-center space-x-1.5 transition-all active:scale-95"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;

