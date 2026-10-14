import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BackgroundMesh from '../common/BackgroundMesh';
import { useAuth } from '../../hooks/useAuth';
import MobileBottomNav from './MobileBottomNav';
import { AuthModal, GoogleAuthenticatorModal } from '../auth';

export const PageWrapper = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const isLandingRoute = location.pathname === '/landing' || (location.pathname === '/' && !currentUser);
  const isTermsRoute = location.pathname === '/terms';

  if (isTermsRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-x-hidden">
        <BackgroundMesh />
        <Navbar />
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>
        <Footer />
        <AuthModal />
        <GoogleAuthenticatorModal />
      </div>
    );
  }

  if (isLandingRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-x-hidden">
        <BackgroundMesh />
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>
        <AuthModal />
        <GoogleAuthenticatorModal />
      </div>
    );
  }

  if (isAuthRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-x-hidden">
        <BackgroundMesh />
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-3 sm:p-6 w-full relative z-10">
          {children}
        </main>
        <Footer />
        <AuthModal />
        <GoogleAuthenticatorModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-x-hidden">
      <BackgroundMesh />
      <Navbar />

      <div className="flex flex-1 relative z-10 w-full min-w-0">
        <Sidebar />
        <main className="flex-1 min-w-0 p-3 sm:p-5 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      <Footer />

      {/* Floating/Docked Mobile Bottom Navigation for logged-in users */}
      {currentUser && (
        <MobileBottomNav
          onOpenMore={() => {
            window.dispatchEvent(new CustomEvent('toggle-mobile-menu'));
          }}
        />
      )}

      {/* Global Auth & 2FA Modals */}
      <AuthModal />
      <GoogleAuthenticatorModal />
    </div>
  );
};

export default PageWrapper;
