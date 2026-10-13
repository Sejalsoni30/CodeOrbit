import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';
import { AuthModal, GoogleAuthenticatorModal } from '../auth';

export const PageWrapper = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 w-full">
          {children}
        </main>
        <Footer />
        <AuthModal />
        <GoogleAuthenticatorModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-5 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />

      {/* Global Auth & 2FA Modals */}
      <AuthModal />
      <GoogleAuthenticatorModal />
    </div>
  );
};

export default PageWrapper;
