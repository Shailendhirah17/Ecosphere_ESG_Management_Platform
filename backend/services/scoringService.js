const { DepartmentScore, Department, Setting } = require('../models');
const environmentalService = require('./environmentalService');
const socialService = require('./socialService');
const sequelize = require('../config/sequelize');

class ScoringService {
  // Phase 7: Calculate overall department score
  async calculateOverallScore(department_id) {
    try {
      const department = await Department.findByPk(department_id);
      if (!department) {
        throw new Error('Department not found');
      }

      // Get settings for weights
      const settings = await Setting.findAll();
      const settingsMap = {};
      settings.forEach(s => {
        settingsMap[s.key] = s.value;
      });

      const envWeight = parseInt(settingsMap['env_weight']) || 40;
      const socialWeight = parseInt(settingsMap['social_weight']) || 30;
      const govWeight = parseInt(settingsMap['gov_weight']) || 30;

      // Calculate pillar scores
      const envScore = await environmentalService.calculateEnvironmentalScore(department_id);
      const socialScore = await socialService.calculateSocialScore(department_id);
      const govScore = await this.calculateGovernanceScore(department_id);

      // Weighted average
      const overallScore = (
        (envScore.score * envWeight) +
        (socialScore.score * socialWeight) +
        (govScore.score * govWeight)
      ) / 100;

      // Store in DepartmentScore
      const departmentScore = await DepartmentScore.create({
        department_id,
        environmental_score: envScore.score,
        social_score: socialScore.score,
        governance_score: govScore.score,
        overall_score: Math.round(overallScore * 100) / 100
      });

      return {
        scores: {
          environmental: envScore.score,
          social: socialScore.score,
          governance: govScore.score,
          overall: Math.round(overallScore * 100) / 100
        },
        weights: { envWeight, socialWeight, govWeight },
        breakdown: { envScore, socialScore, govScore }
      };
    } catch (error) {
      throw error;
    }
  }

  // Phase 7: Calculate governance score
  async calculateGovernanceScore(department_id) {
    try {
      const { ComplianceIssue, ESGPolicy, PolicyAcknowledgement, Employee } = require('../models');

      const totalIssues = await ComplianceIssue.count();
      const resolvedIssues = await ComplianceIssue.count({ where: { status: 'closed' } });
      const overdueIssues = await ComplianceIssue.count({
        where: {
          status: 'open',
          deadline: { [sequelize.Op.lt]: new Date() }
        }
      });

      const policies = await ESGPolicy.findAll({
        include: [{ model: PolicyAcknowledgement, as: 'acknowledgements' }]
      });

      const totalEmployees = await Employee.count();
      let totalAcknowledgements = 0;

      policies.forEach(p => {
        totalAcknowledgements += p.acknowledgements.filter(a => a.acknowledged_at).length;
      });

      const complianceRate = totalEmployees > 0 ? (totalAcknowledgements / (totalEmployees * policies.length)) * 100 : 0;

      // Score formula: 100 - (open issues * 5) - (overdue issues * 10) + (compliance rate * 0.5)
      const score = Math.max(100 - (totalIssues * 5) - (overdueIssues * 10) + (complianceRate * 0.5), 0);

      return {
        score: Math.round(score * 100) / 100,
        open_issues: totalIssues,
        resolved_issues: resolvedIssues,
        overdue_issues: overdueIssues,
        compliance_rate: Math.round(complianceRate * 100) / 100
      };
    } catch (error) {
      throw error;
    }
  }

  // Phase 7: Get department score history
  async getDepartmentScoreHistory(department_id, limit = 30) {
    try {
      const scores = await DepartmentScore.findAll({
        where: { department_id },
        order: [['created_at', 'DESC']],
        limit
      });

      return scores;
    } catch (error) {
      throw error;
    }
  }

  // Phase 7: Recalculate all department scores
  async recalculateAllScores() {
    try {
      const departments = await Department.findAll();
      const results = [];

      for (const dept of departments) {
        const result = await this.calculateOverallScore(dept.id);
        results.push({ department_id: dept.id, scores: result.scores });
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

  // Phase 7: Get score trends
  async getScoreTrends(department_id, days = 30) {
    try {
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

      const scores = await DepartmentScore.findAll({
        where: {
          department_id,
          created_at: { [sequelize.Op.gte]: since }
        },
        order: [['created_at', 'ASC']],
        limit: 100
      });

      return scores;
    } catch (error) {
      throw error;
    }
  }

  // Phase 7: Get score benchmarks
  async getScoreBenchmarks() {
    try {
      const latestScores = await sequelize.query(`
        SELECT 
          department_id,
          overall_score,
          environmental_score,
          social_score,
          governance_score,
          created_at
        FROM department_scores
        WHERE (department_id, created_at) IN (
          SELECT department_id, MAX(created_at)
          FROM department_scores
          GROUP BY department_id
        )
        ORDER BY overall_score DESC
      `);

      return latestScores[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ScoringService();
