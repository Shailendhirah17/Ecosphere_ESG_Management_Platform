const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Challenge = sequelize.define('Challenge', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      comment: 'XP reward for completing challenge'
    },
    difficulty: {
      type: DataTypes.ENUM('Easy', 'Medium', 'Hard', 'Expert'),
      defaultValue: 'Medium'
    },
    evidence_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Active', 'UnderReview', 'Completed', 'Archived'),
      defaultValue: 'Draft'
    },
    max_participants: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id'
      }
    }
  }, {
    tableName: 'challenges',
    timestamps: true,
    underscored: true
  });

  return Challenge;
};
