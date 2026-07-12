const gamificationService = require('../services/gamificationService');
const responseUtils = require('../utils/responseUtils');

class GamificationController {
  async createChallenge(req, res) {
    try {
      const { title, category_id, description, xp, difficulty, evidence_required, deadline } = req.body;

      if (!title || !category_id) {
        return responseUtils.error(res, 'Title and category ID are required', 400);
      }

      const challenge = await gamificationService.createChallenge({
        title,
        category_id,
        description,
        xp,
        difficulty,
        evidence_required,
        deadline
      });

      return responseUtils.success(res, challenge, 'Challenge created successfully', 201);
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getAllChallenges(req, res) {
    try {
      const filters = {
        status: req.query.status,
        difficulty: req.query.difficulty,
        category_id: req.query.category_id
      };

      const challenges = await gamificationService.getAllChallenges(filters);
      return responseUtils.success(res, challenges, 'Challenges fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getChallengeById(req, res) {
    try {
      const { id } = req.params;
      const challenge = await gamificationService.getChallengeById(id);
      return responseUtils.success(res, challenge, 'Challenge fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, error.message.includes('not found') ? 404 : 500);
    }
  }

  async joinChallenge(req, res) {
    try {
      const { employeeId, challengeId } = req.body;

      if (!employeeId || !challengeId) {
        return responseUtils.error(res, 'Employee ID and challenge ID are required', 400);
      }

      const participation = await gamificationService.joinChallenge(employeeId, challengeId);
      return responseUtils.success(res, participation, 'Joined challenge successfully', 201);
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 400);
    }
  }

  async submitChallengeProof(req, res) {
    try {
      const { participationId, proofUrl } = req.body;

      if (!participationId || !proofUrl) {
        return responseUtils.error(res, 'Participation ID and proof URL are required', 400);
      }

      const participation = await gamificationService.submitChallengeProof(participationId, proofUrl);
      return responseUtils.success(res, participation, 'Challenge proof submitted successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async approveChallengeCompletion(req, res) {
    try {
      const { participationId } = req.params;

      const participation = await gamificationService.approveChallengeCompletion(participationId);
      return responseUtils.success(res, participation, 'Challenge completion approved successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async rejectChallengeCompletion(req, res) {
    try {
      const { participationId } = req.params;
      const { reason } = req.body;

      const participation = await gamificationService.rejectChallengeCompletion(participationId, reason);
      return responseUtils.success(res, participation, 'Challenge completion rejected successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getEmployeeChallenges(req, res) {
    try {
      const { employeeId } = req.params;
      const challenges = await gamificationService.getEmployeeChallenges(employeeId);
      return responseUtils.success(res, challenges, 'Employee challenges fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getActiveChallengesForEmployee(req, res) {
    try {
      const { employeeId } = req.params;
      const challenges = await gamificationService.getActiveChallengesForEmployee(employeeId);
      return responseUtils.success(res, challenges, 'Active challenges fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getChallengeLeaderboard(req, res) {
    try {
      const { challengeId } = req.params;
      const leaderboard = await gamificationService.getChallengeLeaderboard(challengeId);
      return responseUtils.success(res, leaderboard, 'Challenge leaderboard fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getGamificationStats(req, res) {
    try {
      const { employeeId } = req.params;
      const stats = await gamificationService.getGamificationStats(employeeId);
      return responseUtils.success(res, stats, 'Gamification stats fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }
}

module.exports = new GamificationController();
