const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Get all departments (PUBLIC - for registration form)
router.get('/public/list', departmentController.getAllDepartments);

// Create department (Admin only)
router.post('/', authenticate, authorize(['ESG Admin']), departmentController.createDepartment);

// Get all departments
router.get('/', authenticate, departmentController.getAllDepartments);

// Get department by ID
router.get('/:id', authenticate, departmentController.getDepartmentById);

// Update department (Admin only)
router.put('/:id', authenticate, authorize(['ESG Admin']), departmentController.updateDepartment);

// Calculate department scores
router.post('/:id/calculate-scores', authenticate, authorize(['ESG Admin']), departmentController.calculateScores);

// Get department statistics
router.get('/:id/stats', authenticate, departmentController.getDepartmentStats);

module.exports = router;
