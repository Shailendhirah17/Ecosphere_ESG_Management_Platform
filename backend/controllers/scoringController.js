const scoringService = require('../services/scoringService');
const { successResponse, errorResponse } = require('../utils/responseUtils');

class ScoringController {
  // Phase 7: Calculate score
  async calculateScore(req, res) {
    try {
      const { department_id } = req.params;

      const result = await scoringService.calculateOverallScore(department_id);

      return successResponse(res, 200, 'Score calculated successfully', result);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 7: Get score history
  async getScoreHistory(req, res) {
    try {
      const { department_id } = req.params;
      const { limit = 30 } = req.query;

      const history = await scoringService.getDepartmentScoreHistory(department_id, limit);

      return successResponse(res, 200, 'Score history fetched successfully', history);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 7: Recalculate all scores
  async recalculateAll(req, res) {
    try {
      const results = await scoringService.recalculateAllScores();

      return successResponse(res, 200, 'All scores recalculated successfully', results);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 7: Get score trends
  async getScoreTrends(req, res) {
    try {
      const { department_id } = req.params;
      const { days = 30 } = req.query;

      const trends = await scoringService.getScoreTrends(department_id, days);

      return successResponse(res, 200, 'Score trends fetched successfully', trends);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 7: Get benchmarks
  async getBenchmarks(req, res) {
    try {
      const benchmarks = await scoringService.getScoreBenchmarks();

      return successResponse(res, 200, 'Score benchmarks fetched successfully', benchmarks);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new ScoringController();
