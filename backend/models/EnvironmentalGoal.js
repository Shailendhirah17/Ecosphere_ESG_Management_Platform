const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EnvironmentalGoal = sequelize.define('EnvironmentalGoal', {
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
    metric: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'e.g., Carbon Reduction, Waste Reduction, Energy Efficiency'
    },
    target_value: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    current_value: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('NotStarted', 'InProgress', 'Completed', 'Failed'),
      defaultValue: 'NotStarted'
    }
  }, {
    tableName: 'environmental_goals',
    timestamps: true,
    underscored: true
  });

  return EnvironmentalGoal;
};
