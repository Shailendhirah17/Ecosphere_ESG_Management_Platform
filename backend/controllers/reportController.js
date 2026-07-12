const { CarbonTransaction, DepartmentScore, CSRActivity, Challenge, Department } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const sequelize = require('../config/sequelize');

class ReportController {
  // Phase 9: Generate carbon emissions report
  generateCarbonReport = async (req, res) => {
    try {
      const { department_id, start_date, end_date, format = 'json' } = req.body;

      const where = { department_id };
      if (start_date || end_date) {
        where.date = {};
        if (start_date) where.date[sequelize.Op.gte] = new Date(start_date);
        if (end_date) where.date[sequelize.Op.lte] = new Date(end_date);
      }

      const transactions = await CarbonTransaction.findAll({
        where,
        order: [['date', 'ASC']]
      });

      const totalEmissions = transactions.reduce((sum, t) => sum + t.co2_equivalent, 0);
      const byCategory = {};

      transactions.forEach(t => {
        if (!byCategory[t.category]) {
          byCategory[t.category] = { count: 0, total: 0 };
        }
        byCategory[t.category].count++;
        byCategory[t.category].total += t.co2_equivalent;
      });

      const report = {
        report_type: 'CARBON_EMISSIONS',
        department_id,
        period: { start_date, end_date },
        total_emissions: totalEmissions,
        by_category: byCategory,
        transaction_count: transactions.length,
        generated_at: new Date()
      };

      if (format === 'csv') {
        return this._returnAsCSV(res, report, transactions);
      } else if (format === 'pdf') {
        return this._returnAsPDF(res, report);
      }

      return successResponse(res, 200, 'Carbon report generated successfully', report);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 9: Generate ESG scorecard report
  generateScorecardReport = async (req, res) => {
    try {
      const { department_id, include_details = false } = req.body;

      const department = await Department.findByPk(department_id, {
        include: [{ model: DepartmentScore, as: 'scores' }]
      });

      if (!department) {
        return errorResponse(res, 404, 'Department not found');
      }

      const latestScore = department.scores[department.scores.length - 1];

      const scorecard = {
        department: {
          id: department.id,
          name: department.name,
          code: department.code
        },
        scores: {
          environmental: latestScore?.environmental_score || 0,
          social: latestScore?.social_score || 0,
          governance: latestScore?.governance_score || 0,
          overall: latestScore?.overall_score || 0
        },
        generated_at: new Date()
      };

      if (include_details) {
        scorecard.history = department.scores.map(s => ({
          environmental: s.environmental_score,
          social: s.social_score,
          governance: s.governance_score,
          overall: s.overall_score,
          calculated_at: s.calculated_at
        }));
      }

      return successResponse(res, 200, 'Scorecard report generated successfully', scorecard);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 9: Generate engagement report
  generateEngagementReport = async (req, res) => {
    try {
      const { department_id, start_date, end_date } = req.body;

      const where = { department_id };
      if (start_date || end_date) {
        where.createdAt = {};
        if (start_date) where.createdAt[sequelize.Op.gte] = new Date(start_date);
        if (end_date) where.createdAt[sequelize.Op.lte] = new Date(end_date);
      }

      const [activities, challenges] = await Promise.all([
        CSRActivity.findAll({ where }),
        Challenge.findAll({ where })
      ]);

      const report = {
        report_type: 'ENGAGEMENT',
        department_id,
        period: { start_date, end_date },
        csr_activities: activities.length,
        challenges: challenges.length,
        total_engagement_items: activities.length + challenges.length,
        generated_at: new Date()
      };

      return successResponse(res, 200, 'Engagement report generated successfully', report);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }

  // Phase 9: Export report to CSV
  _returnAsCSV = (res, report, details) => {
    const csv = this._convertToCSV(details);
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', `attachment; filename="report-${Date.now()}.csv"`);
    return res.send(csv);
  }

  // Phase 9: Export report to PDF
  _returnAsPDF = (res, report) => {
    // In production, use a library like pdfkit or reportlab
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', `attachment; filename="report-${Date.now()}.pdf"`);
    return res.send(JSON.stringify(report));
  }

  // Helper: Convert data to CSV
  _convertToCSV = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]);
    const rows = data.map(item => 
      headers.map(header => {
        const value = item[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    );

    return [headers.join(','), ...rows].join('\n');
  }

  // Phase 9: Get available reports
  getAvailableReports = async (req, res) => {
    try {
      const reports = [
        {
          id: 'carbon',
          name: 'Carbon Emissions Report',
          description: 'Track emissions by category and time period',
          formats: ['json', 'csv', 'pdf']
        },
        {
          id: 'scorecard',
          name: 'ESG Scorecard',
          description: 'View ESG scores across environmental, social, and governance',
          formats: ['json', 'csv', 'pdf']
        },
        {
          id: 'engagement',
          name: 'Engagement Report',
          description: 'Track CSR activities and challenges',
          formats: ['json', 'csv', 'pdf']
        }
      ];

      return successResponse(res, 200, 'Available reports fetched successfully', reports);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new ReportController();
