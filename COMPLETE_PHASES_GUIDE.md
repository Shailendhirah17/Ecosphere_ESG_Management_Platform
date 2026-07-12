# ECOSPHERE - COMPLETE 10-PHASE IMPLEMENTATION GUIDE

## 🎯 MASTER BUILD GUIDE

This document provides the complete end-to-end flow for building EcoSphere following the exact phase sequence. Each phase builds on the previous, matching the actual business workflow.

---

## ⚡ QUICK START

```bash
# Terminal 1: Backend
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/backend"
npm run dev

# Terminal 2: Frontend  
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/frontend"
npm run dev

# Browser
http://localhost:5173
```

---

## PHASE 0 - FOUNDATION & AUTH ✅

**What to build:**
- User authentication (Login/Register)
- Role-Based Access Control (RBAC): Admin, Department Manager, Employee
- Audit fields on all entities: `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `Status`

**Key files:**
- `backend/controllers/authController.js` - Authentication endpoints
- `backend/middleware/authMiddleware.js` - Auth & RBAC validation
- `backend/models/Employee.js` - User/employee model with roles

**API Endpoints:**
```
POST   /api/v1/auth/register        - Create new account
POST   /api/v1/auth/login           - User login
POST   /api/v1/auth/refresh-token   - Refresh JWT token
```

**Status:** ✅ IMPLEMENTED

---

## PHASE 1 - MASTER DATA LAYER ✅

**8 Core Master Entities:**

### 1. Department (Hierarchical)
```
Fields: Name, Code, Head, Parent Department, Employee Count, Status
Model: backend/models/Department.js
CRUD: /api/v1/departments
```

### 2. Category
```
Fields: Name, Type (CSR Activity / Challenge), Status
Model: backend/models/Category.js
CRUD: /api/v1/categories
```

### 3. Emission Factor
```
Fields: Fuel/Activity Type, Unit, CO2e Value, Effective Date Range
Model: backend/models/EmissionFactor.js
CRUD: /api/v1/emission-factors
```

### 4. Product ESG Profile
```
Fields: Product Name, Linked Emission Factor(s), Sustainability Attributes
Model: backend/models/ProductESGProfile.js
CRUD: /api/v1/products
```

### 5. Environmental Goal
```
Fields: Target Metric, Target Value, Timeframe, Department Scope
Model: backend/models/EnvironmentalGoal.js
CRUD: /api/v1/goals
```

### 6. ESG Policy
```
Fields: Title, Body/Document, Category, Version, Effective Date, Status
Model: backend/models/ESGPolicy.js
CRUD: /api/v1/policies
```

### 7. Badge
```
Fields: Name, Description, Unlock Rule (machine-evaluable), Icon
Model: backend/models/Badge.js
CRUD: /api/v1/badges
Example Rule: {"type": "xp_threshold", "value": 500}
```

### 8. Reward
```
Fields: Name, Description, Points Required, Stock, Status
Model: backend/models/Reward.js
CRUD: /api/v1/rewards
Stock: Decrements on redemption, must be atomic
```

**Status:** ✅ IMPLEMENTED

---

## PHASE 2 - ESG CONFIGURATION & TOGGLES ⏳

**Build Settings Screen:**

### Configuration Parameters
```javascript
{
  // Scoring Weights (must sum to 100%)
  environmentalWeight: 40,
  socialWeight: 30,
  governanceWeight: 30,

  // Toggle Switches
  autoEmissionCalculation: true,      // Auto-generate Carbon Transactions
  evidenceRequirement: true,           // Force proof on CSR/Challenge approval
  badgeAutoAward: true,                // Auto-award badges when conditions met
  
  // Notification Toggles
  notifyOnCSRApproval: true,
  notifyOnChallengeCompletion: true,
  notifyOnBadgeUnlock: true,
  notifyOnPolicyDue: true,
  notifyOnComplianceOverdue: true
}
```

**Model:** `backend/models/Setting.js`
**API:** `POST /api/v1/settings`, `GET /api/v1/settings`
**UI:** Settings panel in Admin area

**Business Rules:**
- Weights must sum to 100% (validation)
- Toggling `autoEmissionCalculation` ON triggers processing of pending transactions
- Toggling `evidenceRequirement` ON prevents future approvals without proof
- Toggling `badgeAutoAward` ON evaluates all badges immediately

**Status:** ⏳ TO DO

---

## PHASE 3 - CARBON TRANSACTIONS (ENVIRONMENTAL ENGINE) ⏳

**Source Records → Carbon Transaction Flow**

### Source Records (Minimal stubs)
```
1. Purchase
   Fields: Date, Product (link to ProductESGProfile), Quantity, Department

