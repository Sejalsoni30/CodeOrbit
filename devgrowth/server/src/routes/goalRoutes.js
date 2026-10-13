const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, toggleGoal, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getGoals);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.patch('/:id/toggle', toggleGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
