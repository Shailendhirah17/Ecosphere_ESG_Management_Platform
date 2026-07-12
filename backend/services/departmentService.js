const { Department, Employee, DepartmentScore, CarbonTransaction, CSRActivity } = require('../models');
const { sequelize } = require('../models');

class DepartmentService {
  // Create department
  async createDepartment(data) {
    try {
      const department = await Department.create({
        name: data.name,
        code: data.code,
        head_id: data.head_id,
        parent_department_id: data.parent_department_id,
        employee_count: data.employee_count || 0,
        status: 'Active'
      });
      return department;
    } catch (error) {
      throw new Error(`Failed to create department: ${error.message}`);
    }
  }

  // Get all departments
  async getAllDepartments() {
    try {
      const departments = await Department.findAll({
        include: [
          { model: Employee, as: 'head', attributes: ['id', 'name', 'email'] }
        ],
        order: [['name', 'ASC']]
      });
      return departments;
    } catch (error) {
      throw new Error(`Failed to fetch departments: ${error.message}`);
    }
  }

  // Get department by ID
  async getDepartmentById(id) {
    try {
      const department = await Department.findByPk(id, {
        include: [
          { model: Employee, as: 'head', attributes: ['id', 'name', 'email'] },
          { model: Employee, as: 'employees', attributes: ['id', 'name', 'email', 'role'] }
        ]
      });
      
      if (!department) {
        throw new Error('Department not found');
      }

      // Get latest department score
      const score = await DepartmentScore.findOne({
        where: { department_id: id },
        order: [['createdAt', 'DESC']]
      });

      return {
        ...department.toJSON(),
        latestScore: score
      };
    } catch (error) {
      throw new Error(`Failed to fetch department: ${error.message}`);
    }
  }

  // Update department
  async updateDepartment(id, data) {
    try {
      const department = await Department.findByPk(id);
      if (!department) {
        throw new Error('Department not found');
      }

      await department.update({
        name: data.name || department.name,
        code: data.code || department.code,
        head_id: data.head_id || department.head_id,
        parent_department_id: data.parent_department_id || department.parent_department_id,
        status: data.status || department.status
      });

      return department;
    } catch (error) {
      throw new Error(`Failed to update department: ${error.message}`);
    }
  }

  // Calculate department ESG scores
  async calculateDepartmentScores(departmentId) {
    try {
      const department = await Department.findByPk(departmentId);
      if (!department) {
        throw new Error('Department not found');
      }

      // Calculate Environmental Score
      const carbonTransactions = await CarbonTransaction.findAll({
        where: { department_id: departmentId }
      });
      const totalEmissions = carbonTransactions.reduce((sum, t) => sum + (t.co2_calculated || 0), 0);
      const environmentalScore = Math.min(100, Math.max(0, 100 - (totalEmissions / 1000)));

      // Calculate Social Score (CSR Activities)
      const csrActivities = await CSRActivity.findAll({
        where: { department_id: departmentId }
      });
      const socialScore = Math.min(100, csrActivities.length * 10);

      // For now, governance score is placeholder
      const governanceScore = 50;

      // Calculate weighted total score
      const weights = {
        environmental: 0.4,
        social: 0.3,
        governance: 0.3
      };

      const totalScore = (
        environmentalScore * weights.environmental +
        socialScore * weights.social +
        governanceScore * weights.governance
      );

      // Save to DepartmentScore
      const scoreRecord = await DepartmentScore.create({
        department_id: departmentId,
        environmental_score: Math.round(environmentalScore),
        social_score: Math.round(socialScore),
        governance_score: Math.round(governanceScore),
        total_score: Math.round(totalScore),
        period: new Date().toISOString().split('T')[0]
      });

      return scoreRecord;
    } catch (error) {
      throw new Error(`Failed to calculate department scores: ${error.message}`);
    }
  }

  // Get department statistics
  async getDepartmentStats(departmentId) {
    try {
      const department = await Department.findByPk(departmentId);
      if (!department) {
        throw new Error('Department not found');
      }

      const employees = await Employee.count({
        where: { department_id: departmentId }
      });

      const carbonTransactions = await CarbonTransaction.count({
        where: { department_id: departmentId }
      });

      const csrActivities = await CSRActivity.count({
        where: { department_id: departmentId }
      });

      const latestScore = await DepartmentScore.findOne({
        where: { department_id: departmentId },
        order: [['createdAt', 'DESC']]
      });

      return {
        departmentId,
        employeeCount: employees,
        carbonTransactionCount: carbonTransactions,
        csrActivityCount: csrActivities,
        latestScore: latestScore || null
      };
    } catch (error) {
      throw new Error(`Failed to get department stats: ${error.message}`);
    }
  }
}

module.exports = new DepartmentService();