2. Manufacturing
   Fields: Date, Product, Quantity, Department

3. Expense
   Fields: Date, Description, Amount, Category, Department

4. Fleet
   Fields: Vehicle Type, Fuel Type, Mileage, Department
```

### Carbon Transaction
```
Model: backend/models/CarbonTransaction.js
Fields:
  - Source Type (Purchase/Manufacturing/Expense/Fleet)
  - Source ID
  - Emission Factor (link)
  - Quantity
  - CO2e (calculated)
  - Department
  - Date
  - Status
```

### Auto-Calculation Engine
```
Formula: CO2e = source_quantity × emission_factor.value

Trigger:
- IF autoEmissionCalculation = true
  - When Purchase/Manufacturing/Expense/Fleet created
  - Find matching Emission Factor
  - Auto-create Carbon Transaction
  - Mark as "Completed"
- ELSE
  - Manual "Add Carbon Transaction" form required
```

**API Endpoints:**
```
POST   /api/v1/carbon-transactions    - Manual add
GET    /api/v1/carbon-transactions    - List
GET    /api/v1/departments/:id/emissions - Department total

POST   /api/v1/purchases              - Create purchase (triggers auto-calc)
POST   /api/v1/manufacturing          - Create manufacturing
POST   /api/v1/expenses               - Create expense
POST   /api/v1/fleet                  - Create fleet record
```

**Acceptance Criteria:**
- Creating a Purchase with `autoEmissionCalculation=true` auto-generates a Carbon Transaction
- Carbon Transaction is immediately queryable
- Total emissions aggregates correctly by department

**Status:** ⏳ TO DO

---

## PHASE 4 - SOCIAL MODULE ⏳

### 4.1 CSR Activity
```
Model: backend/models/CSRActivity.js
Fields: Title, Category (link), Description, Department, Date, Status
Statuses: Draft, Active, Completed, Archived
```

### 4.2 Employee Participation (CSR)
```
Model: backend/models/EmployeeParticipation.js
Fields:
  - Employee (link)
  - CSR Activity (link)
  - Proof (file upload/URL)
  - Approval Status (Pending/Approved/Rejected)
  - Points Earned
  - Completion Date

Approval Logic:
  IF evidenceRequirement = true AND proof is empty
    DENY approval
  ELSE IF approval clicked
    Credit Points to employee XP/Points wallet
    Fire notification (if enabled)
    Update status to "Approved"
```

### 4.3 Diversity Metrics
```
Dashboard showing:
  - Headcount by Gender (pie chart)
  - Headcount by Age Group (bar chart)
  - Headcount by Department (breakdown)
  - Simple aggregation (no workflow entity needed)
```

### 4.4 Training Completion
```
Model: backend/models/TrainingCompletion.js (new, if not exists)
Fields: Employee, Training Name, Completion Date, Status
Note: Supports Social scoring
```

### 4.5 Social Score Calculation
```
Formula (per department):
  Participation Rate = (approved_participations / total_employees) × 100
  Social Score = Participation Rate (0-100 scale)
  
