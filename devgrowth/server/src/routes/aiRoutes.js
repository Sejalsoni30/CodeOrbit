const express = require('express');
const router = express.Router();
const { getCareerAdvice, generateRoadmap } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/advice', getCareerAdvice);
router.post('/roadmap', generateRoadmap);

module.exports = router;
