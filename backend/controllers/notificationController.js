const { Employee, Notification } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');

class NotificationController {
  // Phase 8: Create notification
  async createNotification(data) {
    try {
      const { employee_id, type, title, message, related_entity_type, related_entity_id } = data;

      // Check if notifications are enabled in settings
      const { Setting } = require('../models');
      const notificationsEnabled = await Setting.findOne({ where: { key: 'notification_enabled' } });

      if (notificationsEnabled && notificationsEnabled.value === 'false') {
        return null;
      }

      const notification = await Notification.create({
        employee_id,
        type,
        title,
        message,
        related_entity_type,
        related_entity_id,
        status: 'unread',
        created_at: new Date()
      });

      return notification;
    } catch (error) {
      throw error;
    }
  }

  // Phase 8: Get notifications for employee
  async getNotificationsForEmployee(req, res) {
    try {
      const { employee_id } = req.params;
      const { status } = req.query;

      const where = { employee_id };
      if (status) where.status = status;

      const notifications = await Notification.findAll({
        where,
        order: [['created_at', 'DESC']],
        limit: 50
      });

      return successResponse(res, 200, 'Notifications fetched successfully', notifications);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 8: Mark notification as read
  async markAsRead(req, res) {
    try {
      const { notification_id } = req.params;

      const notification = await Notification.findByPk(notification_id);
      if (!notification) {
        return errorResponse(res, 404, 'Notification not found');
      }

      await notification.update({ status: 'read', read_at: new Date() });

      return successResponse(res, 200, 'Notification marked as read', notification);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 8: Get unread notification count
  async getUnreadCount(req, res) {
    try {
      const { employee_id } = req.params;

      const count = await Notification.count({
        where: { employee_id, status: 'unread' }
      });

      return successResponse(res, 200, 'Unread count fetched successfully', { unread_count: count });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 8: Send bulk notifications (admin function)
  async sendBulkNotification(req, res) {
    try {
      const { employee_ids, type, title, message } = req.body;

      const notifications = [];
      for (const employee_id of employee_ids) {
        const notif = await this.createNotification({
          employee_id,
          type,
          title,
          message,
          related_entity_type: 'SYSTEM',
          related_entity_id: null
        });
        if (notif) notifications.push(notif);
      }

      return successResponse(res, 201, `${notifications.length} notifications sent successfully`, { count: notifications.length });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 8: Delete old notifications
  async cleanupOldNotifications(req, res) {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const { Notification } = require('../models');
      const result = await Notification.destroy({
        where: {
          created_at: { [require('sequelize').Op.lt]: thirtyDaysAgo }
        }
      });

      return successResponse(res, 200, `${result} old notifications deleted`, { deleted_count: result });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new NotificationController();
