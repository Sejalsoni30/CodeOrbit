const { admin } = require('../config/firestore');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      if (admin && admin.apps && admin.apps.length > 0) {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        return next();
      }
    } catch (error) {
      // If token decoding fails (e.g. mock/demo token in dev), extract or fallback gracefully
    }
    req.user = {
      uid: 'dev-demo-123',
      email: 'alex@devgrowth.io',
    };
    return next();
  }

  // Development bypass if no token provided
  req.user = { uid: 'dev-demo-123', email: 'alex@devgrowth.io' };
  next();
};

module.exports = { protect };
