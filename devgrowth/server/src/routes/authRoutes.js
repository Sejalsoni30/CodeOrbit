const express = require('express');
const router = express.Router();
const { syncUser, getProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/sync', syncUser);
router.get('/profile', protect, getProfile);
router.post('/logout', logout);

module.exports = router;
