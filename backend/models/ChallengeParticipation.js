const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChallengeParticipation = sequelize.define('ChallengeParticipation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'challenges',
        key: 'id'
      }
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    progress: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      comment: 'Progress percentage 0-100'
    },
    proof_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    approval_status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending'
    },
    xp_awarded: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'challenge_participations',
    timestamps: true,
    underscored: true
  });

  return ChallengeParticipation;
};
