const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // CSR Activities
  await prisma.cSRActivity.createMany({
    data: [
      { id: 'act-1', title: 'Community Beach Cleanup', category_id: 'cat-env', description: 'Join us to clean up the local beach.', start_date: new Date('2026-07-20'), end_date: new Date('2026-07-20'), capacity: 50, status: 'Active' },
      { id: 'act-2', title: 'Tech Mentorship for Youth', category_id: 'cat-edu', description: 'Mentor high school students in coding.', start_date: new Date('2026-08-01'), end_date: new Date('2026-10-01'), capacity: 20, status: 'Active' },
      { id: 'act-3', title: 'Food Drive', category_id: 'cat-soc', description: 'Collect canned goods for the homeless.', start_date: new Date('2026-09-15'), end_date: new Date('2026-09-17'), capacity: 100, status: 'Draft' }
    ]
  });

  // Policies
  await prisma.eSGPolicy.createMany({
    data: [
      { id: 'pol-1', title: 'Supplier Code of Conduct', version: '2.0', description: 'Rules for suppliers.', document_url: '/docs/pol1.pdf', mandatory_flag: true, effective_date: new Date('2025-01-01'), status: 'Published' },
      { id: 'pol-2', title: 'Anti-Bribery Policy', version: '1.5', description: 'Zero tolerance for bribery.', document_url: '/docs/pol2.pdf', mandatory_flag: true, effective_date: new Date('2024-06-01'), status: 'Published' },
      { id: 'pol-3', title: 'Remote Work Sustainability', version: '1.0', description: 'Guidelines for green remote work.', document_url: '/docs/pol3.pdf', mandatory_flag: false, effective_date: new Date('2026-02-01'), status: 'Draft' }
    ]
  });

  // Audits
  await prisma.audit.createMany({
    data: [
      { id: 'aud-1', audit_type: 'ISO 14001 Recertification', department_id: 'dept-1', scheduled_date: new Date('2026-08-15'), status: 'Scheduled', auditor: 'SGS Certification', scope: 'Full scope' },
      { id: 'aud-2', audit_type: 'Supply Chain Labor Rights', department_id: 'dept-2', scheduled_date: new Date('2026-05-10'), status: 'Completed', auditor: 'Internal Audit Team', scope: 'Tier 1 Suppliers', findings_summary: 'Minor non-conformity in working hours documentation.' }
    ]
  });

  // Issues
  await prisma.complianceIssue.createMany({
    data: [
      { id: 'iss-1', description: 'Missing wastewater permits for Facility B', severity: 'High', status: 'Open', due_date: new Date('2026-07-01'), owner_employee_id: 'emp-101', department_id: 'dept-3', reported_date: new Date('2026-06-15') },
      { id: 'iss-2', description: 'Incomplete supplier self-assessments', severity: 'Medium', status: 'Open', due_date: new Date('2026-08-30'), owner_employee_id: 'emp-205', department_id: 'dept-2', reported_date: new Date('2026-07-05') },
      { id: 'iss-3', description: 'Safety incident reporting delay', severity: 'Low', status: 'Resolved', due_date: new Date('2026-05-30'), owner_employee_id: 'emp-303', department_id: 'dept-4', reported_date: new Date('2026-05-10') }
    ]
  });

  // Challenges
  await prisma.challenge.createMany({
    data: [
      { id: 'chal-1', title: 'Bike to Work Month', description: 'Commute by bike for 20 days this month.', xp_value: 500, difficulty: 'Medium', status: 'Active', deadline: new Date('2026-07-31'), evidence_required: true },
      { id: 'chal-2', title: 'Zero Waste Lunch', description: 'Bring a zero-waste lunch to the office for a week.', xp_value: 150, difficulty: 'Easy', status: 'Active', deadline: new Date('2026-07-25'), evidence_required: false },
      { id: 'chal-3', title: 'Home Energy Audit', description: 'Complete a home energy audit and submit the report.', xp_value: 1000, difficulty: 'Hard', status: 'Draft', deadline: new Date('2026-09-30'), evidence_required: true }
    ]
  });

  // Badges
  await prisma.badge.createMany({
    data: [
      { id: 'bdg-1', name: 'Green Commuter', description: 'Logged 100 miles of sustainable commuting.', icon_url: '/icons/bike.svg', unlock_rule: 'Commute 100 miles' },
      { id: 'bdg-2', name: 'Waste Warrior', description: 'Participated in 3 zero-waste initiatives.', icon_url: '/icons/recycle.svg', unlock_rule: 'Complete 3 waste challenges' },
      { id: 'bdg-3', name: 'Community Leader', description: 'Organized a CSR activity.', icon_url: '/icons/users.svg', unlock_rule: 'Host CSR event' }
    ]
  });

  // Rewards
  await prisma.reward.createMany({
    data: [
      { id: 'rew-1', name: 'Extra PTO Day', description: 'Exchange your points for an extra day off.', points_required: 5000, stock: 10, status: 'Active' },
      { id: 'rew-2', name: '$50 Charity Donation', description: 'We will donate $50 to a charity of your choice.', points_required: 1500, stock: 100, status: 'Active' },
      { id: 'rew-3', name: 'Sustainable Swag Bag', description: 'Company branded reusable water bottle and tote bag.', points_required: 800, stock: 0, status: 'Active' }
    ]
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
