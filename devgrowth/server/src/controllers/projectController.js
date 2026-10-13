const { db } = require('../config/firestore');

const getProjects = async (req, res, next) => {
  try {
    const userId = req.user?.uid || 'dev-demo-123';
    const snapshot = await db.collection('projects').where('userId', '==', userId).get();

    const projects = [];
    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const userId = req.user?.uid || 'dev-demo-123';
    const projectData = {
      title: req.body.title,
      description: req.body.description || '',
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      repoUrl: req.body.repoUrl || '',
      liveUrl: req.body.liveUrl || '',
      stars: Number(req.body.stars) || 0,
      userId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('projects').add(projectData);
    res.status(201).json({ id: docRef.id, ...projectData });
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const projectRef = db.collection('projects').doc(req.params.id);
    const snap = await projectRef.get();

    if (!snap.exists) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updated = await projectRef.update(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const projectRef = db.collection('projects').doc(req.params.id);
    await projectRef.delete();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
