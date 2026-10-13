// Firestore Goal Schema Definition
const { db } = require('../config/firestore');

const GoalsCollection = db.collection('goals');

module.exports = GoalsCollection;
