const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Challenges
router.post('/challenges', authenticate, authorize(['Department Head', 'ESG Admin']), gamificationController.createChallenge);
router.get('/challenges', authenticate, gamificationController.getAllChallenges);
router.get('/challenges/:id', authenticate, gamificationController.getChallengeById);

// Employee challenge participation
router.post('/join', authenticate, gamificationController.joinChallenge);
router.post('/submit-proof', authenticate, gamificationController.submitChallengeProof);
router.post('/participations/:participationId/approve', authenticate, authorize(['Department Head', 'ESG Admin']), gamificationController.approveChallengeCompletion);
router.post('/participations/:participationId/reject', authenticate, authorize(['Department Head', 'ESG Admin']), gamificationController.rejectChallengeCompletion);

// Get employee challenges
router.get('/employees/:employeeId/challenges', authenticate, gamificationController.getEmployeeChallenges);
router.get('/employees/:employeeId/active-challenges', authenticate, gamificationController.getActiveChallengesForEmployee);

// Challenge leaderboard
router.get('/challenges/:challengeId/leaderboard', authenticate, gamificationController.getChallengeLeaderboard);

// Gamification stats
router.get('/employees/:employeeId/stats', authenticate, gamificationController.getGamificationStats);

module.exports = router;
