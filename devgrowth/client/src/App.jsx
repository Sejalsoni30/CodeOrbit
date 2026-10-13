import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import Dashboard from './pages/Dashboard';
import SkillTracker from './pages/SkillTracker';
import DailyGoals from './pages/DailyGoals';
import Analytics from './pages/Analytics';
import Roadmap from './pages/Roadmap';
import Portfolio from './pages/Portfolio';
import AIAssistant from './pages/AIAssistant';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/skills" element={<SkillTracker />} />
        <Route path="/goals" element={<DailyGoals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/login" element={<AuthPage initialTab="login" />} />
        <Route path="/register" element={<AuthPage initialTab="register" />} />
      </Routes>
    </PageWrapper>
  );
}

export default App;
