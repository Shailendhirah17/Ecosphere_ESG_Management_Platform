const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const scoringController = require('../controllers/scoringController');

// Phase 7: Scoring endpoints
router.post('/:department_id/calculate', authenticate, scoringController.calculateScore);
router.get('/:department_id/history', authenticate, scoringController.getScoreHistory);
router.get('/:department_id/trends', authenticate, scoringController.getScoreTrends);
router.post('/recalculate/all', authenticate, scoringController.recalculateAll);
router.get('/benchmarks', authenticate, scoringController.getBenchmarks);

module.exports = router;