Persist in: DepartmentScore.socialScore
Recalculate: On every participation approval or on-demand
```

**API Endpoints:**
```
POST   /api/v1/csr-activities         - Create CSR activity
GET    /api/v1/csr-activities         - List activities
POST   /api/v1/participations         - Employee joins activity
POST   /api/v1/participations/:id/approve  - Manager approves
GET    /api/v1/departments/:id/metrics - Diversity metrics
GET    /api/v1/departments/:id/social-score - Social score
```

**Status:** ⏳ TO DO

---

## PHASE 5 - GOVERNANCE MODULE ⏳

### 5.1 Policy Acknowledgement
```
Model: backend/models/PolicyAcknowledgement.js
Fields:
  - Employee (link)
  - ESG Policy (link)
  - Acknowledged Date
  - Status (Pending/Acknowledged/Overdue)

Workflow:
  1. Admin creates ESG Policy
  2. System auto-creates PolicyAcknowledgement records for all employees
  3. Employee receives reminder notification
  4. Employee clicks "I acknowledge"
  5. Status moves to "Acknowledged"
  6. If not acknowledged by effective date + grace period → "Overdue"
```

### 5.2 Audits
```
Model: backend/models/Audit.js
Fields:
  - Scope (Department / Organizational)
  - Department (link, if Scope=Department)
  - Auditor (Employee link)
  - Date
  - Findings Summary
  - Status (Planned/In Progress/Completed)
```

### 5.3 Compliance Issues
```
Model: backend/models/ComplianceIssue.js (already exists)
Fields:
  - Audit (link)
  - Severity (Critical/High/Medium/Low)
  - Description
  - Owner (mandatory)
  - Due Date (mandatory)
  - Status (Open/In Progress/Closed)

Validation:
  - Cannot save without Owner and Due Date

Overdue Logic:
  IF Status = "Open" AND Due Date < Today
    THEN flag "Overdue"
    THEN fire notification (if enabled)
    THEN update visual indicator
```

### 5.4 Governance Score
```
Formula (per department):
  Unresolved Issues = count of (Status != "Closed")
  Closed Issues = count of (Status = "Closed")
  Closure Rate = (Closed Issues / Total Issues) × 100
  Governance Score = Closure Rate (0-100 scale)
  
Persist in: DepartmentScore.governanceScore
Recalculate: On every issue status change or on-demand
```

**API Endpoints:**
```
POST   /api/v1/policies/:id/acknowledge       - Employee acknowledges
GET    /api/v1/policies/acknowledgements      - User's acknowledgements
POST   /api/v1/audits                         - Create audit
POST   /api/v1/audits/:id/start               - Start audit
POST   /api/v1/compliance-issues              - Create compliance issue
PUT    /api/v1/compliance-issues/:id          - Update issue
GET    /api/v1/departments/:id/governance-score - Governance score
GET    /api/v1/compliance-issues/overdue      - Flagged overdue items
```

**Acceptance Criteria:**
- Policy acknowledgement without an owner cannot be saved
- An overdue open issue is visibly flagged
- Overdue compliance issue fires a notification

**Status:** ⏳ TO DO

---

## PHASE 6 - GAMIFICATION MODULE ⏳

### 6.1 Challenges
```
Model: backend/models/Challenge.js
Fields:
  - Title
  - Category (link)
  - Description
  - XP (reward)
  - Difficulty (Easy/Medium/Hard)
  - Evidence Required (boolean)
  - Deadline
  - Status (Draft/Active/Under Review/Completed/Archived)

Lifecycle:
  Draft → Active → Under Review → Completed
  (Archived reachable from any state)

Validation:
  - Cannot move to Active without at least one required field
  - Can only approve when Status = Under Review
```

### 6.2 Challenge Participation
```
Model: backend/models/ChallengeParticipation.js
Fields:
  - Challenge (link)
  - Employee (link)
  - Progress (0-100%)
  - Proof (file/URL)
  - Approval Status (Pending/Approved/Rejected)
  - XP Awarded
  - Completion Date

Approval Logic:
  IF Challenge.evidenceRequired = true AND Proof is empty
    DENY approval (same as CSR evidence gate)
  ELSE
    Award XP to employee wallet
    Move to "Approved"
    Fire notification
