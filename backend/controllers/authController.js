const { Employee, Department } = require('../models');
const { generateToken } = require('../utils/jwtUtils');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { successResponse, errorResponse } = require('../utils/responseUtils');

exports.register = async (req, res) => {
  try {
    const { email, password, name, department_id, role } = req.body;

    // Validation
    if (!email || !password || !name || !department_id) {
      return errorResponse(res, 400, 'Missing required fields: email, password, name, department_id');
    }

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return errorResponse(res, 409, 'Email already registered');
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create employee
    const employee = await Employee.create({
      email,
      password_hash,
      name,
      department_id,
      role: role || 'Employee'
    });

    // Generate token
    const token = generateToken(employee);

    successResponse(res, 201, 'Employee registered successfully', {
      employee: {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        role: employee.role
      },
      token
    });
  } catch (error) {
    errorResponse(res, 500, 'Registration failed', error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return errorResponse(res, 400, 'Email and password required');
    }

    // Find employee
    const employee = await Employee.findOne({ 
      where: { email },
      include: {
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'code']
      }
    });

    if (!employee) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, employee.password_hash);
    if (!isPasswordValid) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Generate token
    const token = generateToken(employee);

    successResponse(res, 200, 'Login successful', {
      employee: {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        role: employee.role,
        department: employee.department,
        xp_balance: employee.xp_balance,
        points_balance: employee.points_balance
      },
      token
    });
  } catch (error) {
    errorResponse(res, 500, 'Login failed', error);
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return errorResponse(res, 400, 'Token required');
    }

    // Verify token (will throw if invalid)
    const { verifyToken } = require('../utils/jwtUtils');
    const decoded = verifyToken(token);

    if (!decoded) {
      return errorResponse(res, 401, 'Invalid token');
    }

    // Get employee and generate new token
    const employee = await Employee.findByPk(decoded.id);
    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    const newToken = generateToken(employee);

    successResponse(res, 200, 'Token refreshed', { token: newToken });
  } catch (error) {
    errorResponse(res, 500, 'Token refresh failed', error);
  }
};
