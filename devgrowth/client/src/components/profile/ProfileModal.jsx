import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserAvatar, { formatProfessionalRole } from '../common/UserAvatar';
import {
  X,
  User,
  Briefcase,
  Award,
  Sparkles,
  Check,
  Camera,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

const PRESET_AVATARS = [
  {
    id: 'initials',
    label: 'Gradient Initials',
    url: null,
  },
  {
    id: 'tech-1',
    label: 'Dev 1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'tech-2',
    label: 'Dev 2',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'tech-3',
    label: 'Dev 3',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'tech-4',
    label: 'Dev 4',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  },
];

export const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateProfileDetails } = useAuth();

  const [name, setName] = useState(currentUser?.displayName || '');
  const [role, setRole] = useState(currentUser?.targetRole || 'Senior Full Stack Engineer');
  const [level, setLevel] = useState(currentUser?.level || 'L5 Senior');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || '');
  const [bio, setBio] = useState(currentUser?.bio || 'Passionate software engineer building high-impact distributed systems and modern web applications.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setRole(currentUser.targetRole || 'Senior Full Stack Engineer');
      setLevel(currentUser.level || 'L5 Senior');
      setAvatarUrl(currentUser.avatar || '');
      setBio(currentUser.bio || 'Passionate software engineer building high-impact distributed systems and modern web applications.');
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !currentUser) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (updateProfileDetails) {
      await updateProfileDetails({
        displayName: name.trim() || currentUser.displayName,
        targetRole: role,
        level,
        avatar: avatarUrl?.trim() || null,
        bio: bio.trim(),
      });
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const previewUser = {
    ...currentUser,
    displayName: name || currentUser.displayName,
    targetRole: role,
    level,
    avatar: avatarUrl || null,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="glass-card max-w-xl w-full p-6 sm:p-8 border border-slate-200/90 dark:border-slate-700/80 shadow-2xl relative overflow-hidden my-auto">
        {/* Glow */}
        <div className="absolute -right-16 -top-16 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Engineer Profile Management
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Professional Profile
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Customize your title, avatar presentation, and engineering credentials.
          </p>
        </div>

        {/* Live Preview Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-500/20 mb-6 flex items-center space-x-4">
          <UserAvatar user={previewUser} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                {previewUser.displayName}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {previewUser.level}
              </span>
            </div>
            <p className="text-xs font-semibold text-indigo-400 truncate mt-0.5">
              {previewUser.targetRole}
            </p>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {currentUser.email}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Display Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sejal Soni"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Role & Level in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Engineering Role
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
                  <option value="Staff Distributed Systems Architect">Staff Distributed Systems Architect</option>
                  <option value="Frontend Platform Architect">Frontend Platform Architect</option>
                  <option value="DevOps & Cloud SRE Lead">DevOps & Cloud SRE Lead</option>
                  <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                  <option value="Principal Software Engineer">Principal Software Engineer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Seniority Level
              </label>
              <div className="relative">
                <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="L4 Associate">L4 Associate</option>
                  <option value="L5 Senior">L5 Senior</option>
                  <option value="L6 Staff">L6 Staff</option>
                  <option value="L7 Principal">L7 Principal</option>
                  <option value="Engineering Lead">Engineering Lead</option>
                </select>
              </div>
            </div>
          </div>

          {/* Avatar Choice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Avatar Style
            </label>
            <div className="flex flex-wrap gap-2.5">
              {PRESET_AVATARS.map((preset) => {
                const isSelected =
                  (!preset.url && (!avatarUrl || avatarUrl === '')) ||
                  avatarUrl === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setAvatarUrl(preset.url || '')}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {preset.url ? (
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-[9px] font-bold flex items-center justify-center text-white">
                        {previewUser.initials || 'SS'}
                      </div>
                    )}
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Avatar URL */}
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Or paste custom Image URL (optional)
            </label>
            <div className="relative">
              <Camera className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