```

### 6.3 XP/Points Wallet
```
Model: backend/models/EmployeeXPWallet.js (new) or add fields to Employee
Fields (per employee):
  - Total XP
  - Total Points
  - Level (derived: level = floor(XP / 100))

Sources:
  - CSR Participation Approval → adds Points
  - Challenge Participation Approval → adds XP
  - Badge Unlock → bonus XP (optional)

Note: Clarify in your use case whether Points and XP are:
  (A) Unified currency (Points) - redemption uses Points, leaderboard uses XP
  (B) Separate currencies - XP for leaderboard, Points for redemption
  Recommend: (A) - simpler, use "Points" for both
```

### 6.4 Badge Auto-Award
```
Unlock Rule (machine-evaluable JSON):
{
  "type": "xp_threshold",
  "value": 500
  // other examples:
  // {"type": "challenges_completed", "value": 5}
  // {"type": "csr_participations", "value": 10}
}

Event-Driven Logic:
  WHENEVER employee XP/challenge/participation changes:
    FOR each Badge where unlock_rule matches employee stats:
      IF not already awarded:
        Award badge (create EmployeeBadge record)
        Fire "Badge Unlocked" notification (if enabled)

IF badgeAutoAward = false:
  Skip automatic evaluation; admins must manually assign
```

### 6.5 Reward Redemption
```
Model: backend/models/RewardRedemption.js
Flow:
  1. Employee clicks "Redeem Reward"
  2. Validate: Stock > 0 AND Employee.Points >= Reward.pointsRequired
  3. IF valid:
       Decrement Reward.Stock by 1
       Deduct Employee.Points by Reward.pointsRequired
       Create RewardRedemption record with timestamp
       Mark as "Completed"
  4. IF invalid:
       Return error (insufficient stock / insufficient points)

Atomicity:
  Wrap stock decrement + points deduct in a database transaction
  to avoid race conditions on limited stock
```

### 6.6 Leaderboard
```
Model: Derived (no persistence needed, calculate on query)
Query Logic:
  Rank employees by (Total Points DESC, Total XP DESC)
  Filterable by:
    - Department
    - Time Period (This Week / This Month / All Time)
  Return: Top 100 with rank, name, points, xp, badge count, title

Visualization:
  - Gold/Silver/Bronze medals for top 3
  - Badge icons next to names
  - Hover → see employee details
```

**API Endpoints:**
```
POST   /api/v1/challenges                    - Create challenge (admin)
PUT    /api/v1/challenges/:id                - Update challenge
POST   /api/v1/challenges/:id/activate       - Move to Active
GET    /api/v1/challenges                    - List active challenges
POST   /api/v1/challenges/:id/participate    - Employee joins
POST   /api/v1/challenge-participation/:id/submit - Submit proof
POST   /api/v1/challenge-participation/:id/approve - Manager approves
GET    /api/v1/employee/xp-wallet            - Get employee XP/Points
GET    /api/v1/rewards                       - List available rewards
POST   /api/v1/rewards/:id/redeem            - Redeem reward (atomic)
GET    /api/v1/badges                        - List all badges
GET    /api/v1/employee/badges               - My badges
GET    /api/v1/leaderboard?department=X&period=month - Leaderboard
```

**Acceptance Criteria:**
- Redeeming with insufficient stock/points is rejected
- Badge auto-awarded the instant unlock condition is met (when toggle ON)
- Leaderboard ranks correctly by points desc, xp desc

**Status:** ⏳ TO DO

---

## PHASE 7 - SCORING ENGINE ⏳

### 7.1 Pillar Score Formulas

**Environmental Score (0-100)**
```
Formula:
  Total Emission Target = sum(all EnvironmentalGoal.targetValue)
  Actual Emissions = sum(all CarbonTransaction.co2e)
  Achievement Rate = (Total Emission Target - Actual Emissions) / Total Emission Target × 100
  Environmental Score = max(0, min(100, Achievement Rate))
  
