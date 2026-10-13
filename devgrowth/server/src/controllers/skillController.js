const { db } = require('../config/firestore');

const getSkills = async (req, res, next) => {
  try {
    const userId = req.user?.uid || 'dev-demo-123';
    const snapshot = await db.collection('skills').where('userId', '==', userId).get();

    const skills = [];
    snapshot.forEach((doc) => {
      skills.push({ id: doc.id, ...doc.data() });
    });

    res.json(skills);
  } catch (err) {
    next(err);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const userId = req.user?.uid || 'dev-demo-123';
    const skillData = {
      name: req.body.name,
      category: req.body.category || 'Frontend',
      proficiency: Number(req.body.proficiency) || 50,
      verified: Boolean(req.body.verified),
      userId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('skills').add(skillData);
    res.status(201).json({ id: docRef.id, ...skillData });
  } catch (err) {
    next(err);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const skillRef = db.collection('skills').doc(req.params.id);
    const snap = await skillRef.get();

    if (!snap.exists) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const updated = await skillRef.update(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const skillRef = db.collection('skills').doc(req.params.id);
    await skillRef.delete();
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
