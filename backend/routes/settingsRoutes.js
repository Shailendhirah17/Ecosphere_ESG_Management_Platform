const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const settingsController = require('../controllers/settingsController');

// Phase 2: Settings for ESG configuration
router.get('/', authenticate, settingsController.getSettings);
router.get('/:key', authenticate, settingsController.getSetting);
router.put('/', authenticate, authorize(['ESG Admin']), settingsController.updateSettings);

module.exports = router;
