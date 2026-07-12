const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Department = sequelize.define('Department', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    head_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parent_department_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Archived'),
      defaultValue: 'Active'
    }
  }, {
    tableName: 'departments',
    timestamps: true,
    underscored: true
  });

  return Department;
};
