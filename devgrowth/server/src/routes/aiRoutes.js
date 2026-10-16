const express = require('express');
const router = express.Router();
const multer = require('multer');

// Memory storage for fast, safe resume buffer processing without disk garbage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const {
  getCareerAdvice,
  generateRoadmap,
  parseResume,
  populateRoadmap,
  populateSkills,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/advice', getCareerAdvice);
router.post('/roadmap', generateRoadmap);
router.post('/parse-resume', upload.single('file'), parseResume);
router.post('/populate-roadmap', populateRoadmap);
router.post('/populate-skills', populateSkills);

module.exports = router;
