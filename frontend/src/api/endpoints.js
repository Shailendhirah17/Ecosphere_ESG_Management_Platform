import axiosInstance from './axiosInstance';

// Auth API - Phase 0
export const authAPI = {
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }),
  register: (data) => axiosInstance.post('/auth/register', data),
  refreshToken: () => axiosInstance.post('/auth/refresh-token')
};

// Employee API - Phase 0-1
export const employeeAPI = {
  getAllEmployees: () => axiosInstance.get('/employees'),
  getEmployeeById: (id) => axiosInstance.get(`/employees/${id}`),
  createEmployee: (data) => axiosInstance.post('/employees', data),
  updateEmployee: (id, data) => axiosInstance.put(`/employees/${id}`, data),
  getLeaderboard: () => axiosInstance.get('/employees/leaderboard/all'),
  awardBadge: (data) => axiosInstance.post('/employees/award-badge', data),
  addXP: (data) => axiosInstance.post('/employees/add-xp', data),
  addPoints: (data) => axiosInstance.post('/employees/add-points', data)
};

// Department API - Phase 0-1
export const departmentAPI = {
  getAll: () => axiosInstance.get('/departments'),
  getAllDepartments: () => axiosInstance.get('/departments'),
  getDepartmentById: (id) => axiosInstance.get(`/departments/${id}`),
  createDepartment: (data) => axiosInstance.post('/departments', data),
  updateDepartment: (id, data) => axiosInstance.put(`/departments/${id}`, data),
  calculateScores: (id) => axiosInstance.post(`/departments/${id}/calculate-scores`),
  getDepartmentStats: (id) => axiosInstance.get(`/departments/${id}/stats`)
};

// Environmental API - Phase 3
export const environmentalAPI = {
  createCarbonTransaction: (data) => axiosInstance.post('/environmental/carbon-transactions', data),
  getCarbonTransactions: (deptId) => axiosInstance.get(`/environmental/departments/${deptId}/transactions`),
  getAllCarbonTransactions: (filters) => axiosInstance.get('/environmental/carbon-transactions', { params: filters }),
  getCarbonTransactionById: (id) => axiosInstance.get(`/environmental/carbon-transactions/${id}`),
  getTotalEmissionsByDepartment: (departmentId, startDate, endDate) => 
    axiosInstance.get(`/environmental/departments/${departmentId}/total-emissions`, { 
      params: { start_date: startDate, end_date: endDate } 
    }),
  createEmissionFactor: (data) => axiosInstance.post('/environmental/emission-factors', data),
  getAllEmissionFactors: () => axiosInstance.get('/environmental/emission-factors'),
  getEmissionFactorById: (id) => axiosInstance.get(`/environmental/emission-factors/${id}`),
  updateEmissionFactor: (id, data) => axiosInstance.put(`/environmental/emission-factors/${id}`, data)
};

// Social API - Phase 4
export const socialAPI = {
  createActivity: (data) => axiosInstance.post('/social/activities', data),
  createCSRActivity: (data) => axiosInstance.post('/social/activities', data),
  getActivities: (deptId) => axiosInstance.get(`/social/departments/${deptId}/activities`),
  getAllCSRActivities: (filters) => axiosInstance.get('/social/activities', { params: filters }),
  getCSRActivityById: (id) => axiosInstance.get(`/social/activities/${id}`),
  joinCSRActivity: (data) => axiosInstance.post('/social/participate', data),
  approveParticipation: (participationId) => axiosInstance.post(`/social/participations/${participationId}/approve`),
  rejectParticipation: (participationId, data) => axiosInstance.post(`/social/participations/${participationId}/reject`, data),
  getEmployeeParticipations: (employeeId) => axiosInstance.get(`/social/employees/${employeeId}/participations`),
  getCSRStatistics: (departmentId) => axiosInstance.get(`/social/departments/${departmentId}/statistics`)
};

// Gamification API - Phase 6
export const gamificationAPI = {
  createChallenge: (data) => axiosInstance.post('/gamification/challenges', data),
  getAllChallenges: (filters) => axiosInstance.get('/gamification/challenges', { params: filters }),
  getChallengeById: (id) => axiosInstance.get(`/gamification/challenges/${id}`),
  joinChallenge: (data) => axiosInstance.post('/gamification/join', data),
  submitChallengeProof: (data) => axiosInstance.post('/gamification/submit-proof', data),
  approveChallengeCompletion: (participationId) => axiosInstance.post(`/gamification/participations/${participationId}/approve`),
  rejectChallengeCompletion: (participationId, data) => axiosInstance.post(`/gamification/participations/${participationId}/reject`, data),
  getEmployeeChallenges: (employeeId) => axiosInstance.get(`/gamification/employees/${employeeId}/challenges`),
  getActiveChallengesForEmployee: (employeeId) => axiosInstance.get(`/gamification/employees/${employeeId}/active-challenges`),
  getChallengeLeaderboard: (challengeId) => axiosInstance.get(`/gamification/challenges/${challengeId}/leaderboard`),
  getGamificationStats: (employeeId) => axiosInstance.get(`/gamification/employees/${employeeId}/stats`)
};

