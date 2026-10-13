const { db } = require('../config/firestore');

const syncUser = async (req, res, next) => {
  try {
    const { firebaseUid, email, displayName, avatarUrl, targetRole, bio } = req.body;
    const uid = firebaseUid || req.body.uid;

    if (!uid) {
      return res.status(400).json({ success: false, message: 'User UID is required' });
    }

    const userRef = db.collection('users').doc(uid);
    const snap = await userRef.get();

    let user;
    if (snap.exists) {
      user = snap.data();
    } else {
      const now = new Date().toISOString();
      user = {
        uid,
        firebaseUid: uid,
        email: email || '',
        displayName: displayName || (email ? email.split('@')[0] : 'Engineer'),
        avatarUrl: avatarUrl || null,
        targetRole: targetRole || 'Full Stack Engineer',
        bio: bio || '',
        currentStreak: 1,
        createdAt: now,
        updatedAt: now,
      };
      await userRef.set(user);
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const uid = req.user?.uid || 'dev-demo-123';
    const snap = await db.collection('users').doc(uid).get();

    if (!snap.exists) {
      return res.status(404).json({ success: false, message: 'User profile not found in Firestore' });
    }

    res.status(200).json({ success: true, user: snap.data() });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = { syncUser, getProfile, logout };
