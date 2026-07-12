const { CarbonTransaction, EmissionFactor } = require('../models');

class EnvironmentalService {
  // Create carbon transaction
  async createCarbonTransaction(data) {
    try {
      const emissionFactor = await EmissionFactor.findByPk(data.emission_factor_id);
      if (!emissionFactor) {
        throw new Error('Emission factor not found');
      }

      const co2Calculated = data.quantity * emissionFactor.co2_per_unit;

      const transaction = await CarbonTransaction.create({
        department_id: data.department_id,
        source_type: data.source_type,
        source_ref_id: data.source_ref_id,
        emission_factor_id: data.emission_factor_id,
        quantity: data.quantity,
        co2_calculated: co2Calculated,
        date: data.date || new Date()
      });

      return transaction;
    } catch (error) {
      throw new Error(`Failed to create carbon transaction: ${error.message}`);
    }
  }

  // Get all carbon transactions
  async getAllCarbonTransactions(filters = {}) {
    try {
      const where = {};
      if (filters.department_id) where.department_id = filters.department_id;
      if (filters.source_type) where.source_type = filters.source_type;
      if (filters.start_date || filters.end_date) {
        where.date = {};
        if (filters.start_date) where.date[require('sequelize').Op.gte] = filters.start_date;
        if (filters.end_date) where.date[require('sequelize').Op.lte] = filters.end_date;
      }

      const transactions = await CarbonTransaction.findAll({
        where,
        include: [
          { model: EmissionFactor, as: 'emissionFactor' }
        ],
        order: [['date', 'DESC']]
      });

      return transactions;
    } catch (error) {
      throw new Error(`Failed to fetch carbon transactions: ${error.message}`);
    }
  }

  // Get carbon transaction by ID
  async getCarbonTransactionById(id) {
    try {
      const transaction = await CarbonTransaction.findByPk(id, {
        include: [
          { model: EmissionFactor, as: 'emissionFactor' }
        ]
      });

      if (!transaction) {
        throw new Error('Carbon transaction not found');
      }

      return transaction;
    } catch (error) {
      throw new Error(`Failed to fetch carbon transaction: ${error.message}`);
    }
  }

  // Get total emissions by department
  async getTotalEmissionsByDepartment(departmentId, startDate, endDate) {
    try {
      const { sequelize } = require('../models');
      const transactions = await CarbonTransaction.findAll({
        where: {
          department_id: departmentId,
          date: {
            [require('sequelize').Op.between]: [startDate, endDate]
          }
        }
      });

      const totalEmissions = transactions.reduce((sum, t) => sum + (t.co2_calculated || 0), 0);
      
      return {
        departmentId,
        totalEmissions,
        transactionCount: transactions.length,
        period: { startDate, endDate }
      };
    } catch (error) {
      throw new Error(`Failed to calculate total emissions: ${error.message}`);
    }
  }

  // Create emission factor
  async createEmissionFactor(data) {
    try {
      const factor = await EmissionFactor.create({
        activity_type: data.activity_type,
        unit: data.unit,
        co2_per_unit: data.co2_per_unit,
        description: data.description
      });

      return factor;
    } catch (error) {
      throw new Error(`Failed to create emission factor: ${error.message}`);
    }
  }

  // Get all emission factors
  async getAllEmissionFactors() {
    try {
      const factors = await EmissionFactor.findAll({
        order: [['activity_type', 'ASC']]
      });

      return factors;
    } catch (error) {
      throw new Error(`Failed to fetch emission factors: ${error.message}`);
    }
  }

  // Get emission factor by ID
  async getEmissionFactorById(id) {
    try {
      const factor = await EmissionFactor.findByPk(id);

      if (!factor) {
        throw new Error('Emission factor not found');
      }

      return factor;
    } catch (error) {
      throw new Error(`Failed to fetch emission factor: ${error.message}`);
    }
  }

  // Update emission factor
  async updateEmissionFactor(id, data) {
    try {
      const factor = await EmissionFactor.findByPk(id);
      if (!factor) {
        throw new Error('Emission factor not found');
      }

      await factor.update({
        activity_type: data.activity_type || factor.activity_type,
        unit: data.unit || factor.unit,
        co2_per_unit: data.co2_per_unit || factor.co2_per_unit,
        description: data.description || factor.description
      });

      return factor;
    } catch (error) {
      throw new Error(`Failed to update emission factor: ${error.message}`);
    }
  }

  // Calculate environmental score
  async calculateEnvironmentalScore(departmentId) {
    try {
      const now = new Date();
      const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      const stats = await this.getTotalEmissionsByDepartment(departmentId, lastYear, now);
      
      let score = 100 - (stats.totalEmissions / 10);
      if (score < 0) score = 0;
      if (score > 100) score = 100;

      return { score: Math.round(score * 100) / 100, details: stats };
    } catch (error) {
      throw new Error(`Failed to calculate environmental score: ${error.message}`);
    }
  }
}

module.exports = new EnvironmentalService();
