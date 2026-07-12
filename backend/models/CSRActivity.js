const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CSRActivity = sequelize.define('CSRActivity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('Draft', 'InProgress', 'Completed', 'Cancelled'),
      defaultValue: 'Draft'
    },
    target_participants: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'csr_activities',
    timestamps: true,
    underscored: true
  });

  return CSRActivity;
};
