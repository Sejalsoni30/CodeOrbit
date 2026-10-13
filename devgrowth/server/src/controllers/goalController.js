const { db } = require('../config/firestore');

const getGoals = async (req, res, next) => {
  try {
    const userId = req.user?.uid || 'dev-demo-123';
    const snapshot = await db.collection('goals').where('userId', '==', userId).get();

    const goals = [];
    snapshot.forEach((doc) => {
      goals.push({ id: doc.id, ...doc.data() });
    });

    res.json(goals);
  } catch (err) {
    next(err);
  }
};

const createGoal = async (req, res, next) => {
  try {
    const userId = req.user?.uid || 'dev-demo-123';
    const goalData = {
      title: req.body.title,
      description: req.body.description || '',
      completed: Boolean(req.body.completed) || false,
      dueDate: req.body.dueDate || new Date().toISOString(),
      userId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('goals').add(goalData);
    res.status(201).json({ id: docRef.id, ...goalData });
  } catch (err) {
    next(err);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    const goalRef = db.collection('goals').doc(req.params.id);
    const snap = await goalRef.get();

    if (!snap.exists) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const updated = await goalRef.update(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const toggleGoal = async (req, res, next) => {
  try {
    const goalRef = db.collection('goals').doc(req.params.id);
    const snap = await goalRef.get();

    if (!snap.exists) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const currentData = snap.data();
    const updated = await goalRef.update({
      completed: !currentData.completed,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteGoal = async (req, res, next) => {
  try {
    const goalRef = db.collection('goals').doc(req.params.id);
    await goalRef.delete();
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGoals, createGoal, updateGoal, toggleGoal, deleteGoal };
