const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, updateTargetRole } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.patch('/target-role', protect, updateTargetRole);

module.exports = router;
