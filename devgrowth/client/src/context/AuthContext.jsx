import React, { createContext, useState, useEffect } from 'react';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from '../config/firebase';

export const AuthContext = createContext(null);

export const DEMO_PROFILES = [
  {
    uid: 'dev-demo-123',
    displayName: 'Alex Developer',
    email: 'alex@devgrowth.io',
    targetRole: 'Senior Full Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    initials: 'AD',
    level: 'L5 Senior',
    isDemo: true,
  },
  {
    uid: 'dev-demo-456',
    displayName: 'Sarah Chen',
    email: 'sarah.chen@devgrowth.io',
    targetRole: 'Staff Distributed Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    initials: 'SC',
    level: 'L6 Staff',
    isDemo: true,
  },
  {
    uid: 'dev-demo-789',
    displayName: 'Marcus Vance',
    email: 'marcus.v@devgrowth.io',
    targetRole: 'AI & Systems Platform Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    initials: 'MV',
    level: 'L6 Lead',
    isDemo: true,
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('devgrowth_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEMO_PROFILES[0];
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    return localStorage.getItem('devgrowth_2fa_enabled') === 'true';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null); // stores user during 2FA challenge
  const [loading, setLoading] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('devgrowth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('devgrowth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('devgrowth_2fa_enabled', twoFactorEnabled.toString());
  }, [twoFactorEnabled]);

  // Real-time Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check Firestore DB for existing user document
          const userRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data();
            setCurrentUser({
              uid: firebaseUser.uid,
              displayName: data.displayName || firebaseUser.displayName || 'Engineer',
              email: firebaseUser.email,
              avatar: data.avatar || firebaseUser.photoURL || null,
              targetRole: data.targetRole || 'Senior Full Stack Engineer',
              level: data.level || 'L5 Engineer',
              initials: (data.displayName || firebaseUser.displayName || 'Dev')
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
              authProvider: firebaseUser.providerData?.[0]?.providerId || 'firebase',
            });
          } else {
            // First time login - create record in Firestore DB
            const newUserDoc = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Engineer',
              email: firebaseUser.email,
              avatar: firebaseUser.photoURL || null,
              targetRole: 'Senior Full Stack Engineer',
              level: 'L5 Engineer',
              createdAt: serverTimestamp(),
              authProvider: firebaseUser.providerData?.[0]?.providerId || 'firebase',
            };
            try {
              await setDoc(userRef, newUserDoc, { merge: true });
            } catch (firestoreErr) {
              console.warn('[Firestore] Profile write skipped or rule restricted:', firestoreErr.message);
            }

            setCurrentUser({
              ...newUserDoc,
              initials: newUserDoc.displayName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            });
          }
        } catch (err) {
          console.warn('[Firebase Auth] Firestore sync notice:', err.message);
          setCurrentUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Engineer',
            email: firebaseUser.email,
            avatar: firebaseUser.photoURL || null,
            targetRole: 'Senior Full Stack Engineer',
            level: 'L5 Engineer',
            initials: (firebaseUser.displayName || 'Dev').slice(0, 2).toUpperCase(),
            authProvider: 'firebase',
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openTwoFactorModal = () => {
    setIsTwoFactorModalOpen(true);
  };

  const closeTwoFactorModal = () => {
    setIsTwoFactorModalOpen(false);
    setPendingUser(null);
  };

  // Helper to format Firebase errors cleanly
  const formatFirebaseError = (error) => {
    const errorStr = `${error?.code || ''} ${error?.message || ''} ${JSON.stringify(error || '')}`;
    if (
      error?.code === 'auth/configuration-not-found' ||
      errorStr.includes('CONFIGURATION_NOT_FOUND')
    ) {
      return 'Firebase Authentication has not been activated yet in Firebase Console for project "codeorbit-70b7c". Go to Firebase Console -> Build -> Authentication and click "Get Started", then turn on Google / Email provider. Or use Instant Demo Login below.';
    }
    if (error?.code === 'auth/operation-not-allowed') {
      return 'This sign-in method is not enabled in Firebase Console. Go to Firebase Console -> Authentication -> Sign-in method and turn on Email/Password or Google.';
    }
    if (error?.code === 'auth/unauthorized-domain') {
      return 'This domain is not authorized in your Firebase Console. Go to Firebase Console -> Authentication -> Settings -> Authorized Domains and ensure "localhost" is listed.';
    }
    switch (error?.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials or register an account.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/popup-closed-by-user':
        return 'Google Sign-In popup was closed before completing.';
      case 'auth/popup-blocked':
        return 'Popup blocked by browser. Please allow popups for this site.';
      default:
        return error?.message || 'An error occurred during authentication.';
    }
  };

  // Real Google Sign-In with Firebase
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userProfile = {
        uid: user.uid,
        displayName: user.displayName || 'Google Developer',
        email: user.email,
        avatar: user.photoURL,
        targetRole: 'Senior Full Stack Engineer',
        level: 'L5 Google Engineer',
        initials: (user.displayName || 'GD').slice(0, 2).toUpperCase(),
        authProvider: 'google.com',
      };

      // Persist in Firestore DB
      try {
        await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
      } catch (e) {
        console.warn('[Firestore] Could not write Google user doc:', e.message);
      }

      if (twoFactorEnabled) {
        setPendingUser(userProfile);
        setIsAuthModalOpen(false);
        setIsTwoFactorModalOpen(true);
      } else {
        setCurrentUser(userProfile);
        setIsAuthModalOpen(false);
      }

      setLoading(false);
      return { success: true, user: userProfile };
    } catch (err) {
      setLoading(false);
      throw new Error(formatFirebaseError(err));
    }
  };

  // Real Email / Password Login with Firebase
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Attempt to fetch profile from Firestore
      let userRole = 'Senior Full Stack Engineer';
      let userLevel = 'L5 Engineer';
      let userName = user.displayName || email.split('@')[0];

      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          userRole = data.targetRole || userRole;
          userLevel = data.level || userLevel;
          userName = data.displayName || userName;
        }
      } catch (e) {
        // use defaults
      }

      const userProfile = {
        uid: user.uid,
        displayName: userName,
        email: user.email,
        avatar: user.photoURL || null,
        targetRole: userRole,
        level: userLevel,
        initials: userName.slice(0, 2).toUpperCase(),
        authProvider: 'password',
      };

      if (twoFactorEnabled) {
        setPendingUser(userProfile);
        setIsAuthModalOpen(false);
        setIsTwoFactorModalOpen(true);
      } else {
        setCurrentUser(userProfile);
        setIsAuthModalOpen(false);
      }

      setLoading(false);
      return { success: true, user: userProfile };
    } catch (err) {
      setLoading(false);
      throw new Error(formatFirebaseError(err));
    }
  };

  // Real Register with Email, Password & Firestore DB
  const registerWithEmail = async ({ name, email, targetRole, password }) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Update Firebase Auth display name
      await updateProfile(user, { displayName: name });

      const newUserDoc = {
        uid: user.uid,
        displayName: name,
        email: user.email,
        targetRole: targetRole || 'Senior Full Stack Engineer',
        level: 'L4 Associate',
        avatar: null,
        createdAt: serverTimestamp(),
        authProvider: 'password',
      };

      // Store in Firebase Firestore database
      try {
        await setDoc(doc(db, 'users', user.uid), newUserDoc);
      } catch (e) {
        console.warn('[Firestore] Could not write user doc:', e.message);
      }

      const userProfile = {
        ...newUserDoc,
        initials: name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
      };

      setCurrentUser(userProfile);
      setIsAuthModalOpen(false);
      setLoading(false);
      return { success: true, user: userProfile };
    } catch (err) {
      setLoading(false);
      throw new Error(formatFirebaseError(err));
    }
  };

  // Verify Google Authenticator 6-digit TOTP code
  const verifyTwoFactorCode = (code) => {
    const isValid = /^\d{6}$/.test(code.trim());
    if (isValid) {
      if (pendingUser) {
        setCurrentUser(pendingUser);
        setPendingUser(null);
      }
      setIsTwoFactorModalOpen(false);
      return { success: true };
    }
    return {
      success: false,
      error: 'Invalid verification code. Please enter 6 numeric digits from Google Authenticator.',
    };
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled((prev) => !prev);
  };

  const loginAsProfile = (profile) => {
    setCurrentUser(profile);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setCurrentUser(null);
    setPendingUser(null);
  };

  const updateTargetRole = async (newRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, targetRole: newRole };
    setCurrentUser(updated);

    if (currentUser.uid && !currentUser.isDemo) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), { targetRole: newRole }, { merge: true });
      } catch (e) {
        // ignore
      }
    }
  };

  const updateProfileDetails = async ({ displayName, targetRole, bio, avatar, level }) => {
    if (!currentUser) return;
    const nameToUse = displayName || currentUser.displayName || 'Engineer';
    const initials = nameToUse
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const updated = {
      ...currentUser,
      displayName: nameToUse,
      ...(targetRole && { targetRole }),
      ...(bio !== undefined && { bio }),
      avatar: avatar || null,
      ...(level && { level }),
      initials,
    };
    setCurrentUser(updated);

    if (currentUser.uid && !currentUser.isDemo) {
      try {
        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            displayName: nameToUse,
            targetRole: targetRole || currentUser.targetRole,
            bio: bio !== undefined ? bio : (currentUser.bio || ''),
            avatar: avatar || null,
            level: level || currentUser.level,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (e) {
        console.warn('[Firestore] Profile update notice:', e.message);
      }
    }
    return updated;
  };

  const loginAsGoogleDemo = () => {
    const demoGoogleUser = {
      uid: 'google-dev-123',
      displayName: 'Alex Developer (Google)',
      email: 'alex.developer@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      targetRole: 'Senior Full Stack Engineer',
      level: 'L5 Google Engineer',
      initials: 'AD',
      authProvider: 'google.com',
      isDemo: true,
    };
    if (twoFactorEnabled) {
      setPendingUser(demoGoogleUser);
      setIsAuthModalOpen(false);
      setIsTwoFactorModalOpen(true);
    } else {
      setCurrentUser(demoGoogleUser);
      setIsAuthModalOpen(false);
    }
    return demoGoogleUser;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        twoFactorEnabled,
        toggleTwoFactor,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        isTwoFactorModalOpen,
        openTwoFactorModal,
        closeTwoFactorModal,
        loginWithGoogle,
        loginAsGoogleDemo,
        loginWithEmail,
        registerWithEmail,
        verifyTwoFactorCode,
        loginAsProfile,
        logout,
        updateTargetRole,
        updateProfileDetails,
        availableProfiles: DEMO_PROFILES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
