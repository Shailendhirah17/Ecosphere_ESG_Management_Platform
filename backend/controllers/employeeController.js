const employeeService = require('../services/employeeService');
const responseUtils = require('../utils/responseUtils');

class EmployeeController {
  async createEmployee(req, res) {
    try {
      const { name, email, password, department_id, role } = req.body;

      if (!name || !email || !password) {
        return responseUtils.error(res, 'Name, email, and password are required', 400);
      }

      const existingEmployee = await employeeService.getEmployeeByEmail(email);
      if (existingEmployee) {
        return responseUtils.error(res, 'Email already exists', 400);
      }

      const employee = await employeeService.createEmployee({
        name,
        email,
        password,
        department_id,
        role
      });

      return responseUtils.success(res, employee, 'Employee created successfully', 201);
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await employeeService.getAllEmployees();
      return responseUtils.success(res, employees, 'Employees fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await employeeService.getEmployeeById(id);
      return responseUtils.success(res, employee, 'Employee fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, error.message.includes('not found') ? 404 : 500);
    }
  }

  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, department_id, role, status } = req.body;

      const employee = await employeeService.updateEmployee(id, {
        name,
        email,
        password,
        department_id,
        role,
        status
      });

      return responseUtils.success(res, employee, 'Employee updated successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, error.message.includes('not found') ? 404 : 500);
    }
  }

  async awardBadge(req, res) {
    try {
      const { employeeId, badgeId } = req.body;

      if (!employeeId || !badgeId) {
        return responseUtils.error(res, 'Employee ID and Badge ID are required', 400);
      }

      const result = await employeeService.awardBadge(employeeId, badgeId);
      return responseUtils.success(res, result, 'Badge awarded successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async addXP(req, res) {
    try {
      const { employeeId, xp } = req.body;

      if (!employeeId || !xp) {
        return responseUtils.error(res, 'Employee ID and XP are required', 400);
      }

      const employee = await employeeService.addXP(employeeId, xp);
      return responseUtils.success(res, employee, 'XP added successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async addPoints(req, res) {
    try {
      const { employeeId, points } = req.body;

      if (!employeeId || !points) {
        return responseUtils.error(res, 'Employee ID and points are required', 400);
      }

      const employee = await employeeService.addPoints(employeeId, points);
      return responseUtils.success(res, employee, 'Points added successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getLeaderboard(req, res) {
    try {
      const limit = req.query.limit || 10;
      const leaderboard = await employeeService.getLeaderboard(limit);
      return responseUtils.success(res, leaderboard, 'Leaderboard fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }
}

module.exports = new EmployeeController();
