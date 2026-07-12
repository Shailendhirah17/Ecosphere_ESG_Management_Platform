const express = require('express');
const router = express.Router();
const environmentalController = require('../controllers/environmentalController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Carbon Transactions
router.post('/carbon-transactions', authenticate, environmentalController.createCarbonTransaction);
router.get('/carbon-transactions', authenticate, environmentalController.getAllCarbonTransactions);
router.get('/carbon-transactions/:id', authenticate, environmentalController.getCarbonTransactionById);

// Total emissions by department
router.get('/departments/:departmentId/total-emissions', authenticate, environmentalController.getTotalEmissionsByDepartment);

// Emission Factors
router.post('/emission-factors', authenticate, authorize(['ESG Admin']), environmentalController.createEmissionFactor);
router.get('/emission-factors', authenticate, environmentalController.getAllEmissionFactors);
router.get('/emission-factors/:id', authenticate, environmentalController.getEmissionFactorById);
router.put('/emission-factors/:id', authenticate, authorize(['ESG Admin']), environmentalController.updateEmissionFactor);

module.exports = router;
