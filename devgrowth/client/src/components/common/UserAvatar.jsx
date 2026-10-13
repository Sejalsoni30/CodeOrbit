import React, { useState } from 'react';

const GRADIENTS = [
  'from-indigo-600 via-purple-600 to-pink-600',
  'from-violet-600 via-indigo-500 to-cyan-500',
  'from-emerald-600 via-teal-500 to-cyan-600',
  'from-blue-600 via-indigo-600 to-violet-600',
  'from-rose-600 via-pink-500 to-purple-600',
  'from-amber-600 via-orange-500 to-rose-600',
];

export const getInitials = (name = '') => {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getGradientForName = (name = '') => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
};

export const formatProfessionalRole = (role = '') => {
  if (!role) return 'Full Stack Engineer';
  const trimmed = role.trim();
  if (trimmed === 'Senior Full Stack Engineer') return 'Senior Full Stack';
  if (trimmed === 'Staff Distributed Systems Architect') return 'Staff Architect';
  if (trimmed === 'Frontend Platform Architect') return 'Frontend Architect';
  if (trimmed === 'DevOps & Cloud SRE Lead') return 'DevOps & SRE';
  if (trimmed === 'AI & Machine Learning Engineer') return 'AI / ML Engineer';
  if (trimmed.length > 20) {
    return trimmed.replace('Engineer', 'Eng.').replace('Architect', 'Arch.');
  }
  return trimmed;
};

export const UserAvatar = ({
  user,
  size = 'md',
  showStatus = true,
  statusColor = 'bg-emerald-500',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const name = user?.displayName || user?.email?.split('@')[0] || 'User';
  const initials = user?.initials || getInitials(name);
  const avatarUrl = user?.avatar || user?.avatarUrl;
  const gradient = getGradientForName(name);

  const isValidUrl =
    avatarUrl &&
    typeof avatarUrl === 'string' &&
    avatarUrl.trim().length > 0 &&
    avatarUrl !== 'null' &&
    avatarUrl !== 'undefined' &&
    (avatarUrl.startsWith('http://') ||
      avatarUrl.startsWith('https://') ||
      avatarUrl.startsWith('data:image/'));

  // Sizing tokens
  const sizeMap = {
    xs: {
      container: 'w-6 h-6 rounded-md text-[10px]',
      dot: 'w-1.5 h-1.5 -bottom-0.5 -right-0.5',
    },
    sm: {
      container: 'w-8 h-8 rounded-xl text-xs',
      dot: 'w-2 h-2 -bottom-0.5 -right-0.5',
    },
    md: {
      container: 'w-10 h-10 rounded-xl text-sm',
      dot: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
    },
    lg: {
      container: 'w-12 h-12 rounded-2xl text-base',
      dot: 'w-3 h-3 -bottom-0.5 -right-0.5',
    },
    xl: {
      container: 'w-16 h-16 rounded-2xl text-xl',
      dot: 'w-3.5 h-3.5 -bottom-1 -right-1',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative shrink-0 inline-flex items-center justify-center select-none ${className}`}>
      {isValidUrl && !imgError ? (
        <img
          src={avatarUrl}
          alt={name}
          onError={() => setImgError(true)}
          className={`${currentSize.container} object-cover ring-2 ring-indigo-500/25 shadow-sm transition-all`}
        />
      ) : (
        <div
          className={`${currentSize.container} bg-gradient-to-tr ${gradient} text-white font-extrabold flex items-center justify-center tracking-wider shadow-sm ring-2 ring-white/10 dark:ring-slate-800/80`}
        >
          {initials}
        </div>
      )}

      {showStatus && (
        <span
          className={`absolute ${currentSize.dot} rounded-full ${statusColor} ring-2 ring-white dark:ring-slate-900 shadow-sm`}
          title="Online & Synced"
        />
      )}
    </div>
  );
};

export default UserAvatar;
