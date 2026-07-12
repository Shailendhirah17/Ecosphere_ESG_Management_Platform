const departmentService = require('../services/departmentService');
const { successResponse, errorResponse } = require('../utils/responseUtils');

class DepartmentController {
  async createDepartment(req, res) {
    try {
      const { name, code, head_id, parent_department_id, employee_count } = req.body;

      if (!name || !code) {
        return errorResponse(res, 400, 'Name and code are required');
      }

      const department = await departmentService.createDepartment({
        name,
        code,
        head_id,
        parent_department_id,
        employee_count
      });

      return successResponse(res, 201, 'Department created successfully', department);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  async getAllDepartments(req, res) {
    try {
      const departments = await departmentService.getAllDepartments();
      return successResponse(res, 200, 'Departments fetched successfully', departments);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  async getDepartmentById(req, res) {
    try {
      const { id } = req.params;
      const department = await departmentService.getDepartmentById(id);
      return successResponse(res, 200, 'Department fetched successfully', department);
    } catch (error) {
      console.error(error);
      return errorResponse(res, error.message.includes('not found') ? 404 : 500, error.message);
    }
  }

  async updateDepartment(req, res) {
    try {
      const { id } = req.params;
      const { name, code, head_id, parent_department_id, status } = req.body;

      const department = await departmentService.updateDepartment(id, {
        name,
        code,
        head_id,
        parent_department_id,
        status
      });

      return successResponse(res, 200, 'Department updated successfully', department);
    } catch (error) {
      console.error(error);
      return errorResponse(res, error.message.includes('not found') ? 404 : 500, error.message);
    }
  }

  async calculateScores(req, res) {
    try {
      const { id } = req.params;
      const scores = await departmentService.calculateDepartmentScores(id);
      return successResponse(res, 200, 'Department scores calculated successfully', scores);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  async getDepartmentStats(req, res) {
    try {
      const { id } = req.params;
      const stats = await departmentService.getDepartmentStats(id);
      return successResponse(res, 200, 'Department statistics fetched successfully', stats);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new DepartmentController();
