const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ComplianceIssue = sequelize.define('ComplianceIssue', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    audit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audits',
        key: 'id'
      }
    },
    severity: {
      type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low'),
      defaultValue: 'Medium'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Open', 'InProgress', 'Resolved', 'Closed'),
      defaultValue: 'Open'
    },
    resolution_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'compliance_issues',
    timestamps: true,
    underscored: true
  });

  return ComplianceIssue;
};
