const { Employee, Department, Setting, Badge, Reward, sequelize } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');

class AdminController {
  // Phase 10: Update system settings
  async updateSystemSettings(req, res) {
    try {
      const {
        env_weight,
        social_weight,
        gov_weight,
        auto_emission_calc,
        evidence_requirement,
        badge_auto_award,
        notification_enabled
      } = req.body;

      // Validate weights
      if (env_weight || social_weight || gov_weight) {
        const total = (env_weight || 40) + (social_weight || 30) + (gov_weight || 30);
        if (total !== 100) {
          return errorResponse(res, 400, `Weights must sum to 100. Current: ${total}`);
        }
      }

      const updates = {
        env_weight: env_weight?.toString(),
        social_weight: social_weight?.toString(),
        gov_weight: gov_weight?.toString(),
        auto_emission_calc: auto_emission_calc?.toString(),
        evidence_requirement: evidence_requirement?.toString(),
        badge_auto_award: badge_auto_award?.toString(),
        notification_enabled: notification_enabled?.toString()
      };

      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          const [setting] = await Setting.findOrCreate({
            where: { key },
            defaults: { value }
          });
          await setting.update({ value });
        }
      }

      return successResponse(res, 200, 'System settings updated successfully', updates);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get system health
  async getSystemHealth(req, res) {
    try {
      const health = {
        database: 'connected',
        timestamp: new Date(),
        metrics: {
          total_departments: await Department.count(),
          total_employees: await Employee.count(),
          total_badges: await Badge.count(),
          total_rewards: await Reward.count()
        }
      };

      return successResponse(res, 200, 'System health fetched successfully', health);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, 'System health check failed');
    }
  }

  // Phase 10: Bulk assign badges
  async bulkAssignBadges(req, res) {
    try {
      const { badge_id, department_id } = req.body;

      const employees = await Employee.findAll({
        where: { department_id },
        attributes: ['id']
      });

      const { EmployeeBadge } = require('../models');
      const assignments = [];

      for (const employee of employees) {
        const [assignment] = await EmployeeBadge.findOrCreate({
          where: { employee_id: employee.id, badge_id },
          defaults: { earned_at: new Date() }
        });
        assignments.push(assignment);
      }

      return successResponse(res, 201, `${assignments.length} badges assigned successfully`, {
        count: assignments.length
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get department hierarchy
  async getDepartmentHierarchy(req, res) {
    try {
      const departments = await Department.findAll({
        include: [
          { model: Department, as: 'parent' },
          { model: Employee, as: 'employees' }
        ]
      });

      // Build tree structure
      const tree = this._buildDepartmentTree(departments);

      return successResponse(res, 200, 'Department hierarchy fetched successfully', tree);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Get audit logs
  async getAuditLogs(req, res) {
    try {
      const { limit = 50, offset = 0, action } = req.query;

      const { Audit } = require('../models');
      const where = {};
      if (action) where.audit_type = action;

      const logs = await Audit.findAll({
        where,
        order: [['conducted_at', 'DESC']],
        limit: Math.min(parseInt(limit), 100),
        offset: parseInt(offset)
      });

      return successResponse(res, 200, 'Audit logs fetched successfully', logs);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Sync all scores
  async syncAllScores(req, res) {
    try {
      const scoringService = require('../services/scoringService');
      const results = await scoringService.recalculateAllScores();

      return successResponse(res, 200, `${results.length} department scores calculated successfully`, {
        count: results.length,
        results
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Helper: Build department tree
  _buildDepartmentTree(departments, parentId = null) {
    return departments
      .filter(d => d.parent_department_id === parentId)
      .map(d => ({
        id: d.id,
        name: d.name,
        code: d.code,
        employee_count: d.employees?.length || 0,
        children: this._buildDepartmentTree(departments, d.id)
      }));
  }

  // Phase 10: Export organization data
  async exportOrgData(req, res) {
    try {
      const { format = 'json' } = req.query;

      const [departments, employees, badges] = await Promise.all([
        Department.findAll(),
        Employee.findAll(),
        Badge.findAll()
      ]);

      const data = {
        exported_at: new Date(),
        summary: {
          departments: departments.length,
          employees: employees.length,
          badges: badges.length
        },
        data: { departments, employees, badges }
      };

      if (format === 'csv') {
        // Simple CSV export
        const csv = JSON.stringify(data, null, 2);
        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', `attachment; filename="org-export-${Date.now()}.csv"`);
        return res.send(csv);
      }

      return successResponse(res, 200, 'Organization data exported successfully', data);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: User management
  async getUserManagement(req, res) {
    try {
      const { role, department_id } = req.query;
      const where = {};

      if (role) where.role = role;
      if (department_id) where.department_id = department_id;

      const users = await Employee.findAll({
        where,
        include: [{ model: Department, as: 'department' }],
        attributes: { exclude: ['password'] }
      });

      return successResponse(res, 200, 'Users fetched successfully', users);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 10: Bulk update user roles
  async bulkUpdateUserRoles(req, res) {
    try {
      const { employee_ids, new_role } = req.body;

      const updated = await Employee.update(
        { role: new_role },
        { where: { id: { [sequelize.Op.in]: employee_ids } } }
      );

      return successResponse(res, 200, `${updated[0]} users updated successfully`, {
        count: updated[0]
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new AdminController();
