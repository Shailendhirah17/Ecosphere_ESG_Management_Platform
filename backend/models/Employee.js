const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM('Employee', 'DepartmentHead', 'ESGAdmin', 'Auditor', 'SuperAdmin'),
      defaultValue: 'Employee'
    },
    profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    xp_balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    points_balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'OnLeave'),
      defaultValue: 'Active'
    }
  }, {
    tableName: 'employees',
    timestamps: true,
    underscored: true
  });

  return Employee;
};
