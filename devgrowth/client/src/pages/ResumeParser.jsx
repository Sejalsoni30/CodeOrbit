import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  UploadCloud,
  Sparkles,
  Award,
  Milestone,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  ArrowRight,
  RefreshCw,
  Layers,
  ChevronRight,
  Sliders,
  ExternalLink,
  Code2,
  Cpu,
  Zap,
  Check,
  FileCheck,
  Trash2
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { useAuth } from '../hooks/useAuth';

// Curated high-impact sample resumes for immediate 1-click testing
const SAMPLE_RESUMES = {
  staff: `ALEX DEVELOPER
alex@devgrowth.io | https://github.com/alex-dev | San Francisco, CA
Target Role: Senior Full Stack Engineer / Staff Architect

PROFESSIONAL SUMMARY
Results-driven software engineer with 6+ years of experience engineering high-throughput distributed microservices, scalable React 18 architectures, and resilient event streaming pipelines. Proven track record reducing API latency by 42% and managing cloud infrastructure processing 25,000+ requests/second.

CORE TECHNICAL SKILLS
- Frontend: React 18, Next.js, TypeScript, TailwindCSS, Redux Toolkit, Webpack
- Backend: Node.js, Express, Go (Golang), Python, REST APIs, GraphQL, gRPC
- Data & Storage: PostgreSQL, Redis, MongoDB, Apache Kafka, Elasticsearch
- Cloud & DevOps: Docker, Kubernetes, AWS (S3, Lambda, ECS, RDS), CI/CD GitHub Actions, Terraform
- Architecture: System Design, Microservices, Micro-frontends, Distributed Caching, Observability (OpenTelemetry)

EXPERIENCE & QUANTIFIABLE METRICS
Staff Software Engineer | CloudScale Systems (2022 - Present)
- Architected distributed event-driven order processing engine using Go and Apache Kafka, processing 25,000 requests/sec with zero packet loss during peak flash sales.
- Reduced p99 API response latency by 42% across core gateway services by implementing Redis distributed cache invalidation and query optimization in PostgreSQL.
- Spearheaded company-wide frontend migration to React 18 and Next.js SSR, improving Core Web Vitals LCP by 64% and decreasing initial page load times from 2.8s to 980ms.
- Built automated AI code review GitHub Action leveraging Google Gemini API, analyzing 450+ PRs monthly and decreasing security vulnerabilities by 35%.

Senior Full Stack Developer | FinTech Orbit (2019 - 2022)
- Led team of 6 engineers building multi-tenant financial reporting dashboard serving 120,000 daily active users with 99.99% uptime.
- Cut AWS infrastructure operational expenditure by 28% ($14,000/month) through container autoscaling and database read replica optimization.
- Engineered bank webhook ingestion service with idempotency keys and dead-letter queues, handling over $12M daily transaction volume.

EDUCATION & CERTIFICATIONS
B.S. in Computer Science | University of California, Berkeley
AWS Certified Solutions Architect – Associate (2023)`,

  cloud: `PRIYA SHARMA
priya.sharma@cloudtech.dev | https://github.com/priyasharma-ops
Target Role: Cloud Native & Platform Engineer / DevOps Lead

PROFESSIONAL SUMMARY
Cloud infrastructure specialist with 5 years scaling Kubernetes clusters, GitOps pipelines, and zero-trust service meshes across multi-region AWS and GCP deployments.

CORE TECHNICAL SKILLS
- Cloud Platforms: AWS, GCP, Azure
- Container Orchestration: Kubernetes, Docker, Helm, Istio Service Mesh
- Infrastructure as Code: Terraform, Terragrunt, Ansible
- CI/CD & Observability: GitHub Actions, ArgoCD, Prometheus, Grafana, Jaeger, Loki
- Languages: Go, Python, Bash, TypeScript, SQL

EXPERIENCE & METRICS
Platform Engineer | DevOps Matrix (2021 - Present)
- Designed and maintained 14 production Kubernetes clusters hosting 180+ microservices on AWS EKS with 99.99% service availability.
- Cut CI/CD deployment cycle times from 45 minutes to 7 minutes via GitOps and ArgoCD canary deployment strategies.
- Achieved $240,000 annual cloud cost reduction by implementing Spot instance automated termination handling and Karpenter autoscaling.
- Automated mutual TLS zero-trust network encryption across all cluster nodes using Istio service mesh and cert-manager.`
};