Note: If actual emissions < target, score approaches 100 (good)
      If actual emissions > target, score decreases
```

**Social Score (0-100)**
```
Formula:
  Total CSR Participations (approved) = count
  Total Employees = count
  Participation Rate = (Total CSR Participations / Total Employees) × 100
  Social Score = max(0, min(100, Participation Rate))
  
Note: Encourages broad participation
```

**Governance Score (0-100)**
```
Formula:
  Total Compliance Issues = count
  Closed Compliance Issues = count where Status = "Closed"
  Closure Rate = (Closed / Total) × 100
  Governance Score = max(0, min(100, Closure Rate))
  
Note: Emphasizes issue resolution
```

### 7.2 Department Total Score
```
Formula:
  Department Total Score = 
    (Environmental Score × env_weight%) +
    (Social Score × social_weight%) +
    (Governance Score × governance_weight%)
  
  Using settings from PHASE 2 (default 40/30/30)

Persist:
  Create DepartmentScore record:
  {
    department_id,
    environmentalScore,
    socialScore,
    governanceScore,
    totalScore,
    calculatedAt
  }
```

### 7.3 Overall ESG Score
```
Formula (Organization-wide):
  Option A: Simple Average
    Overall = average(all DepartmentScore.totalScore)
  
  Option B: Weighted by Employee Count
    Overall = sum(dept_score × dept_employee_count) / total_employees
  
  Recommend: Option B (weighs larger departments higher)

Persist:
  Store in Setting or new OrganizationScore table
```

### 7.4 Recalculation Trigger
```
Recalculate on:
  - Every CSR participation approval
  - Every challenge completion
  - Every compliance issue status change
  - Every carbon transaction creation
  - Scheduled job (nightly or on-demand via API)

API Endpoint:
  POST /api/v1/scores/recalculate
  
Optimization:
  Only recalculate affected department (not all)
```

**API Endpoints:**
```
GET    /api/v1/departments/:id/score          - Single department score
GET    /api/v1/departments/scores             - All departments scored
GET    /api/v1/organization/esg-score         - Overall ESG score
POST   /api/v1/scores/recalculate             - Trigger recalculation
GET    /api/v1/departments/rankings           - Ranked by score (desc)
```

**Status:** ⏳ TO DO

---

## PHASE 8 - NOTIFICATION SYSTEM ⏳

### Event Types to Notify On

```javascript
{
  "event_type": "csr_approval_approved",
  "template": "Your CSR activity '{activity_name}' was approved! You earned {points} points.",
  "channels": ["in_app", "email"]  // depending on toggle
}

{
  "event_type": "csr_approval_rejected",
  "template": "Your CSR activity '{activity_name}' was rejected. Reason: {reason}",
  "channels": ["in_app", "email"]
}

{
  "event_type": "challenge_approved",
  "template": "You completed challenge '{challenge_name}'! +{xp} XP",
  "channels": ["in_app", "email"]
}

{
  "event_type": "badge_unlocked",
  "template": "🏆 Badge Unlocked: {badge_name} - {badge_description}",
  "channels": ["in_app", "email"]
}

{
  "event_type": "policy_acknowledgement_due",
  "template": "Please acknowledge ESG Policy '{policy_name}' by {due_date}",
  "channels": ["in_app", "email"]
}

{
  "event_type": "compliance_issue_overdue",
  "template": "Compliance Issue '{issue_description}' is overdue. Owner: {owner}",
  "channels": ["in_app", "email"]
}

{
  "event_type": "new_compliance_issue",
  "template": "New Compliance Issue: {issue_description} (Severity: {severity})",
  "channels": ["in_app", "email"]
}
```

### Notification Model
```
Model: backend/models/Notification.js
Fields:
  - Employee (recipient)
  - Event Type
  - Message
  - Read Status
  - Channel (in_app / email)
  - Created At

Query:
  GET /api/v1/notifications            - Get my unread notifications
  PUT /api/v1/notifications/:id/read   - Mark as read
  GET /api/v1/notifications/all        - Historical
