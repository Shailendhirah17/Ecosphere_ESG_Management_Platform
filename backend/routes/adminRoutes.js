const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const dashboardController = require('../controllers/dashboardController');

// Admin panel routes
router.get('/panel', authenticate, authorize(['ESG Admin']), dashboardController.getAdminPanel);
router.get('/health', authenticate, authorize(['ESG Admin']), adminController.getSystemHealth);

// System settings
router.put('/settings', authenticate, authorize(['ESG Admin']), adminController.updateSystemSettings);

// Department hierarchy
router.get('/departments/hierarchy', authenticate, authorize(['ESG Admin']), adminController.getDepartmentHierarchy);

// Audit logs
router.get('/logs', authenticate, authorize(['ESG Admin']), adminController.getAuditLogs);

// Score sync
router.post('/scores/sync', authenticate, authorize(['ESG Admin']), adminController.syncAllScores);

// User management
router.get('/users', authenticate, authorize(['ESG Admin']), adminController.getUserManagement);
router.put('/users/roles', authenticate, authorize(['ESG Admin']), adminController.bulkUpdateUserRoles);

// Badge management
router.post('/badges/assign', authenticate, authorize(['ESG Admin']), adminController.bulkAssignBadges);

// Data export
router.get('/export', authenticate, authorize(['ESG Admin']), adminController.exportOrgData);

// Admin index
router.get('/', authenticate, authorize(['ESG Admin']), (req, res) => {
  res.json({ 
    success: true,
    message: 'Admin dashboard available',
    modules: ['Settings', 'User Management', 'System Health', 'Audit Logs', 'Score Management', 'Data Export']
  });
});

module.exports = router;
