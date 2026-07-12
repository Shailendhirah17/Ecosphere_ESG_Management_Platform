const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning existing data...');
  // Delete in reverse order of foreign keys
  await prisma.carbonTransaction.deleteMany();
  await prisma.employeeParticipation.deleteMany();
  await prisma.challengeParticipation.deleteMany();
  await prisma.policyAcknowledgement.deleteMany();
  await prisma.complianceIssue.deleteMany();
  await prisma.audit.deleteMany();
  await prisma.departmentScore.deleteMany();
  await prisma.environmentalGoal.deleteMany();
  await prisma.cSRActivity.deleteMany();
  await prisma.challenge.deleteMany();
  
  await prisma.employeeWallet.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.eSGPolicy.deleteMany();
  await prisma.emissionFactor.deleteMany();
  await prisma.category.deleteMany();
  await prisma.department.deleteMany();

  console.log('Seeding Master Data...');
  
  // 1. Departments
  const engDept = await prisma.department.create({ data: { name: 'Engineering', code: 'ENG-01', head_employee_id: 'emp-001', employee_count: 150, status: 'ACTIVE' }});
  const salesDept = await prisma.department.create({ data: { name: 'Sales & Marketing', code: 'SAL-01', head_employee_id: 'emp-002', employee_count: 85, status: 'ACTIVE' }});
  const opsDept = await prisma.department.create({ data: { name: 'Operations', code: 'OPS-01', head_employee_id: 'emp-003', employee_count: 220, status: 'ACTIVE' }});

  // 2. Categories
  const catEnv = await prisma.category.create({ data: { name: 'Environmental', type: 'CSR_ACTIVITY' }});
  const catEdu = await prisma.category.create({ data: { name: 'Education', type: 'CSR_ACTIVITY' }});
  const catChal = await prisma.category.create({ data: { name: 'Commuting', type: 'CHALLENGE' }});

  // 3. Emission Factors
  const efElec = await prisma.emissionFactor.create({ data: { name: 'Grid Electricity (US Average)', activity_type: 'Facility', unit: 'kWh', co2e_per_unit: 0.385, source: 'EPA 2023', effective_from: new Date('2023-01-01') }});
  const efFleet = await prisma.emissionFactor.create({ data: { name: 'Fleet Diesel', activity_type: 'Fleet', unit: 'Gallons', co2e_per_unit: 10.21, source: 'EPA 2023', effective_from: new Date('2023-01-01') }});
  const efAir = await prisma.emissionFactor.create({ data: { name: 'Commercial Air Travel', activity_type: 'Travel', unit: 'Passenger Mile', co2e_per_unit: 0.133, source: 'EPA 2023', effective_from: new Date('2023-01-01') }});

  console.log('Seeding Environmental...');
  
  // 4. Carbon Transactions
  await prisma.carbonTransaction.createMany({
    data: [
      { department_id: engDept.id, source_type: 'Facility', source_record_id: 'util-jan-26', emission_factor_id: efElec.id, quantity: 12000, calculated_co2e: 12000 * 0.385, calculation_mode: 'Auto', transaction_date: new Date('2026-01-15'), created_by: 'system' },
      { department_id: opsDept.id, source_type: 'Fleet', source_record_id: 'fleet-jan-26', emission_factor_id: efFleet.id, quantity: 4500, calculated_co2e: 4500 * 10.21, calculation_mode: 'Auto', transaction_date: new Date('2026-01-20'), created_by: 'system' },
      { department_id: salesDept.id, source_type: 'Travel', source_record_id: 'exp-feb-26', emission_factor_id: efAir.id, quantity: 85000, calculated_co2e: 85000 * 0.133, calculation_mode: 'Auto', transaction_date: new Date('2026-02-10'), created_by: 'system' },
      { department_id: engDept.id, source_type: 'Facility', source_record_id: 'util-feb-26', emission_factor_id: efElec.id, quantity: 11500, calculated_co2e: 11500 * 0.385, calculation_mode: 'Auto', transaction_date: new Date('2026-02-15'), created_by: 'system' },
      { department_id: opsDept.id, source_type: 'Fleet', source_record_id: 'fleet-feb-26', emission_factor_id: efFleet.id, quantity: 4200, calculated_co2e: 4200 * 10.21, calculation_mode: 'Auto', transaction_date: new Date('2026-02-20'), created_by: 'system' },
    ]
  });

  // 5. Environmental Goals
  await prisma.environmentalGoal.createMany({
    data: [
      { department_id: null, metric_type: 'Carbon Reduction', target_value: 50000, unit: 'tCO2e', target_date: new Date('2030-12-31'), baseline_value: 85000, status: 'ACTIVE' },
      { department_id: opsDept.id, metric_type: 'Waste Diversion', target_value: 90, unit: '%', target_date: new Date('2027-12-31'), baseline_value: 45, status: 'ACTIVE' },
    ]
  });

  console.log('Seeding Social & Gamification...');

  // 6. CSR Activities
  const csr1 = await prisma.cSRActivity.create({ data: { title: 'Community Beach Cleanup', category_id: catEnv.id, description: 'Join us to clean up the local beach.', department_id: engDept.id, location: 'Santa Monica Pier', start_date: new Date('2026-07-20'), end_date: new Date('2026-07-20'), capacity: 50, status: 'Active' }});
  const csr2 = await prisma.cSRActivity.create({ data: { title: 'Tech Mentorship for Youth', category_id: catEdu.id, description: 'Mentor high school students in coding.', department_id: engDept.id, location: 'Downtown Library', start_date: new Date('2026-08-01'), end_date: new Date('2026-10-01'), capacity: 20, status: 'Active' }});

  // 7. Employee Participation
  await prisma.employeeParticipation.createMany({
    data: [
      { employee_id: 'emp-001', activity_id: csr1.id, approval_status: 'Approved', points_earned: 500, completion_date: new Date('2026-07-20'), approved_by: 'admin' },
      { employee_id: 'emp-002', activity_id: csr1.id, approval_status: 'Pending', points_earned: 0 },
      { employee_id: 'emp-003', activity_id: csr2.id, approval_status: 'Approved', points_earned: 1000, completion_date: new Date('2026-10-01'), approved_by: 'admin' },
    ]
  });

  // 8. Policies
  const pol1 = await prisma.eSGPolicy.create({ data: { title: 'Supplier Code of Conduct', category: 'Governance', version: '2.0', document_url: '/docs/pol1.pdf', mandatory_flag: true, effective_date: new Date('2025-01-01'), status: 'Published' }});
  const pol2 = await prisma.eSGPolicy.create({ data: { title: 'Anti-Bribery Policy', category: 'Governance', version: '1.5', document_url: '/docs/pol2.pdf', mandatory_flag: true, effective_date: new Date('2024-06-01'), status: 'Published' }});

  // 9. Policy Acknowledgements
  await prisma.policyAcknowledgement.createMany({
    data: [
      { policy_id: pol1.id, employee_id: 'emp-001', acknowledged_date: new Date('2026-01-05'), status: 'Acknowledged' },
      { policy_id: pol1.id, employee_id: 'emp-002', status: 'Pending', reminder_count: 2 },
      { policy_id: pol2.id, employee_id: 'emp-003', acknowledged_date: new Date('2026-02-15'), status: 'Acknowledged' },
    ]
  });

  console.log('Seeding Governance...');

  // 10. Audits
  const audit1 = await prisma.audit.create({ data: { department_id: opsDept.id, audit_type: 'ISO 14001 Recertification', scheduled_date: new Date('2026-08-15'), status: 'Scheduled', auditor: 'SGS Certification' }});
  const audit2 = await prisma.audit.create({ data: { department_id: salesDept.id, audit_type: 'Supply Chain Labor Rights', scheduled_date: new Date('2026-05-10'), completed_date: new Date('2026-05-15'), status: 'Completed', auditor: 'Internal Audit Team', findings_summary: 'Minor non-conformity in working hours documentation.' }});

  // 11. Compliance Issues
  await prisma.complianceIssue.createMany({
    data: [
      { audit_id: audit1.id, description: 'Missing wastewater permits for Facility B', severity: 'Critical', status: 'Open', due_date: new Date('2026-07-01'), owner_employee_id: 'emp-003', raised_date: new Date('2026-06-15') },
      { audit_id: audit2.id, description: 'Incomplete supplier self-assessments', severity: 'Medium', status: 'In Progress', due_date: new Date('2026-08-30'), owner_employee_id: 'emp-002', raised_date: new Date('2026-07-05') },
    ]
  });

  console.log('Seeding Gamification Engine...');

  // 12. Challenges
  const chal1 = await prisma.challenge.create({ data: { title: 'Bike to Work Month', category_id: catChal.id, description: 'Commute by bike for 20 days this month.', xp_value: 500, difficulty: 'Medium', status: 'Active', deadline: new Date('2026-07-31'), evidence_required: true }});
  const chal2 = await prisma.challenge.create({ data: { title: 'Zero Waste Lunch', category_id: catEnv.id, description: 'Bring a zero-waste lunch to the office for a week.', xp_value: 150, difficulty: 'Easy', status: 'Active', deadline: new Date('2026-07-25'), evidence_required: false }});

  // 13. Challenge Participations
  await prisma.challengeParticipation.createMany({
    data: [
      { challenge_id: chal1.id, employee_id: 'emp-001', progress_pct: 100, approval_status: 'Approved', xp_awarded: 500, submitted_date: new Date('2026-07-31') },
      { challenge_id: chal1.id, employee_id: 'emp-002', progress_pct: 45, approval_status: 'Pending', xp_awarded: 0 },
    ]
  });

  // 14. Badges
  await prisma.badge.createMany({
    data: [
      { name: 'Green Commuter', description: 'Logged 100 miles of sustainable commuting.', icon: 'bike', unlock_rule_type: 'CUSTOM', unlock_rule_value: 100, status: 'ACTIVE' },
      { name: 'Waste Warrior', description: 'Participated in 3 zero-waste initiatives.', icon: 'recycle', unlock_rule_type: 'CHALLENGE_COUNT', unlock_rule_value: 3, status: 'ACTIVE' },
    ]
  });

  // 15. Rewards
  await prisma.reward.createMany({
    data: [
      { name: 'Extra PTO Day', description: 'Exchange your points for an extra day off.', points_required: 5000, stock: 10, status: 'ACTIVE' },
      { name: '$50 Charity Donation', description: 'We will donate $50 to a charity of your choice.', points_required: 1500, stock: 100, status: 'ACTIVE' },
      { name: 'Sustainable Swag Bag', description: 'Company branded reusable water bottle and tote bag.', points_required: 800, stock: 0, status: 'ACTIVE' },
    ]
  });

  // 16. Employee Wallets
  await prisma.employeeWallet.createMany({
    data: [
      { employee_id: 'emp-001', balance: 5000, lifetime_earned: 8500 },
      { employee_id: 'emp-002', balance: 1500, lifetime_earned: 1500 },
      { employee_id: 'emp-003', balance: 12500, lifetime_earned: 22000 },
    ]
  });

  console.log('Seed completed successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
