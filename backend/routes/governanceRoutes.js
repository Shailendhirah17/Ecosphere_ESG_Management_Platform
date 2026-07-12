const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const governanceController = require('../controllers/governanceController');
const scoringController = require('../controllers/scoringController');

// Phase 5: Compliance issues
router.post('/compliance/issues', authenticate, governanceController.createComplianceIssue);
router.get('/compliance/issues', authenticate, governanceController.getComplianceIssues);
router.put('/compliance/issues/:id', authenticate, governanceController.updateComplianceIssue);
router.get('/compliance/overdue', authenticate, governanceController.getOverdueIssues);

// Phase 5: Policy acknowledgements
router.post('/policies/acknowledge', authenticate, governanceController.acknowledgePolicyAsync);
router.get('/policies/:policy_id/status', authenticate, governanceController.getPolicyStatus);

// Phase 5: Audits
router.post('/audits', authenticate, authorize(['ESG Admin', 'Auditor']), governanceController.createAudit);
router.get('/audits', authenticate, governanceController.getAudits);

// Phase 7: Governance score
router.get('/scores/:department_id', authenticate, governanceController.calculateGovernanceScore);

// Index
router.get('/', authenticate, (req, res) => {
  res.json({ 
    success: true,
    message: 'Governance module',
    modules: ['Compliance Issues', 'Audits', 'Policies', 'Governance Scores']
  });
});

module.exports = router;
