import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import PageWrapper from './components/layout/PageWrapper';
import Dashboard from './pages/Dashboard';
import SkillTracker from './pages/SkillTracker';
import DailyGoals from './pages/DailyGoals';
import Analytics from './pages/Analytics';
import Roadmap from './pages/Roadmap';
import Portfolio from './pages/Portfolio';
import AIAssistant from './pages/AIAssistant';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';

// Enforces that users must login/register before accessing protected app pages
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Redirects already-authenticated users straight to the dashboard
const PublicAuthRoute = ({ initialTab }) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return <AuthPage initialTab={initialTab} />;
};

// Root route: Shows beautiful Landing Page before login, and Dashboard once authenticated
const RootRoute = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Dashboard />;
  }
  return <LandingPage />;
};

function App() {
  return (
    <PageWrapper>
      <Routes>
        {/* Public portal pages explicitly accessible anytime */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<PublicAuthRoute initialTab="login" />} />
        <Route path="/register" element={<PublicAuthRoute initialTab="register" />} />

        {/* Root: Landing Page before login, Dashboard after login */}
        <Route path="/" element={<RootRoute />} />

        {/* Protected app routes accessible only after login */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute><SkillTracker /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><DailyGoals /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
}

export default App;
