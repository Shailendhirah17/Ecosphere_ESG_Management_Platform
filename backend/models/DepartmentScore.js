const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DepartmentScore = sequelize.define('DepartmentScore', {
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
    environmental_score: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      comment: 'Score 0-100'
    },
    social_score: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      comment: 'Score 0-100'
    },
    governance_score: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      comment: 'Score 0-100'
    },
    total_score: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      comment: 'Weighted overall ESG score'
    },
    period: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'e.g., 2024-Q1, 2024-06, 2024-W24'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'department_scores',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['department_id', 'period']
      }
    ]
  });

  return DepartmentScore;
};
