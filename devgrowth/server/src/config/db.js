// Replaced MongoDB with Firebase Firestore
const { db } = require('./firestore');

const connectDB = async () => {
  console.log('[Database] Powered by Firebase Firestore (Project: codeorbit-70b7c)');
  return db;
};

module.exports = connectDB;
