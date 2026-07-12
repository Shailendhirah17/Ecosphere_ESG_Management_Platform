const { Department, Employee, DepartmentScore, CarbonTransaction, CSRActivity, Challenge, Badge } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const sequelize = require('../config/sequelize');

class DashboardController {
  // Phase 10: Get organization dashboard
  async getOrgDashboard(req, res) {
    try {
      // Get summary statistics
      const [
        departmentCount,
        employeeCount,
        activeActivities,
        activeChallenges,
        badges
      ] = await Promise.all([
        Department.count(),
        Employee.count(),
        CSRActivity.count({ where: { status: 'active' } }),
        Challenge.count({ where: { status: 'active' } }),
        Badge.count()
      ]);

      // Get latest scores
      const latestScores = await sequelize.query(`
        SELECT department_id, overall_score, environmental_score, social_score, governance_score
        FROM department_scores
        WHERE (department_id, calculated_at) IN (
          SELECT department_id, MAX(calculated_at)
          FROM department_scores
          GROUP BY department_id
        )
      `);

      const avgScore = latestScores[0].length > 0
        ? latestScores[0].reduce((sum, s) => sum + s.overall_score, 0) / latestScores[0].length
        : 0;

      return successResponse(res, 200, 'Organization dashboard fetched successfully', {
        summary: {
          departments: departmentCount,
          employees: employeeCount,
          active_activities: activeActivities,
          active_challenges: activeChallenges,
          badges_available: badges
        },
        scores: {
          average_org_score: Math.round(avgScore * 100) / 100,
          total_departments: departmentCount,
          department_scores: latestScores[0]
        },
        generated_at: new Date()
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get department dashboard
  async getDepartmentDashboard(req, res) {
    try {
      const { department_id } = req.params;

      const department = await Department.findByPk(department_id, {
        include: [
          { model: Employee, as: 'employees' },
          { model: DepartmentScore, as: 'scores' }
        ]
      });

      if (!department) {
        return errorResponse(res, 404, 'Department not found');
      }

      const [
        carbonTransactions,
        csrActivities,
        challenges
      ] = await Promise.all([
        CarbonTransaction.count({ where: { department_id } }),
        CSRActivity.count({ where: { department_id, status: 'active' } }),
        Challenge.count({ where: { department_id, status: 'active' } })
      ]);

      const latestScore = department.scores[department.scores.length - 1];

      return successResponse(res, 200, 'Department dashboard fetched successfully', {
        department: {
          id: department.id,
          name: department.name,
          code: department.code,
          employee_count: department.employees.length
        },
        metrics: {
          carbon_transactions: carbonTransactions,
          csr_activities: csrActivities,
          active_challenges: challenges
        },
        scores: latestScore ? {
          environmental: latestScore.environmental_score,
          social: latestScore.social_score,
          governance: latestScore.governance_score,
          overall: latestScore.overall_score,
          calculated_at: latestScore.calculated_at
        } : null,
        generated_at: new Date()
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get admin panel data
  async getAdminPanel(req, res) {
    try {
      // Get all departments with latest scores
      const departments = await Department.findAll({
        include: [
          { model: DepartmentScore, as: 'scores', limit: 1, order: [['calculated_at', 'DESC']] },
          { model: Employee, as: 'employees', attributes: ['id', 'name', 'email', 'role'] }
        ]
      });

      // Recent activities
      const recentActivities = await sequelize.query(`
        SELECT 'CSR' as type, name as title, created_at
        FROM csr_activities
        ORDER BY created_at DESC
        LIMIT 5
        UNION ALL
        SELECT 'Challenge' as type, name as title, created_at
        FROM challenges
        ORDER BY created_at DESC
        LIMIT 5
      `);

      // System statistics
      const stats = {
        total_departments: await Department.count(),
        total_employees: await Employee.count(),
        total_badges: await Badge.count(),
        total_transactions: await CarbonTransaction.count(),
        recent_activities: recentActivities[0]
      };

      return successResponse(res, 200, 'Admin panel fetched successfully', {
        departments,
        statistics: stats,
        generated_at: new Date()
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get leaderboard
  async getLeaderboard(req, res) {
    try {
      const { limit = 20, metric = 'overall_score' } = req.query;

      const leaderboard = await sequelize.query(`
        SELECT 
          d.id,
          d.name,
          d.code,
          ds.${metric} as score,
          ds.environmental_score,
          ds.social_score,
          ds.governance_score,
          COUNT(DISTINCT e.id) as employee_count
        FROM departments d
        LEFT JOIN department_scores ds ON d.id = ds.department_id
        LEFT JOIN employees e ON d.id = e.department_id
        WHERE (d.id, ds.calculated_at) IN (
          SELECT department_id, MAX(calculated_at)
          FROM department_scores
          GROUP BY department_id
        )
        GROUP BY d.id
        ORDER BY ds.${metric} DESC
        LIMIT ${Math.min(parseInt(limit), 100)}
      `);

      return successResponse(res, 200, 'Leaderboard fetched successfully', {
        metric,
        leaderboard: leaderboard[0].map((item, index) => ({
          rank: index + 1,
          ...item
        }))
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get employee dashboard
  async getEmployeeDashboard(req, res) {
    try {
      const { employee_id } = req.params;

      const employee = await Employee.findByPk(employee_id, {
        include: [
          { model: Department, as: 'department' }
        ]
      });

      if (!employee) {
        return errorResponse(res, 404, 'Employee not found');
      }

      const [
        participations,
        badges,
        redemptions
      ] = await Promise.all([
        employee.countParticipations(),
        employee.countBadges ? employee.countBadges() : 0,
        employee.countRedemptions ? employee.countRedemptions() : 0
      ]);

      return successResponse(res, 200, 'Employee dashboard fetched successfully', {
        employee: {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          department: employee.department
        },
        engagement: {
          participations,
          badges,
          redemptions
        },
        generated_at: new Date()
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get analytics
  async getAnalytics(req, res) {
    try {
      const { department_id, start_date, end_date } = req.query;

      const where = {};
      if (department_id) where.department_id = department_id;
      if (start_date || end_date) {
        where.created_at = {};
        if (start_date) where.created_at[sequelize.Op.gte] = new Date(start_date);
        if (end_date) where.created_at[sequelize.Op.lte] = new Date(end_date);
      }

      const analytics = {
        csr_by_month: await sequelize.query(`
          SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count
          FROM csr_activities
          GROUP BY month
          ORDER BY month DESC
          LIMIT 12
        `),
        emissions_trend: await sequelize.query(`
          SELECT DATE(date) as date, SUM(co2_equivalent) as total
          FROM carbon_transactions
          GROUP BY DATE(date)
          ORDER BY date DESC
          LIMIT 30
        `)
      };

      return successResponse(res, 200, 'Analytics fetched successfully', analytics);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new DashboardController();
