const { Employee, EmployeeBadge, Badge } = require('../models');
const bcrypt = require('bcryptjs');

class EmployeeService {
  // Create employee
  async createEmployee(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      const employee = await Employee.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        department_id: data.department_id,
        role: data.role || 'Employee',
        xp_balance: 0,
        points_balance: 0,
        status: 'Active'
      });

      const { password, ...employeeWithoutPassword } = employee.toJSON();
      return employeeWithoutPassword;
    } catch (error) {
      throw new Error(`Failed to create employee: ${error.message}`);
    }
  }

  // Get all employees
  async getAllEmployees() {
    try {
      const employees = await Employee.findAll({
        attributes: { exclude: ['password'] },
        include: [
          { model: Badge, through: 'EmployeeBadge', as: 'badges' }
        ],
        order: [['name', 'ASC']]
      });
      return employees;
    } catch (error) {
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }
  }

  // Get employee by ID
  async getEmployeeById(id) {
    try {
      const employee = await Employee.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: Badge, through: 'EmployeeBadge', as: 'badges' }
        ]
      });

      if (!employee) {
        throw new Error('Employee not found');
      }

      return employee;
    } catch (error) {
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }

  // Get employee by email
  async getEmployeeByEmail(email) {
    try {
      const employee = await Employee.findOne({
        where: { email }
      });
      return employee;
    } catch (error) {
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }

  // Update employee
  async updateEmployee(id, data) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      await employee.update({
        name: data.name || employee.name,
        email: data.email || employee.email,
        password: data.password || employee.password,
        department_id: data.department_id !== undefined ? data.department_id : employee.department_id,
        role: data.role || employee.role,
        status: data.status || employee.status
      });

      const { password, ...employeeWithoutPassword } = employee.toJSON();
      return employeeWithoutPassword;
    } catch (error) {
      throw new Error(`Failed to update employee: ${error.message}`);
    }
  }

  // Award badge to employee
  async awardBadge(employeeId, badgeId) {
    try {
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      const badge = await Badge.findByPk(badgeId);
      if (!badge) {
        throw new Error('Badge not found');
      }

      const existingBadge = await EmployeeBadge.findOne({
        where: { employee_id: employeeId, badge_id: badgeId }
      });

      if (existingBadge) {
        return { message: 'Employee already has this badge' };
      }

      await EmployeeBadge.create({
        employee_id: employeeId,
        badge_id: badgeId,
        awarded_at: new Date()
      });

      return { success: true, message: 'Badge awarded successfully' };
    } catch (error) {
      throw new Error(`Failed to award badge: ${error.message}`);
    }
  }

  // Add XP to employee
  async addXP(employeeId, xp) {
    try {
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      employee.xp_balance = (employee.xp_balance || 0) + xp;
      await employee.save();

      return employee;
    } catch (error) {
      throw new Error(`Failed to add XP: ${error.message}`);
    }
  }

  // Add points to employee
  async addPoints(employeeId, points) {
    try {
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      employee.points_balance = (employee.points_balance || 0) + points;
      await employee.save();

      return employee;
    } catch (error) {
      throw new Error(`Failed to add points: ${error.message}`);
    }
  }

  // Get employee leaderboard
  async getLeaderboard(limit = 10) {
    try {
      const employees = await Employee.findAll({
        attributes: ['id', 'name', 'email', 'xp_balance', 'points_balance'],
        order: [['xp_balance', 'DESC']],
        limit,
        raw: true
      });
      return employees;
    } catch (error) {
      throw new Error(`Failed to fetch leaderboard: ${error.message}`);
    }
  }
}

module.exports = new EmployeeService();