```

### Send Logic
```
Trigger on every event:
  1. Check PHASE 2 settings toggle
  2. IF toggle ON:
       - Create Notification record (channel = in_app)
       - IF email_enabled: send email via nodemailer
       - IF webhook_enabled: POST to webhook
  3. User sees notification in sidebar / modal
```

**Status:** ⏳ TO DO

---

## PHASE 9 - REPORTING MODULE ⏳

### 5 Report Types

#### 1. Environmental Report
```
Filters:
  - Department
  - Date Range
  - Emission Factor Type

Data:
  - Total CO2e by department
  - Breakdown by source type (Purchase/Manufacturing/Expense/Fleet)
  - Goal vs. actual progress
  - Trend (last 12 months)
  - Top 5 emission sources

Export: PDF, Excel, CSV
```

#### 2. Social Report
```
Filters:
  - Department
  - Date Range
  - Activity Category

Data:
  - Total CSR participations
  - Participation rate %
  - Diversity breakdown (gender, age, dept)
  - Training completion rate
  - Top 10 participants

Export: PDF, Excel, CSV
```

#### 3. Governance Report
```
Filters:
  - Department
  - Date Range
  - Severity

Data:
  - Open compliance issues
  - Closed compliance issues
  - Overdue issues count
  - Issues by department
  - Issues by severity
  - Closure rate %
  - Average resolution time

Export: PDF, Excel, CSV
```

#### 4. ESG Summary Report
```
Combines all three pillars:
  - Org Environmental Score
  - Org Social Score
  - Org Governance Score
  - Overall ESG Score
  - Department rankings
  - Trend over time (6 months)
  - Key metrics summary

Export: PDF, Excel, CSV
```

#### 5. Custom Report Builder
```
UI Steps:
  1. Select Modules (checkbox): Environmental, Social, Governance
  2. Select Filters:
     - Department (multi-select)
     - Date Range (date picker)
     - Employee (for CSR/Challenge breakdown)
     - Category (CSR Activity / Challenge)
  3. Select Metrics (checkboxes per module)
  4. Choose Export Format (PDF / Excel / CSV)
  5. Generate + Download

Data Aggregation:
  Build query dynamically based on filter + metric selections
  Return merged result set
```

**API Endpoints:**
```
GET    /api/v1/reports/environmental          - Environmental report
GET    /api/v1/reports/social                 - Social report
GET    /api/v1/reports/governance             - Governance report
GET    /api/v1/reports/esg-summary            - Combined ESG report
POST   /api/v1/reports/custom                 - Custom report builder
GET    /api/v1/reports/custom/:id/export?format=pdf|excel|csv - Download
```

**Status:** ⏳ TO DO

---

## PHASE 10 - DASHBOARD & ADMINISTRATION ⏳

### 10.1 Organization Dashboard
```
Main Dashboard Screen (protected by Admin/Viewer role):

Widgets:
  1. Overall ESG Score (large KPI card)
     - Current score
     - Trend (↑/↓)
     - Target
  
  2. Pillar Breakdown (3 KPI cards)
     - Environmental Score & trend
     - Social Score & trend
     - Governance Score & trend
  
  3. Department Rankings (table)
     - Rank, Department, Total Score, Trend
     - Click → drill into department details
  
  4. Recent Activities (timeline)
     - CSR approvals, Challenges completed, Badges unlocked (last 5)
  
  5. Compliance Issues (summary)
     - Total, Open, Overdue, By Severity
  
  6. Trends (line chart)
     - ESG Score over time (last 6 months)
  
  7. Top Performers (leaderboard preview)
     - Top 5 employees by points
```

### 10.2 Settings & Administration
```
Admin Panel Tabs:

Tab 1: Departments
  - Department tree/hierarchy
  - CRUD operations
  - Employee count per department
  - Department Head assignment

Tab 2: Categories
  - Create/edit/delete categories
  - Assign to CSR Activities / Challenges

