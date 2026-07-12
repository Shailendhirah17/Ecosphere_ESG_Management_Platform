module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        'CARBON_TRANSACTION',
        'CSR_ACTIVITY',
        'CHALLENGE_COMPLETED',
        'BADGE_EARNED',
        'COMPLIANCE_ALERT',
        'POLICY_ACKNOWLEDGEMENT',
        'SYSTEM_NOTIFICATION'
      ),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    related_entity_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    related_entity_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('unread', 'read', 'archived'),
      defaultValue: 'unread'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'notifications',
    timestamps: false
  });

  return Notification;
};
