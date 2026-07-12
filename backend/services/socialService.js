const { CSRActivity, EmployeeParticipation, Employee, Category } = require('../models');

class SocialService {
  // Create CSR activity
  async createCSRActivity(data) {
    try {
      const activity = await CSRActivity.create({
        title: data.title,
        category_id: data.category_id,
        department_id: data.department_id,
        date: data.date || new Date(),
        description: data.description,
        points_awarded: data.points_awarded || 10
      });

      return activity;
    } catch (error) {
      throw new Error(`Failed to create CSR activity: ${error.message}`);
    }
  }

  // Get all CSR activities
  async getAllCSRActivities(filters = {}) {
    try {
      const where = {};
      if (filters.department_id) where.department_id = filters.department_id;
      if (filters.category_id) where.category_id = filters.category_id;

      const activities = await CSRActivity.findAll({
        where,
        include: [
          { model: Category, as: 'category' },
          { model: EmployeeParticipation, as: 'participations' }
        ],
        order: [['date', 'DESC']]
      });

      return activities;
    } catch (error) {
      throw new Error(`Failed to fetch CSR activities: ${error.message}`);
    }
  }

  // Get CSR activity by ID
  async getCSRActivityById(id) {
    try {
      const activity = await CSRActivity.findByPk(id, {
        include: [
          { model: Category, as: 'category' },
          { model: EmployeeParticipation, as: 'participations', 
            include: [{ model: Employee, as: 'employee', attributes: ['id', 'name', 'email'] }]
          }
        ]
      });

      if (!activity) {
        throw new Error('CSR activity not found');
      }

      return activity;
    } catch (error) {
      throw new Error(`Failed to fetch CSR activity: ${error.message}`);
    }
  }

  // Employee joins CSR activity
  async joinCSRActivity(employeeId, activityId, proofUrl) {
    try {
      const activity = await CSRActivity.findByPk(activityId);
      if (!activity) {
        throw new Error('CSR activity not found');
      }

      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Check if already participated
      const existingParticipation = await EmployeeParticipation.findOne({
        where: { employee_id: employeeId, activity_id: activityId }
      });

      if (existingParticipation) {
        throw new Error('Employee already participated in this activity');
      }

      const participation = await EmployeeParticipation.create({
        employee_id: employeeId,
        activity_id: activityId,
        proof_url: proofUrl,
        approval_status: 'Pending',
        points_earned: 0,
        completion_date: new Date()
      });

      return participation;
    } catch (error) {
      throw new Error(`Failed to join CSR activity: ${error.message}`);
    }
  }

  // Approve employee participation
  async approveParticipation(participationId) {
    try {
      const participation = await EmployeeParticipation.findByPk(participationId);
      if (!participation) {
        throw new Error('Participation not found');
      }

      const activity = await CSRActivity.findByPk(participation.activity_id);
      const pointsEarned = activity.points_awarded || 10;

      participation.approval_status = 'Approved';
      participation.points_earned = pointsEarned;
      await participation.save();

      // Award points to employee
      const employee = await Employee.findByPk(participation.employee_id);
      employee.points_balance = (employee.points_balance || 0) + pointsEarned;
      await employee.save();

      return participation;
    } catch (error) {
      throw new Error(`Failed to approve participation: ${error.message}`);
    }
  }

  // Reject employee participation
  async rejectParticipation(participationId, reason) {
    try {
      const participation = await EmployeeParticipation.findByPk(participationId);
      if (!participation) {
        throw new Error('Participation not found');
      }

      participation.approval_status = 'Rejected';
      participation.rejection_reason = reason;
      await participation.save();

      return participation;
    } catch (error) {
      throw new Error(`Failed to reject participation: ${error.message}`);
    }
  }

  // Get employee participations
  async getEmployeeParticipations(employeeId) {
    try {
      const participations = await EmployeeParticipation.findAll({
        where: { employee_id: employeeId },
        include: [
          { model: CSRActivity, as: 'activity', 
            include: [{ model: Category, as: 'category' }]
          }
        ],
        order: [['completion_date', 'DESC']]
      });

      return participations;
    } catch (error) {
      throw new Error(`Failed to fetch employee participations: ${error.message}`);
    }
  }

  // Get CSR statistics
  async getCSRStatistics(departmentId) {
    try {
      const activities = await CSRActivity.count({
        where: { department_id: departmentId }
      });

      const participations = await EmployeeParticipation.findAll({
        include: [{
          model: CSRActivity,
          as: 'activity',
          where: { department_id: departmentId },
          attributes: []
        }],
        raw: true
      });

      const approvedParticipations = participations.filter(p => p.approval_status === 'Approved').length;
      const totalPointsAwarded = participations
        .filter(p => p.approval_status === 'Approved')
        .reduce((sum, p) => sum + (p.points_earned || 0), 0);

      return {
        departmentId,
        totalActivities: activities,
        totalParticipations: participations.length,
        approvedParticipations,
        totalPointsAwarded
      };
    } catch (error) {
      throw new Error(`Failed to get CSR statistics: ${error.message}`);
    }
  }

  // Calculate social score
  async calculateSocialScore(departmentId) {
    try {
      const stats = await this.getCSRStatistics(departmentId);
      
      let score = 50 + (stats.approvedParticipations * 2) + (stats.totalActivities * 5);
      if (score < 0) score = 0;
      if (score > 100) score = 100;

      return { score: Math.round(score * 100) / 100, details: stats };
    } catch (error) {
      throw new Error(`Failed to calculate social score: ${error.message}`);
    }
  }
}

module.exports = new SocialService();
