const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RewardRedemption = sequelize.define('RewardRedemption', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    reward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rewards',
        key: 'id'
      }
    },
    points_spent: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    redemption_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Fulfilled', 'Cancelled'),
      defaultValue: 'Pending'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'reward_redemptions',
    timestamps: true,
    underscored: true
  });

  return RewardRedemption;
};
