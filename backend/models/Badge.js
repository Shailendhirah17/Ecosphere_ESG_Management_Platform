const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Badge = sequelize.define('Badge', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'URL or base64 of badge icon'
    },
    unlock_rule_json: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'JSON with conditions like {type: "xp", value: 1000} or {type: "challenges", value: 5}'
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'badges',
    timestamps: true,
    underscored: true
  });

  return Badge;
};
