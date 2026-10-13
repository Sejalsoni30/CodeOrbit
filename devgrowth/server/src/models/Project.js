// Firestore Project Schema Definition
const { db } = require('../config/firestore');

const ProjectsCollection = db.collection('projects');

module.exports = ProjectsCollection;
