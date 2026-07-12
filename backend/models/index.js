const sequelize = require('../config/sequelize');
const { DataTypes } = require('sequelize');

// Load all models
const Department = require('./Department')(sequelize);
const Employee = require('./Employee')(sequelize);
const Category = require('./Category')(sequelize);
const EmissionFactor = require('./EmissionFactor')(sequelize);
const ProductESGProfile = require('./ProductESGProfile')(sequelize);
const EnvironmentalGoal = require('./EnvironmentalGoal')(sequelize);
const ESGPolicy = require('./ESGPolicy')(sequelize);
const Badge = require('./Badge')(sequelize);
const Reward = require('./Reward')(sequelize);
const CarbonTransaction = require('./CarbonTransaction')(sequelize);
const CSRActivity = require('./CSRActivity')(sequelize);
const EmployeeParticipation = require('./EmployeeParticipation')(sequelize);
const Challenge = require('./Challenge')(sequelize);
const ChallengeParticipation = require('./ChallengeParticipation')(sequelize);
const PolicyAcknowledgement = require('./PolicyAcknowledgement')(sequelize);
const Audit = require('./Audit')(sequelize);
const ComplianceIssue = require('./ComplianceIssue')(sequelize);
const DepartmentScore = require('./DepartmentScore')(sequelize);
const EmployeeBadge = require('./EmployeeBadge')(sequelize);
const RewardRedemption = require('./RewardRedemption')(sequelize);
const Setting = require('./Setting')(sequelize);
const Notification = require('./Notification')(sequelize);

// Define associations
// Department
Department.hasMany(Employee, { foreignKey: 'department_id', as: 'employees' });
Department.hasMany(CarbonTransaction, { foreignKey: 'department_id', as: 'carbonTransactions' });
Department.hasMany(EnvironmentalGoal, { foreignKey: 'department_id', as: 'goals' });
Department.hasMany(CSRActivity, { foreignKey: 'department_id', as: 'csrActivities' });
Department.hasMany(Challenge, { foreignKey: 'department_id', as: 'challenges' });
Department.hasMany(DepartmentScore, { foreignKey: 'department_id', as: 'scores' });
Department.hasMany(Audit, { foreignKey: 'department_id', as: 'audits' });
Department.hasOne(Department, { foreignKey: 'id', sourceKey: 'parent_department_id', as: 'parent_wrong' }); // Keep old commented or just replaced by belongsTo
Department.belongsTo(Department, { foreignKey: 'parent_department_id', as: 'parent' });
Department.belongsTo(Employee, { foreignKey: 'head_id', as: 'head' });

// Employee
Employee.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Employee.hasMany(EmployeeParticipation, { foreignKey: 'employee_id', as: 'participations' });
Employee.hasMany(ChallengeParticipation, { foreignKey: 'employee_id', as: 'challengeParticipations' });
Employee.hasMany(PolicyAcknowledgement, { foreignKey: 'employee_id', as: 'policyAcknowledgements' });
Employee.hasMany(Audit, { foreignKey: 'auditor_id', as: 'audits' });
Employee.hasMany(ComplianceIssue, { foreignKey: 'owner_id', as: 'complianceIssues' });
Employee.hasMany(EmployeeBadge, { foreignKey: 'employee_id', as: 'badges' });
Employee.hasMany(RewardRedemption, { foreignKey: 'employee_id', as: 'redemptions' });

// Category
Category.hasMany(CSRActivity, { foreignKey: 'category_id', as: 'activities' });
Category.hasMany(Challenge, { foreignKey: 'category_id', as: 'challenges' });

// EmissionFactor
EmissionFactor.hasMany(CarbonTransaction, { foreignKey: 'emission_factor_id', as: 'transactions' });

// ProductESGProfile
// (No direct associations)

// EnvironmentalGoal
EnvironmentalGoal.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

// ESGPolicy
ESGPolicy.hasMany(PolicyAcknowledgement, { foreignKey: 'policy_id', as: 'acknowledgements' });

// Badge
Badge.hasMany(EmployeeBadge, { foreignKey: 'badge_id', as: 'employeeBadges' });

// Reward
Reward.hasMany(RewardRedemption, { foreignKey: 'reward_id', as: 'redemptions' });

// CarbonTransaction
CarbonTransaction.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
CarbonTransaction.belongsTo(EmissionFactor, { foreignKey: 'emission_factor_id', as: 'emissionFactor' });

// CSRActivity
CSRActivity.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
CSRActivity.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
CSRActivity.hasMany(EmployeeParticipation, { foreignKey: 'activity_id', as: 'participations' });

// EmployeeParticipation
EmployeeParticipation.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
EmployeeParticipation.belongsTo(CSRActivity, { foreignKey: 'activity_id', as: 'activity' });

// Challenge
Challenge.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Challenge.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Challenge.hasMany(ChallengeParticipation, { foreignKey: 'challenge_id', as: 'participations' });

// ChallengeParticipation
ChallengeParticipation.belongsTo(Challenge, { foreignKey: 'challenge_id', as: 'challenge' });
ChallengeParticipation.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

// PolicyAcknowledgement
PolicyAcknowledgement.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
PolicyAcknowledgement.belongsTo(ESGPolicy, { foreignKey: 'policy_id', as: 'policy' });

// Audit
Audit.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Audit.belongsTo(Employee, { foreignKey: 'auditor_id', as: 'auditor' });
Audit.hasMany(ComplianceIssue, { foreignKey: 'audit_id', as: 'issues' });

// ComplianceIssue
ComplianceIssue.belongsTo(Audit, { foreignKey: 'audit_id', as: 'audit' });
ComplianceIssue.belongsTo(Employee, { foreignKey: 'owner_id', as: 'owner' });

// DepartmentScore
DepartmentScore.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

// EmployeeBadge
EmployeeBadge.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
EmployeeBadge.belongsTo(Badge, { foreignKey: 'badge_id', as: 'badge' });

// RewardRedemption
RewardRedemption.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
RewardRedemption.belongsTo(Reward, { foreignKey: 'reward_id', as: 'reward' });

// Setting
// (No direct associations)

module.exports = {
  sequelize,
  Department,
  Employee,
  Category,
  EmissionFactor,
  ProductESGProfile,
  EnvironmentalGoal,
  ESGPolicy,
  Badge,
  Reward,
  CarbonTransaction,
  CSRActivity,
  EmployeeParticipation,
  Challenge,
  ChallengeParticipation,
  PolicyAcknowledgement,
  Audit,
  ComplianceIssue,
  DepartmentScore,
  EmployeeBadge,
  RewardRedemption,
  Setting,
  Notification
};
