const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CarbonTransaction = sequelize.define('CarbonTransaction', {
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
    source_type: {
      type: DataTypes.ENUM('Purchase', 'Manufacturing', 'Expense', 'Fleet', 'Travel', 'Energy', 'Waste', 'Manual'),
      allowNull: false
    },
    source_ref_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Reference ID from source system'
    },
    emission_factor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'emission_factors',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false
    },
    co2_calculated: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false,
      comment: 'CO2 in kg'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'carbon_transactions',
    timestamps: true,
    underscored: true
  });

  return CarbonTransaction;
};
