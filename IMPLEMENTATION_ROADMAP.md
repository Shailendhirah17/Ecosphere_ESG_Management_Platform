# ECOSPHERE - IMPLEMENTATION ROADMAP & TECHNICAL SPECS

## Current Status: ✅ Foundation Ready

All Phase 0 and Phase 1 master data models, controllers, and routes are already implemented in your project.

---

## WHAT'S ALREADY BUILT ✅

### Backend
- ✅ Express.js server (Port 8000)
- ✅ Sequelize ORM with 22 models
- ✅ Auth endpoints (login, register, JWT)
- ✅ RBAC middleware
- ✅ 9 route modules with 60+ endpoints
- ✅ Service layer for business logic
- ✅ Error handling & validation
- ✅ MySQL database connection

### Frontend
- ✅ React app with Vite (Port 5173)
- ✅ React Router with protected routes
- ✅ Context API authentication
- ✅ Axios HTTP client with interceptors
- ✅ 4 pages (Login, Dashboard, Challenges, Leaderboard)
- ✅ Sidebar navigation
- ✅ Responsive Tailwind CSS
- ✅ Recharts for data visualization

### Database
- ✅ 22 models created
- ✅ All relationships configured
- ✅ Sequelize migrations ready

---

## REMAINING WORK BY PHASE

### PHASE 2 - ESG Configuration & Toggles ⏳
**Time Estimate:** 4-6 hours

**Tasks:**
1. ✅ Create `Setting` model (already exists)
2. Create `/admin/settings` controller endpoint
3. Build Settings form UI
   - Scoring weights sliders
   - 4 toggle switches
   - Validation (weights sum to 100%)
   - Save button
4. Wire toggles into:
   - Phase 3 auto-calculation
   - Phase 4 evidence requirement
   - Phase 6 badge auto-award
   - Phase 8 notifications

**Files to create/modify:**
```
backend/controllers/settingsController.js (NEW)
backend/routes/settingsRoutes.js (NEW)
frontend/pages/AdminSettingsPage.jsx (NEW)
frontend/components/ESGConfigForm.jsx (NEW)
```

---

### PHASE 3 - Carbon Transactions ⏳
**Time Estimate:** 8-10 hours

**Tasks:**
1. Create stub models:
   - `Purchase.js`
   - `Manufacturing.js`
   - `Expense.js`
   - `Fleet.js`

2. Create `CarbonCalculationEngine.js` service
   - Formula: CO2e = quantity × emission_factor_value
   - Trigger on creation if autoEmissionCalculation = true

3. Create Carbon Transaction controllers & routes:
   ```
   POST   /api/v1/carbon-transactions
   GET    /api/v1/carbon-transactions
   GET    /api/v1/departments/:id/emissions
   ```

4. Create Environmental Dashboard page
   - Total emissions KPI
   - Trend chart (last 12 months)
   - Goal progress bars
   - Top emitting departments table

**Files to create/modify:**
```
backend/models/Purchase.js (NEW)
backend/models/Manufacturing.js (NEW)
backend/models/Expense.js (NEW)
backend/models/Fleet.js (NEW)
backend/services/carbonCalculationService.js (NEW)
backend/controllers/carbonController.js (MODIFY)
frontend/pages/EnvironmentalPage.jsx (NEW)
frontend/components/EmissionDashboard.jsx (NEW)
```

---

### PHASE 4 - Social Module ⏳
**Time Estimate:** 6-8 hours

**Tasks:**
1. ✅ CSRActivity model exists
2. ✅ EmployeeParticipation model exists
3. Implement approval logic:
   - Check evidenceRequirement toggle
   - Validate proof attached if required
   - Credit points to XP wallet
   - Fire notification

4. Create Diversity Metrics dashboard
5. Create Social Score calculation
6. Create CSR Activities page UI

**Files to create/modify:**
```
backend/controllers/socialController.js (MODIFY - add approval logic)
backend/services/socialService.js (MODIFY - add evidence gate)
frontend/pages/SocialActivitiesPage.jsx (NEW)
frontend/pages/DiversityMetricsPage.jsx (NEW)
backend/controllers/scoringController.js (ADD social score calc)
```

---

### PHASE 5 - Governance Module ⏳
**Time Estimate:** 6-8 hours

**Tasks:**
1. ✅ PolicyAcknowledgement model exists
2. ✅ Audit model exists
3. ✅ ComplianceIssue model exists
4. Implement:
   - Policy acknowledgement workflow
   - Overdue detection (scheduled job or on-query)
   - Compliance Issue owner + due date validation
   - Governance Score calculation
5. Create Policy Acknowledgement page
6. Create Compliance Dashboard

**Files to create/modify:**
```
backend/controllers/governanceController.js (MODIFY)
backend/services/governanceService.js (NEW)
backend/jobs/complianceOverdueCheck.js (NEW - node-cron)
frontend/pages/GovernancePage.jsx (NEW)
frontend/pages/ComplianceDashboard.jsx (NEW)
backend/controllers/scoringController.js (ADD governance score calc)
```

