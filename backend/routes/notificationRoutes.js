const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const notificationController = require('../controllers/notificationController');

// Phase 8: Notifications
router.get('/employee/:employee_id', authenticate, notificationController.getNotificationsForEmployee);
router.put('/:notification_id/read', authenticate, notificationController.markAsRead);
router.get('/employee/:employee_id/unread', authenticate, notificationController.getUnreadCount);
router.post('/bulk', authenticate, authorize(['ESG Admin']), notificationController.sendBulkNotification);
router.post('/cleanup', authenticate, authorize(['ESG Admin']), notificationController.cleanupOldNotifications);

module.exports = router;
