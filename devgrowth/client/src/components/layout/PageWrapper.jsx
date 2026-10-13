import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';
import { AuthModal, GoogleAuthenticatorModal } from '../auth';
import { LogIn, UserPlus } from 'lucide-react';

export const PageWrapper = ({ children }) => {
  const { currentUser, openAuthModal } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      {!currentUser && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2 mx-auto">
            <span>You are currently in Guest view mode.</span>
            <button
              onClick={() => openAuthModal('login')}
              className="underline font-bold hover:text-indigo-100 flex items-center space-x-1"
            >
              <LogIn className="w-3.5 h-3.5 inline mr-1" />
              <span>Sign In with Email / Google / Authenticator to sync your profile</span>
            </button>
          </div>
        </div>
      )}

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

