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

// Enforces that users must login/register before accessing the website
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

function App() {
  return (
    <PageWrapper>
      <Routes>
        {/* Auth routes shown first to unauthenticated visitors */}
        <Route path="/login" element={<PublicAuthRoute initialTab="login" />} />
        <Route path="/register" element={<PublicAuthRoute initialTab="register" />} />

        {/* Protected app routes accessible only after login */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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
