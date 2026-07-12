const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PolicyAcknowledgement = sequelize.define('PolicyAcknowledgement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    policy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'esg_policies',
        key: 'id'
      }
    },
    acknowledged_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    acknowledgement_status: {
      type: DataTypes.ENUM('Acknowledged', 'Pending', 'Rejected'),
      defaultValue: 'Acknowledged'
    }
  }, {
    tableName: 'policy_acknowledgements',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['employee_id', 'policy_id']
      }
    ]
  });

  return PolicyAcknowledgement;
};