export const ResumeParser = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [targetRole, setTargetRole] = useState(currentUser?.targetRole || 'Senior Full Stack Engineer');
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [activeInputTab, setActiveInputTab] = useState('upload'); // 'upload' | 'paste'
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'metrics' | 'gaps' | 'roadmap'

  // Processing state
  const [parsing, setParsing] = useState(false);
  const [parseStep, setParseStep] = useState(0); // 0: Idle, 1: Reading, 2: Gemini Parsing, 3: Generating Roadmap
  const [analysisResult, setAnalysisResult] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // Sync state tracking
  const [syncStatus, setSyncStatus] = useState({
    roadmap: false,
    skills: false,
    loading: false,
  });

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    const validExtensions = ['.pdf', '.docx', '.txt'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setStatusMessage({
        type: 'error',
        text: 'Please upload a PDF (.pdf), Word document (.docx), or plain text (.txt) resume.',
      });
      return;
    }

    setSelectedFile(file);
    setStatusMessage({
      type: 'info',
      text: `Loaded "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Ready for Gemini ATS parsing.`,
    });
  };

  const loadSample = (key) => {
    const text = SAMPLE_RESUMES[key];
    setResumeText(text);
    setSelectedFile(null);
    setActiveInputTab('paste');
    setStatusMessage({
      type: 'info',
      text: `Loaded ${key === 'staff' ? 'Staff Full Stack' : 'Cloud Native'} verified sample resume! Click "Scan & Parse with Gemini ATS".`,
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile && !resumeText.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please select a resume file or paste resume text before scanning.',
      });
      return;
    }

    setParsing(true);
    setParseStep(1);
    setStatusMessage(null);

    try {
      let response;

      // Simulated progressive step indicator for smooth UX
      setTimeout(() => setParseStep(2), 600);
      setTimeout(() => setParseStep(3), 1400);

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('targetRole', targetRole);
        response = await aiService.parseResume(formData);
      } else {
        response = await aiService.parseResume({
          resumeText: resumeText.trim(),
          targetRole,
        });
      }

      const data = response.data?.data;
      if (!data) {
        throw new Error('No analysis data received from server');
      }

      setAnalysisResult(data);
      setParseStep(0);
      setParsing(false);
      setStatusMessage({
        type: 'success',
        text: `Successfully analyzed with Gemini ATS Engine! Match Score: ${data.atsScore}/100.`,
      });
    } catch (err) {
      console.error('[Resume Parser] Analyze error:', err);
      setParsing(false);
      setParseStep(0);
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to parse resume. Please try again.',
      });
    }
  };

  // Sync Extracted Milestones into Roadmap (LocalStorage & Server)
  const handleSyncRoadmap = async () => {
    if (!analysisResult?.roadmapMilestones) return;
    setSyncStatus((prev) => ({ ...prev, loading: true }));

    try {
      // 1. Update client localStorage
      const existingRoadmap = (() => {
        try {
          const raw = localStorage.getItem('devgrowth_roadmap');
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      })();

      // Merge new milestones without duplicating titles
      const merged = [...analysisResult.roadmapMilestones, ...existingRoadmap];
      // Keep unique by title
      const uniqueMilestones = Array.from(
        new Map(merged.map((item) => [item.title, item])).values()
      );
      localStorage.setItem('devgrowth_roadmap', JSON.stringify(uniqueMilestones));

      // 2. Sync to server backend
      await aiService.populateRoadmap({
        milestones: analysisResult.roadmapMilestones,
        userId: currentUser?.uid,
      });

      setSyncStatus((prev) => ({ ...prev, roadmap: true, loading: false }));
      setStatusMessage({
        type: 'success',
        text: `Populated ${analysisResult.roadmapMilestones.length} strategic milestones into your Career Roadmap!`,
      });
    } catch (err) {
      console.warn('Roadmap sync warning:', err.message);
      setSyncStatus((prev) => ({ ...prev, roadmap: true, loading: false }));
    }
  };

  // Sync Extracted Skills and Skill Gaps into Skill Tracker (LocalStorage & Server)
  const handleSyncSkills = async () => {
    if (!analysisResult?.extractedSkills) return;
    setSyncStatus((prev) => ({ ...prev, loading: true }));

    try {
      // 1. Update client localStorage
      const existingSkills = (() => {
        try {
          const raw = localStorage.getItem('devgrowth_skills');
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      })();

      const newSkillsFormatted = analysisResult.extractedSkills.map((s, idx) => ({
        id: Date.now() + idx,
        name: s.name,
        category: s.category || 'Engineering',
        proficiency: s.proficiency || 80,
        priority: 'High',
      }));

      // Add gaps as skills to learn
      const gapSkillsFormatted = (analysisResult.skillGaps || []).map((g, idx) => ({
        id: Date.now() + 100 + idx,
        name: g.name,
        category: g.category || 'DevOps',
        proficiency: 45,
        priority: 'High',
      }));

      const mergedSkills = [...newSkillsFormatted, ...gapSkillsFormatted, ...existingSkills];
      const uniqueSkills = Array.from(
        new Map(mergedSkills.map((item) => [item.name.toLowerCase(), item])).values()
      );
      localStorage.setItem('devgrowth_skills', JSON.stringify(uniqueSkills));

      // 2. Sync to server backend
      await aiService.populateSkills({
        skills: analysisResult.extractedSkills,
        skillGaps: analysisResult.skillGaps,
        userId: currentUser?.uid,
      });

      setSyncStatus((prev) => ({ ...prev, skills: true, loading: false }));
      setStatusMessage({
        type: 'success',
        text: `Populated ${uniqueSkills.length} skills & targeted gaps into your Skill Proficiency Tracker!`,
      });
    } catch (err) {
      console.warn('Skills sync warning:', err.message);
      setSyncStatus((prev) => ({ ...prev, skills: true, loading: false }));
    }
  };

  // 1-Click Sync All
  const handleSyncAll = async () => {
    await handleSyncRoadmap();
    await handleSyncSkills();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="p-4 sm:p-6 glass-card border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30">
                <Sparkles className="w-3 h-3 text-indigo-400 animate-spin-slow" />
                <span>Gemini ATS Intelligence</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                PDF & DOCX Parser
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Resume Upload & ATS Parser
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Upload your engineering resume to extract verified skills, measure quantifiable project metrics, detect critical promotion gaps, and automatically populate your career roadmap milestones with Gemini AI.
            </p>
          </div>

          {/* Target Role Selector */}
          <div className="shrink-0 bg-white/70 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm w-full md:w-auto">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              Target Role Benchmark
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full md:w-56 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
              <option value="Staff Backend Architect">Staff Backend Architect</option>
              <option value="Cloud Native & Platform Lead">Cloud Native & Platform Lead</option>
              <option value="AI / Systems Software Engineer">AI / Systems Software Engineer</option>
              <option value="Frontend Architecture Specialist">Frontend Architecture Specialist</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-in fade-in duration-150 ${
            statusMessage.type === 'error'
              ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
              : statusMessage.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
          }`}
        >
          <div className="flex items-center space-x-2">
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0" />
            )}
            <span className="font-semibold">{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-200 font-bold px-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload Zone & Quick Sample Loaders */}
      <div className="glass-card p-4 sm:p-6 space-y-4">
        {/* Input Switch Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveInputTab('upload')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeInputTab === 'upload'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload PDF / DOCX</span>
            </button>
            <button
              onClick={() => setActiveInputTab('paste')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeInputTab === 'paste'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Text</span>
            </button>
          </div>

          {/* Quick Demo Pre-load Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              1-Click Demos:
            </span>
            <button
              onClick={() => loadSample('staff')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
            >
              Staff Engineer
            </button>
            <button
              onClick={() => loadSample('cloud')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              DevOps Lead
            </button>
          </div>
        </div>

        {/* Tab 1: Drag & Drop Upload Zone */}
        {activeInputTab === 'upload' && (
          <div>
            {!selectedFile ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center transition-all cursor-pointer ${
                  dragOver
                    ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                    : 'border-slate-300 dark:border-slate-700/80 hover:border-indigo-400/60 bg-slate-50/50 dark:bg-slate-900/40'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleFileInput}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />

                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3 text-indigo-500 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Drop your resume here, or <span className="text-indigo-500 underline">browse files</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PDF (.pdf), Word (.docx), and plain text (.txt) up to 10MB
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    ATS-Friendly Parsing
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    Gemini 2.5 Flash
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    Automatic Milestone Generation
                  </span>
                </div>
              </div>
            ) : (
              /* Selected file preview card */
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready for Gemini Analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Change
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Paste Raw Text */}
        {activeInputTab === 'paste' && (
          <div className="space-y-3">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your plain text resume here, including skills, project metrics, and job experience..."
              rows={6}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{resumeText.length} characters</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => loadSample('staff')}
                  className="text-indigo-400 hover:underline"
                >
                  Load Staff Sample
                </button>
                <span>•</span>
                <button
                  onClick={() => loadSample('cloud')}
                  className="text-purple-400 hover:underline"
                >
                  Load DevOps Sample
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scan & Parse Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-slate-400">
            Targeting: <strong className="text-indigo-400">{targetRole}</strong>
          </p>

          <button
            onClick={handleAnalyze}
            disabled={parsing || (!selectedFile && !resumeText.trim())}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {parsing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>
                  {parseStep === 1
                    ? 'Reading Document Buffer...'
                    : parseStep === 2
                    ? 'Gemini ATS Extraction...'
                    : 'Generating Milestones & Gaps...'}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Scan & Parse with Gemini ATS</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results View */}
      {analysisResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Executive Candidate Scorecard */}
          <div className="p-4 sm:p-6 glass-card border border-indigo-500/20 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Candidate Info */}
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {analysisResult.candidate.seniorityLevel || 'L5 Senior Engineer'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ATS Verified
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {analysisResult.candidate.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  {analysisResult.candidate.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                  <span>✉ {analysisResult.candidate.email}</span>
                  <span>•</span>
                  <span>Target: <strong className="text-indigo-400">{analysisResult.candidate.targetRole}</strong></span>
                </div>
              </div>

              {/* ATS Match Gauge & Score Card */}
              <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shrink-0">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Circular SVG Meter */}
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-700"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-indigo-500 transition-all duration-1000 ease-out"
                      strokeDasharray={`${analysisResult.atsScore}, 100`}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {analysisResult.atsScore}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-400">/ 100</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">ATS Match Index</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">
                    {analysisResult.atsScore >= 80 ? 'Interview Ready' : 'Needs Optimization'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Benchmarked for {targetRole}
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Metric Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                <p className="text-[10px] uppercase font-bold text-slate-400">Keyword Match</p>
                <p className="text-lg font-extrabold text-indigo-500 mt-0.5">
                  {analysisResult.atsBreakdown?.keywordMatch || 88}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                <p className="text-[10px] uppercase font-bold text-slate-400">Project Metrics</p>
                <p className="text-lg font-extrabold text-emerald-400 mt-0.5">
                  {analysisResult.atsBreakdown?.quantifiableImpact || 85}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                <p className="text-[10px] uppercase font-bold text-slate-400">System Depth</p>
                <p className="text-lg font-extrabold text-purple-400 mt-0.5">
                  {analysisResult.atsBreakdown?.systemArchitecture || 82}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                <p className="text-[10px] uppercase font-bold text-slate-400">Seniority Alignment</p>
                <p className="text-lg font-extrabold text-amber-400 mt-0.5">
                  {analysisResult.atsBreakdown?.seniorityAlignment || 89}%
                </p>
              </div>
            </div>
          </div>

          {/* Gemini Action Center: Auto-Populate Controls */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/40 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-extrabold text-white">
                  Gemini Career Velocity Sync
                </h4>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Automatically populate your roadmap milestones and skill gaps into your DevGrowth dashboard with 1 click.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSyncRoadmap}
                disabled={syncStatus.loading || syncStatus.roadmap}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  syncStatus.roadmap
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {syncStatus.roadmap ? <Check className="w-3.5 h-3.5" /> : <Milestone className="w-3.5 h-3.5" />}
                <span>{syncStatus.roadmap ? 'Roadmap Synced' : 'Sync Roadmap'}</span>
              </button>

              <button
                onClick={handleSyncSkills}
                disabled={syncStatus.loading || syncStatus.skills}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  syncStatus.skills
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {syncStatus.skills ? <Check className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                <span>{syncStatus.skills ? 'Skills Synced' : 'Sync Skills & Gaps'}</span>
              </button>

              <button
                onClick={handleSyncAll}
                disabled={syncStatus.loading || (syncStatus.roadmap && syncStatus.skills)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-extrabold shadow-md shadow-indigo-500/30 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Populate Everything</span>
              </button>
            </div>
          </div>

          {/* Deep-Dive Analysis Tabs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-200/80 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'skills'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Extracted Skills ({analysisResult.extractedSkills?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('metrics')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'metrics'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Project Metrics & Scale ({analysisResult.projectMetrics?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('gaps')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'gaps'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Target Skill Gaps ({analysisResult.skillGaps?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'roadmap'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Milestone className="w-3.5 h-3.5" />
                <span>Tailored Roadmap ({analysisResult.roadmapMilestones?.length || 0})</span>
              </button>
            </div>

            {/* Tab 1: Extracted Skills */}
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResult.extractedSkills?.map((skill, idx) => (
                  <div key={idx} className="p-4 glass-card-hover flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                          {skill.verified && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-extrabold text-indigo-500">
                          {skill.proficiency}%
                        </span>
                      </div>

                      {/* Proficiency bar */}
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {skill.context || 'Recognized technical proficiency from resume experience.'}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="uppercase font-semibold tracking-wider">{skill.category}</span>
                      <span className="text-indigo-400">ATS Match Point</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Project Metrics */}
            {activeTab === 'metrics' && (
              <div className="space-y-3">
                {analysisResult.projectMetrics?.map((pm, idx) => (
                  <div key={idx} className="p-4 glass-card-hover flex items-start space-x-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {pm.metric}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {pm.impact}
                      </p>
                      <div className="pt-1 flex items-center space-x-2 text-[10px]">
                        <span className="text-indigo-400 font-bold uppercase tracking-wider">Tech Context:</span>
                        <span className="text-slate-400">{pm.tech}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Target Skill Gaps */}
            {activeTab === 'gaps' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResult.skillGaps?.map((gap, idx) => (
                  <div key={idx} className="p-4 sm:p-5 glass-card-hover border-l-4 border-l-amber-500 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {gap.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {gap.severity || 'High Priority'}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Why this matters:
                          </p>
                          <p className="text-slate-600 dark:text-slate-300">
                            {gap.why}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                            Actionable Next Step:
                          </p>
                          <p className="text-slate-600 dark:text-slate-300">
                            {gap.action}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 uppercase text-[10px] font-semibold">{gap.category}</span>
                      <button
                        onClick={handleSyncSkills}
                        className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center space-x-1"
                      >
                        <span>Track Gap</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Tailored Roadmap Milestones */}
            {activeTab === 'roadmap' && (
              <div className="space-y-4">
                {analysisResult.roadmapMilestones?.map((milestone, idx) => (
                  <div key={idx} className="p-4 sm:p-5 glass-card-hover">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                          {milestone.date}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {milestone.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 self-start sm:self-auto">
                        {milestone.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {milestone.summary}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Deliverables & Proof Points:
                      </p>
                      {milestone.subtasks?.map((st, sIdx) => (
                        <div key={sIdx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                          {st.done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-500 shrink-0" />
                          )}
                          <span className={st.done ? 'text-slate-400 line-through' : ''}>
                            {st.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => navigate('/roadmap')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all"
                  >
                    <span>View Full Career Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeParser;