// Settings API - Phase 2
export const settings = {
  getSettings: () => axiosInstance.get('/settings'),
  getSetting: (key) => axiosInstance.get(`/settings/${key}`),
  updateSettings: (data) => axiosInstance.put('/settings', data)
};

// Scoring API - Phase 7
export const scoring = {
  calculateScore: (deptId) => axiosInstance.post(`/scoring/${deptId}/calculate`),
  getScoreHistory: (deptId) => axiosInstance.get(`/scoring/${deptId}/history`),
  getScoreTrends: (deptId) => axiosInstance.get(`/scoring/${deptId}/trends`),
  recalculateAll: () => axiosInstance.post('/scoring/recalculate/all'),
  getBenchmarks: () => axiosInstance.get('/scoring/benchmarks')
};

// Notifications API - Phase 8
export const notifications = {
  getNotifications: (employeeId) => axiosInstance.get(`/notifications/employee/${employeeId}`),
  markAsRead: (notificationId) => axiosInstance.put(`/notifications/${notificationId}/read`),
  getUnreadCount: (employeeId) => axiosInstance.get(`/notifications/employee/${employeeId}/unread`),
  sendBulk: (data) => axiosInstance.post('/notifications/bulk', data),
  cleanup: () => axiosInstance.post('/notifications/cleanup')
};

// Reports API - Phase 9
export const reports = {
  generateCarbonReport: (data) => axiosInstance.post('/reports/carbon', data),
  generateScorecardReport: (data) => axiosInstance.post('/reports/scorecard', data),
  generateEngagementReport: (data) => axiosInstance.post('/reports/engagement', data),
  getAvailableReports: () => axiosInstance.get('/reports/available')
};

// Dashboard API - Phase 10
export const dashboard = {
  getOrgDashboard: () => axiosInstance.get('/reports/org-dashboard'),
  getDepartmentDashboard: (deptId) => axiosInstance.get(`/reports/department/${deptId}`),
  getEmployeeDashboard: (employeeId) => axiosInstance.get(`/reports/employee/${employeeId}`),
  getLeaderboard: (params) => axiosInstance.get('/reports/leaderboard', { params }),
  getAnalytics: (params) => axiosInstance.get('/reports/analytics', { params })
};

// Admin API - Phase 10
export const admin = {
  getAdminPanel: () => axiosInstance.get('/admin/panel'),
  getSystemHealth: () => axiosInstance.get('/admin/health'),
  updateSystemSettings: (data) => axiosInstance.put('/admin/settings', data),
  getDepartmentHierarchy: () => axiosInstance.get('/admin/departments/hierarchy'),
  getAuditLogs: (params) => axiosInstance.get('/admin/logs', { params }),
  syncAllScores: () => axiosInstance.post('/admin/scores/sync'),
  getUserManagement: (params) => axiosInstance.get('/admin/users', { params }),
  bulkUpdateUserRoles: (data) => axiosInstance.put('/admin/users/roles', data),
  bulkAssignBadges: (data) => axiosInstance.post('/admin/badges/assign', data),
  exportOrgData: (format) => axiosInstance.get('/admin/export', { params: { format } })
};

// Governance API - Phase 5
export const governance = {
  createComplianceIssue: (data) => axiosInstance.post('/governance/compliance/issues', data),
  getComplianceIssues: () => axiosInstance.get('/governance/compliance/issues'),
  updateComplianceIssue: (id, data) => axiosInstance.put(`/governance/compliance/issues/${id}`, data),
  getOverdueIssues: () => axiosInstance.get('/governance/compliance/overdue'),
  acknowledgePolicy: (data) => axiosInstance.post('/governance/policies/acknowledge', data),
  getPolicyStatus: (policyId) => axiosInstance.get(`/governance/policies/${policyId}/status`),
  createAudit: (data) => axiosInstance.post('/governance/audits', data),
  getAudits: () => axiosInstance.get('/governance/audits')
};

// Combined API export for easy access
export const api = {
  auth: authAPI,
  employees: employeeAPI,
  departments: departmentAPI,
  environmental: environmentalAPI,
  social: socialAPI,
  gamification: gamificationAPI,
  settings,
  scoring,
  notifications,
  reports,
  dashboard,
  admin,
  governance
};
