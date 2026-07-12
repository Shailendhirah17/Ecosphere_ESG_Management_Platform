const socialService = require('../services/socialService');
const responseUtils = require('../utils/responseUtils');

class SocialController {
  async createCSRActivity(req, res) {
    try {
      const { title, category_id, department_id, date, description, points_awarded } = req.body;

      if (!title || !category_id || !department_id) {
        return responseUtils.error(res, 'Title, category ID, and department ID are required', 400);
      }

      const activity = await socialService.createCSRActivity({
        title,
        category_id,
        department_id,
        date,
        description,
        points_awarded
      });

      return responseUtils.success(res, activity, 'CSR activity created successfully', 201);
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getAllCSRActivities(req, res) {
    try {
      const filters = {
        department_id: req.query.department_id,
        category_id: req.query.category_id
      };

      const activities = await socialService.getAllCSRActivities(filters);
      return responseUtils.success(res, activities, 'CSR activities fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getCSRActivityById(req, res) {
    try {
      const { id } = req.params;
      const activity = await socialService.getCSRActivityById(id);
      return responseUtils.success(res, activity, 'CSR activity fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, error.message.includes('not found') ? 404 : 500);
    }
  }

  async joinCSRActivity(req, res) {
    try {
      const { employeeId, activityId, proofUrl } = req.body;

      if (!employeeId || !activityId) {
        return responseUtils.error(res, 'Employee ID and activity ID are required', 400);
      }

      const participation = await socialService.joinCSRActivity(employeeId, activityId, proofUrl);
      return responseUtils.success(res, participation, 'Joined CSR activity successfully', 201);
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 400);
    }
  }

  async approveParticipation(req, res) {
    try {
      const { participationId } = req.params;

      const participation = await socialService.approveParticipation(participationId);
      return responseUtils.success(res, participation, 'Participation approved successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async rejectParticipation(req, res) {
    try {
      const { participationId } = req.params;
      const { reason } = req.body;

      const participation = await socialService.rejectParticipation(participationId, reason);
      return responseUtils.success(res, participation, 'Participation rejected successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getEmployeeParticipations(req, res) {
    try {
      const { employeeId } = req.params;
      const participations = await socialService.getEmployeeParticipations(employeeId);
      return responseUtils.success(res, participations, 'Employee participations fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getCSRStatistics(req, res) {
    try {
      const { departmentId } = req.params;
      const statistics = await socialService.getCSRStatistics(departmentId);
      return responseUtils.success(res, statistics, 'CSR statistics fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }
}

module.exports = new SocialController();
