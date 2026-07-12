const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmissionFactor = sequelize.define('EmissionFactor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    activity_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'e.g., Air Travel, Car Travel, Electricity, Gas, Waste'
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'e.g., km, kWh, kg, ton'
    },
    co2_per_unit: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      comment: 'CO2 emissions per unit in kg'
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Data source reference'
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      defaultValue: 'Active'
    }
  }, {
    tableName: 'emission_factors',
    timestamps: true,
    underscored: true
  });

  return EmissionFactor;
};
