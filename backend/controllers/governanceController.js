const { PolicyAcknowledgement, ESGPolicy, ComplianceIssue, Audit, Employee, Department } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const sequelize = require('../config/sequelize');

class GovernanceController {
  // Phase 5: Create compliance issue
  async createComplianceIssue(req, res) {
    try {
      const { title, description, severity, owner_id, deadline, category } = req.body;

      const issue = await ComplianceIssue.create({
        title,
        description,
        severity,
        owner_id,
        deadline,
        category,
        status: 'open',
        created_at: new Date()
      });

      return successResponse(res, 201, 'Compliance issue created successfully', issue);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 5: Get compliance issues
  async getComplianceIssues(req, res) {
    try {
      const { status, severity } = req.query;
      const where = {};

      if (status) where.status = status;
      if (severity) where.severity = severity;

      const issues = await ComplianceIssue.findAll({
        where,
        include: [
          { model: Employee, as: 'owner' }
        ],
        order: [['created_at', 'DESC']]
      });

      return successResponse(res, 200, 'Compliance issues fetched successfully', issues);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 5: Update compliance issue
  async updateComplianceIssue(req, res) {
    try {
      const { id } = req.params;
      const { status, resolution_notes } = req.body;

      const issue = await ComplianceIssue.findByPk(id);
      if (!issue) {
        return errorResponse(res, 404, 'Compliance issue not found');
      }

      await issue.update({
        status,
        resolution_notes,
        resolved_at: status === 'closed' ? new Date() : issue.resolved_at
      });

      return successResponse(res, 200, 'Compliance issue updated successfully', issue);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 5: Create policy acknowledgement
  async acknowledgePolicyAsync (req, res) {
    try {
      const { employee_id, policy_id } = req.body;

      // Check if already acknowledged
      const existing = await PolicyAcknowledgement.findOne({
        where: { employee_id, policy_id }
      });

      if (existing && existing.acknowledged_at) {
        return errorResponse(res, 400, 'Policy already acknowledged by this employee');
      }

      const acknowledgement = await PolicyAcknowledgement.create({
        employee_id,
        policy_id,
        acknowledged_at: new Date(),
        status: 'acknowledged'
      });

      return successResponse(res, 201, 'Policy acknowledged successfully', acknowledgement);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 5: Get policy acknowledgement status
  async getPolicyStatus(req, res) {
    try {
      const { policy_id } = req.params;

      const policy = await ESGPolicy.findByPk(policy_id, {
        include: [
          { model: PolicyAcknowledgement, as: 'acknowledgements' }
        ]
      });

      if (!policy) {
        return errorResponse(res, 404, 'Policy not found');
      }

      const totalEmployees = await Employee.count();
      const acknowledgedCount = policy.acknowledgements.filter(a => a.acknowledged_at).length;
      const pendingCount = totalEmployees - acknowledgedCount;

      return successResponse(res, 200, 'Policy status fetched successfully', {
        policy,
        total_employees: totalEmployees,
        acknowledged: acknowledgedCount,
        pending: pendingCount
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 5: Create audit
  async createAudit(req, res) {
    try {
      const { department_id, auditor_id, audit_type, findings, status } = req.body;

      const audit = await Audit.create({
        department_id,
        auditor_id,
        audit_type,
        findings,
        status: status || 'pending',
        conducted_at: new Date()
      });

      return successResponse(res, 201, 'Audit created successfully', audit);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 5: Get audits
  async getAudits(req, res) {
    try {
      const { department_id, status } = req.query;
      const where = {};

      if (department_id) where.department_id = department_id;
      if (status) where.status = status;

      const audits = await Audit.findAll({
        where,
        include: [
          { model: Department, as: 'department' },
          { model: Employee, as: 'auditor' }
        ],
        order: [['conducted_at', 'DESC']]
      });

      return successResponse(res, 200, 'Audits fetched successfully', audits);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 5: Get overdue compliance issues
  async getOverdueIssues(req, res) {
    try {
      const now = new Date();
      const overdueIssues = await ComplianceIssue.findAll({
        where: {
          status: 'open',
          deadline: {
            [sequelize.Op.lt]: now
          }
        },
        include: [
          { model: Employee, as: 'owner' }
        ]
      });

      return successResponse(res, 200, 'Overdue compliance issues fetched successfully', overdueIssues);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 7: Calculate governance score
  async calculateGovernanceScore(req, res) {
    try {
      const { department_id } = req.params;

      const department = await Department.findByPk(department_id);
      if (!department) {
        return errorResponse(res, 404, 'Department not found');
      }

      // Get compliance metrics
      const totalIssues = await ComplianceIssue.count({ where: { status: 'open' } });
      const resolvedIssues = await ComplianceIssue.count({ where: { status: 'closed' } });
      const overdueIssues = await ComplianceIssue.count({
        where: {
          status: 'open',
          deadline: { [sequelize.Op.lt]: new Date() }
        }
      });

      // Get policy compliance
      const policies = await ESGPolicy.findAll({ include: [{ model: PolicyAcknowledgement, as: 'acknowledgements' }] });
      const totalEmployees = await Employee.count();
      let totalAcknowledgements = 0;

      policies.forEach(p => {
        totalAcknowledgements += p.acknowledgements.filter(a => a.acknowledged_at).length;
      });

      const complianceRate = totalEmployees > 0 ? (totalAcknowledgements / (totalEmployees * policies.length)) * 100 : 0;

      // Score: 100 - (open issues * 5) - (overdue issues * 10) + (compliance rate * 0.5)
      const score = Math.max(100 - (totalIssues * 5) - (overdueIssues * 10) + (complianceRate * 0.5), 0);

      return successResponse(res, 200, 'Governance score calculated successfully', {
        score: Math.round(score * 100) / 100,
        open_issues: totalIssues,
        resolved_issues: resolvedIssues,
        overdue_issues: overdueIssues,
        compliance_rate: Math.round(complianceRate * 100) / 100
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new GovernanceController();
