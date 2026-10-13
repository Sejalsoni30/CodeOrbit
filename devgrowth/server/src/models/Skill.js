// Firestore Skill Schema Definition
const { db } = require('../config/firestore');

const SkillsCollection = db.collection('skills');

module.exports = SkillsCollection;
