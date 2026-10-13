// Firestore User Schema Definition
const { db } = require('../config/firestore');

const UsersCollection = db.collection('users');

module.exports = UsersCollection;
