const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Create employee (Admin only)
router.post('/', authenticate, authorize(['ESG Admin']), employeeController.createEmployee);

// Get all employees
router.get('/', authenticate, employeeController.getAllEmployees);

// Get employee by ID
router.get('/:id', authenticate, employeeController.getEmployeeById);

// Update employee
router.put('/:id', authenticate, employeeController.updateEmployee);

// Award badge to employee (Admin only)
router.post('/award-badge', authenticate, authorize(['ESG Admin']), employeeController.awardBadge);

// Add XP to employee
router.post('/add-xp', authenticate, authorize(['ESG Admin']), employeeController.addXP);

// Add points to employee
router.post('/add-points', authenticate, authorize(['ESG Admin']), employeeController.addPoints);

// Get leaderboard
router.get('/leaderboard/all', authenticate, employeeController.getLeaderboard);

module.exports = router;
