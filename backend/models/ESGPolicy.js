const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ESGPolicy = sequelize.define('ESGPolicy', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    version: {
      type: DataTypes.STRING(50),
      defaultValue: '1.0'
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Active', 'Archived'),
      defaultValue: 'Draft'
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    }
  }, {
    tableName: 'esg_policies',
    timestamps: true,
    underscored: true
  });

  return ESGPolicy;
};
