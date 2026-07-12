const environmentalService = require('../services/environmentalService');
const responseUtils = require('../utils/responseUtils');

class EnvironmentalController {
  async createCarbonTransaction(req, res) {
    try {
      const { department_id, source_type, source_ref_id, emission_factor_id, quantity, date } = req.body;

      if (!department_id || !source_type || !emission_factor_id || !quantity) {
        return responseUtils.error(res, 'Department ID, source type, emission factor ID, and quantity are required', 400);
      }

      const transaction = await environmentalService.createCarbonTransaction({
        department_id,
        source_type,
        source_ref_id,
        emission_factor_id,
        quantity,
        date
      });

      return responseUtils.success(res, transaction, 'Carbon transaction created successfully', 201);
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getAllCarbonTransactions(req, res) {
    try {
      const filters = {
        department_id: req.query.department_id,
        source_type: req.query.source_type,
        start_date: req.query.start_date,
        end_date: req.query.end_date
      };

      const transactions = await environmentalService.getAllCarbonTransactions(filters);
      return responseUtils.success(res, transactions, 'Carbon transactions fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getCarbonTransactionById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await environmentalService.getCarbonTransactionById(id);
      return responseUtils.success(res, transaction, 'Carbon transaction fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, error.message.includes('not found') ? 404 : 500);
    }
  }

  async getTotalEmissionsByDepartment(req, res) {
    try {
      const { departmentId } = req.params;
      const { start_date, end_date } = req.query;

      if (!start_date || !end_date) {
        return responseUtils.error(res, 'Start date and end date are required', 400);
      }

      const result = await environmentalService.getTotalEmissionsByDepartment(departmentId, start_date, end_date);
      return responseUtils.success(res, result, 'Total emissions fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async createEmissionFactor(req, res) {
    try {
      const { activity_type, unit, co2_per_unit, description } = req.body;

      if (!activity_type || !unit || !co2_per_unit) {
        return responseUtils.error(res, 'Activity type, unit, and CO2 per unit are required', 400);
      }

      const factor = await environmentalService.createEmissionFactor({
        activity_type,
        unit,
        co2_per_unit,
        description
      });

      return responseUtils.success(res, factor, 'Emission factor created successfully', 201);
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getAllEmissionFactors(req, res) {
    try {
      const factors = await environmentalService.getAllEmissionFactors();
      return responseUtils.success(res, factors, 'Emission factors fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, 500);
    }
  }

  async getEmissionFactorById(req, res) {
    try {
      const { id } = req.params;
      const factor = await environmentalService.getEmissionFactorById(id);
      return responseUtils.success(res, factor, 'Emission factor fetched successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, error.message.includes('not found') ? 404 : 500);
    }
  }

  async updateEmissionFactor(req, res) {
    try {
      const { id } = req.params;
      const { activity_type, unit, co2_per_unit, description } = req.body;

      const factor = await environmentalService.updateEmissionFactor(id, {
        activity_type,
        unit,
        co2_per_unit,
        description
      });

      return responseUtils.success(res, factor, 'Emission factor updated successfully');
    } catch (error) {
      console.error(error);
      return responseUtils.error(res, error.message, error.message.includes('not found') ? 404 : 500);
    }
  }
}

module.exports = new EnvironmentalController();
