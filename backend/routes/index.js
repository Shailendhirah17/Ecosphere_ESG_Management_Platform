const express = require('express');
const router = express.Router();

// Module routes
router.use('/auth', require('./authRoutes'));
router.use('/employees', require('./employeeRoutes'));
router.use('/departments', require('./departmentRoutes'));
router.use('/environmental', require('./environmentalRoutes'));
router.use('/social', require('./socialRoutes'));
router.use('/governance', require('./governanceRoutes'));
router.use('/gamification', require('./gamificationRoutes'));
router.use('/reports', require('./reportRoutes'));
router.use('/admin', require('./adminRoutes'));
router.use('/settings', require('./settingsRoutes'));
router.use('/notifications', require('./notificationRoutes'));
router.use('/scoring', require('./scoringRoutes'));

module.exports = router;
