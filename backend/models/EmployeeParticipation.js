const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmployeeParticipation = sequelize.define('EmployeeParticipation', {
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
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'csr_activities',
        key: 'id'
      }
    },
    proof_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'File path or URL to proof/evidence'
    },
    approval_status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending'
    },
    points_earned: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    completion_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'employee_participations',
    timestamps: true,
    underscored: true
  });

  return EmployeeParticipation;
};
