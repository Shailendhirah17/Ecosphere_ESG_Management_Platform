const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// CSR Activities
router.post('/activities', authenticate, authorize(['Department Head', 'ESG Admin']), socialController.createCSRActivity);
router.get('/activities', authenticate, socialController.getAllCSRActivities);
router.get('/activities/:id', authenticate, socialController.getCSRActivityById);

// Employee participation
router.post('/participate', authenticate, socialController.joinCSRActivity);
router.post('/participations/:participationId/approve', authenticate, authorize(['Department Head', 'ESG Admin']), socialController.approveParticipation);
router.post('/participations/:participationId/reject', authenticate, authorize(['Department Head', 'ESG Admin']), socialController.rejectParticipation);

// Get employee participations
router.get('/employees/:employeeId/participations', authenticate, socialController.getEmployeeParticipations);

// Get CSR statistics
router.get('/departments/:departmentId/statistics', authenticate, socialController.getCSRStatistics);

module.exports = router;
