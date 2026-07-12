const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const reportController = require('../controllers/reportController');
const dashboardController = require('../controllers/dashboardController');

// Phase 9: Report generation
router.post('/carbon', authenticate, reportController.generateCarbonReport);
router.post('/scorecard', authenticate, reportController.generateScorecardReport);
router.post('/engagement', authenticate, reportController.generateEngagementReport);
router.get('/available', authenticate, reportController.getAvailableReports);

// Phase 10: Dashboard & Analytics
router.get('/org-dashboard', authenticate, authorize(['ESG Admin']), dashboardController.getOrgDashboard);
router.get('/department/:department_id', authenticate, dashboardController.getDepartmentDashboard);
router.get('/employee/:employee_id', authenticate, dashboardController.getEmployeeDashboard);
router.get('/leaderboard', authenticate, dashboardController.getLeaderboard);
router.get('/analytics', authenticate, dashboardController.getAnalytics);

// Index
router.get('/', authenticate, (req, res) => {
  res.json({ 
    success: true,
    message: 'Reports module',
    reportTypes: ['Carbon', 'Scorecard', 'Engagement', 'Analytics', 'Export PDF', 'Export Excel']
  });
});

module.exports = router;