---

### PHASE 6 - Gamification ⏳
**Time Estimate:** 10-12 hours

**Tasks:**
1. ✅ Challenge model exists
2. ✅ ChallengeParticipation model exists
3. ✅ Badge model exists
4. ✅ Reward model exists
5. Implement:
   - Challenge lifecycle validation
   - Challenge participation approval (with evidence gate)
   - XP/Points wallet management
   - Badge auto-award engine (event-driven)
   - Reward redemption with atomic stock decrement
6. Create Challenges page UI
7. Create Badge unlock logic
8. Create Reward shop page

**Files to create/modify:**
```
backend/services/gamificationService.js (MODIFY - add all logic)
backend/services/badgeAutoAwardService.js (NEW)
backend/services/rewardRedemptionService.js (NEW)
frontend/pages/ChallengesPage.jsx (MODIFY - enhance)
frontend/pages/BadgesPage.jsx (NEW)
frontend/pages/RewardShopPage.jsx (NEW)
```

---

### PHASE 7 - Scoring Engine ⏳
**Time Estimate:** 4-6 hours

**Tasks:**
1. ✅ DepartmentScore model exists
2. Implement scoring formulas:
   - Environmental Score
   - Social Score
   - Governance Score
   - Department Total Score
   - Overall ESG Score
3. Create recalculation service
4. Hook into PHASE 3, 4, 5, 6 events

**Files to create/modify:**
```
backend/services/scoringService.js (NEW)
backend/controllers/scoringController.js (NEW)
backend/routes/scoringRoutes.js (NEW)
backend/jobs/dailyScoringRecalculation.js (NEW)
```

---

### PHASE 8 - Notifications ⏳
**Time Estimate:** 4-6 hours

**Tasks:**
1. ✅ Notification model likely exists
2. Implement event triggers:
   - CSR/Challenge approvals
   - Badge unlocks
   - Policy acknowledgement reminders
   - Compliance overdue
3. Email sending via nodemailer
4. In-app notification display
5. Mark-as-read functionality

**Files to create/modify:**
```
backend/services/notificationService.js (NEW)
backend/jobs/sendNotifications.js (NEW)
frontend/components/NotificationCenter.jsx (NEW)
frontend/pages/NotificationsPage.jsx (NEW)
```

---

### PHASE 9 - Reporting ⏳
**Time Estimate:** 10-12 hours

**Tasks:**
1. Create report generators:
   - Environmental Report
   - Social Report
   - Governance Report
   - ESG Summary
   - Custom Report Builder
2. Export to PDF (pdfkit), Excel (exceljs), CSV
3. Create Reports UI pages

**Files to create/modify:**
```
backend/services/reportService.js (NEW)
backend/controllers/reportController.js (NEW)
backend/routes/reportRoutes.js (NEW)
backend/utils/exportUtils.js (NEW)
frontend/pages/ReportsPage.jsx (NEW)
frontend/pages/CustomReportBuilder.jsx (NEW)
```

---

### PHASE 10 - Dashboard & Admin ⏳
**Time Estimate:** 8-10 hours

**Tasks:**
1. Enhance Organization Dashboard
2. Create Admin Settings page
3. Department management UI
4. Category management UI
5. User role management UI
6. Notification settings UI

**Files to create/modify:**
```
frontend/pages/DashboardPage.jsx (ENHANCE)
frontend/pages/AdminDashboard.jsx (NEW)
frontend/pages/DepartmentManagement.jsx (NEW)
frontend/pages/CategoryManagement.jsx (NEW)
frontend/pages/UserManagement.jsx (NEW)
frontend/components/DepartmentHierarchy.jsx (NEW)
```

---

## ESTIMATED TIMELINE

```
Phase 2:  4-6 hours    ⏳
Phase 3:  8-10 hours   ⏳
Phase 4:  6-8 hours    ⏳
Phase 5:  6-8 hours    ⏳
Phase 6:  10-12 hours  ⏳
Phase 7:  4-6 hours    ⏳
Phase 8:  4-6 hours    ⏳
Phase 9:  10-12 hours  ⏳
Phase 10: 8-10 hours   ⏳

TOTAL:    60-78 hours (~2-2.5 weeks full-time)
```

---

## CURRENT DEPLOYMENT URLS

```
Frontend:   http://localhost:5173
Backend:    http://localhost:8000/api/v1
Health:     http://localhost:8000/health
```

---

## NEXT IMMEDIATE STEPS

1. Start Backend Phase 2 - Settings endpoints
2. Test with Postman
3. Build Frontend Phase 2 - Settings UI
4. Move to Phase 3 - Carbon module
5. Continue following the phase sequence

**The foundation is solid. Ready to build the remaining phases!** 🚀