Tab 3: Emission Factors
  - CRUD for emission factors
  - Link to products

Tab 4: ESG Configuration (Phase 2)
  - Edit scoring weights
  - Toggle switches (4 toggles)
  - Save with validation (weights sum to 100%)

Tab 5: Notifications Settings
  - Per-event notification toggles
  - Channel selection (in_app / email)
  - Email configuration (SMTP settings)

Tab 6: Users & Roles
  - List employees
  - Assign/change roles
  - Deactivate users
```

### 10.3 Feature: Department Hierarchy View
```
Visualize departments as:
  - Tree structure (expandable)
  - Org chart (visual diagram)
  - Table with parent references
  
Each department card shows:
  - Department name
  - Head name
  - Employee count
  - ESG Score
```

**Frontend Pages:**
```
/dashboard                    - Organization dashboard
/admin/settings              - Settings & configuration
/admin/departments           - Department management
/admin/categories            - Category management
/admin/emission-factors      - Emission factors
/admin/users                 - User management
/admin/notifications         - Notification settings
```

**Status:** ⏳ TO DO

---

## 📊 BUILD CHECKLIST

```
Phase 0 (Foundation)
  ☑ Auth endpoints (login, register, refresh)
  ☑ RBAC middleware
  ☑ Audit fields on all models

Phase 1 (Master Data)
  ☑ Department (with parent ref)
  ☑ Category
  ☑ Emission Factor
  ☑ Product ESG Profile
  ☑ Environmental Goal
  ☑ ESG Policy
  ☑ Badge
  ☑ Reward

Phase 2 (Configuration)
  ☑ Settings model
  ☑ Configuration CRUD endpoints
  ☑ UI: Settings form with toggles
  ☑ Validation: weights sum to 100%

Phase 3 (Carbon)
  ☑ Purchase, Manufacturing, Expense, Fleet stubs
  ☑ Carbon Transaction model
  ☑ Auto-calculation engine
  ☑ Department carbon tracking

Phase 4 (Social)
  ☑ CSR Activity
  ☑ Employee Participation
  ☑ Evidence gate on approval
  ☑ Diversity Metrics dashboard
  ☑ Training Completion (optional)
  ☑ Social Score calculation

Phase 5 (Governance)
  ☑ Policy Acknowledgement workflow
  ☑ Audits
  ☑ Compliance Issues (with overdue flag)
  ☑ Governance Score calculation
  ☑ Overdue notifications

Phase 6 (Gamification)
  ☑ Challenge with lifecycle
  ☑ Challenge Participation
  ☑ XP/Points wallet
  ☑ Badge auto-award (event-driven)
  ☑ Reward redemption (atomic)
  ☑ Leaderboard

Phase 7 (Scoring)
  ☑ Environmental Score formula
  ☑ Social Score formula
  ☑ Governance Score formula
  ☑ Department Total Score
  ☑ Overall ESG Score
  ☑ Recalculation endpoint

Phase 8 (Notifications)
  ☑ Notification model & table
  ☑ Event-triggered sending
  ☑ In-app notification display
  ☑ Email sending (nodemailer)
  ☑ Settings toggles

Phase 9 (Reports)
  ☑ Environmental Report
  ☑ Social Report
  ☑ Governance Report
  ☑ ESG Summary Report
  ☑ Custom Report Builder
  ☑ PDF/Excel/CSV export

Phase 10 (Dashboard & Admin)
  ☑ Organization Dashboard UI
  ☑ Settings & Admin panel
  ☑ Department hierarchy view
  ☑ Category management UI
  ☑ User role management UI
```

---

## 🚀 NEXT STEPS

1. **Review this document** - Understand all 10 phases
2. **Start Phase 0-1 APIs** - Auth and master data endpoints
3. **Build in order** - Each phase depends on the previous
4. **Test each phase** - Use Postman/curl before moving on
5. **Frontend UI** - Build UI after backend APIs are stable

**Happy building!** 🎉

