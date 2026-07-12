// Phase 0 & 1 - Master Data Models
// This file provides documentation for all models

/*
PHASE 0 - AUTH & RBAC
- Roles: Admin, Department Manager, Employee
- Fields: CreatedBy, CreatedAt, UpdatedBy, UpdatedAt, Status on all entities

PHASE 1 - MASTER DATA (8 entities)
1. Department - Hierarchical with parent reference
2. Category - Shared taxonomy (CSR Activity / Challenge)
3. Emission Factor - CO2e values by fuel/activity type
4. Product ESG Profile - Links products to emissions
5. Environmental Goal - Target metrics by department
6. ESG Policy - Documents with acknowledgement workflow
7. Badge - Auto-unlock rules (machine evaluable)
8. Reward - Stock-based redemption

PHASE 2 - ESG CONFIGURATION & TOGGLES
- Scoring weights (40/30/30 default)
- Auto Emission Calculation
- Evidence Requirement
- Badge Auto-Award
- Notification Settings

PHASE 3 - CARBON TRANSACTIONS (Environmental Engine)
- Purchase, Manufacturing, Expense, Fleet → Carbon Transaction
- Calculation: CO2e = quantity × emission_factor_value
- Auto-trigger when config enabled

PHASE 4 - SOCIAL MODULE
- CSR Activity & Employee Participation
- Evidence gate on approval
- Points/XP wallet
- Diversity Metrics, Training Completion
- Social Score calculation

PHASE 5 - GOVERNANCE
- Policy Acknowledgement workflow
- Audits & Compliance Issues
- Overdue flagging & notifications
- Governance Score calculation

PHASE 6 - GAMIFICATION
- Challenges with lifecycle (Draft → Active → Under Review → Completed)
- Challenge Participation with XP awards
- Shared Points/XP wallet
- Badge Auto-Award (event-driven)
- Reward Redemption with stock management
- Leaderboard

PHASE 7 - SCORING ENGINE
- Environmental Score (0-100)
- Social Score (0-100)
- Governance Score (0-100)
- Department Total Score = weighted combination
- Overall ESG Score = aggregate

PHASE 8 - NOTIFICATION SYSTEM
- CSR/Challenge approval decisions
- Policy acknowledgement reminders
- Badge unlocked
- Compliance Issue overdue
- New Compliance Issue raised

PHASE 9 - REPORTING
- Environmental Report
- Social Report
- Governance Report
- ESG Summary Report
- Custom Report Builder (filters + exports PDF/Excel/CSV)

PHASE 10 - DASHBOARD & ADMIN
- Organization Dashboard
- Settings & Administration
- Department hierarchy view
- Category management
- ESG Configuration UI
- Notification settings UI
*/

module.exports = {
  phases: {
    phase0: 'Auth & RBAC - Foundation',
    phase1: 'Master Data - 8 core entities',
    phase2: 'ESG Configuration - Business toggles',
    phase3: 'Carbon Transactions - Environmental engine',
    phase4: 'Social Module - CSR & Participation',
    phase5: 'Governance - Policies & Compliance',
    phase6: 'Gamification - Challenges & Rewards',
    phase7: 'Scoring Engine - Pillar scores',
    phase8: 'Notifications - Event-driven',
    phase9: 'Reporting - 5 report types',
    phase10: 'Dashboard & Admin - UI layer'
  }
};
