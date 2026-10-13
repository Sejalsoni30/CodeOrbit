const { db } = require('../config/firestore');

const getUserProfile = async (req, res, next) => {
  try {
    const uid = req.params.id;
    const snap = await db.collection('users').doc(uid).get();

    if (!snap.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(snap.data());
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const uid = req.user?.uid || 'dev-demo-123';
    const userRef = db.collection('users').doc(uid);
    const snap = await userRef.get();

    let updatedData;
    if (snap.exists) {
      updatedData = await userRef.set(req.body, { merge: true });
    } else {
      updatedData = await userRef.set({
        uid,
        firebaseUid: uid,
        ...req.body,
      });
    }

    res.json(updatedData);
  } catch (err) {
    next(err);
  }
};

const updateTargetRole = async (req, res, next) => {
  try {
    const uid = req.user?.uid || 'dev-demo-123';
    const { targetRole } = req.body;

    const userRef = db.collection('users').doc(uid);
    const updated = await userRef.set({ targetRole }, { merge: true });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserProfile, updateUserProfile, updateTargetRole };
