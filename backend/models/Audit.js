const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Audit = sequelize.define('Audit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    auditor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    findings_summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Scheduled', 'InProgress', 'Completed', 'Cancelled'),
      defaultValue: 'Scheduled'
    }
  }, {
    tableName: 'audits',
    timestamps: true,
    underscored: true
  });

  return Audit;
};
