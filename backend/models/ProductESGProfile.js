const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductESGProfile = sequelize.define('ProductESGProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    esg_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    environmental_impact: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'CO2 footprint in kg'
    },
    social_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    governance_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    }
  }, {
    tableName: 'product_esg_profiles',
    timestamps: true,
    underscored: true
  });

  return ProductESGProfile;
};
