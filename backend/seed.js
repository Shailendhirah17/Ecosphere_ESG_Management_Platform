const db = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected.');

    const departments = [
      { id: 1, name: 'Engineering', code: 'ENG' },
      { id: 2, name: 'Human Resources', code: 'HR' },
      { id: 3, name: 'Marketing', code: 'MKT' },
      { id: 4, name: 'Sales', code: 'SLS' }
    ];

    for (const dept of departments) {
      await db.Department.findOrCreate({
        where: { id: dept.id },
        defaults: dept
      });
    }

    console.log('✅ Departments seeded successfully!');

    // Create demo users
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const demoUsers = [
      {
        name: 'Admin User',
        email: 'admin@ecosphere.com',
        password_hash: hashedPassword,
        department_id: 1,
        role: 'SuperAdmin',
        status: 'Active'
      },
      {
        name: 'Manager User',
        email: 'manager@ecosphere.com',
        password_hash: hashedPassword,
        department_id: 2,
        role: 'DepartmentHead',
        status: 'Active'
      },
      {
        name: 'Employee User',
        email: 'employee@ecosphere.com',
        password_hash: hashedPassword,
        department_id: 3,
        role: 'Employee',
        status: 'Active'
      },
      {
        name: 'Auditor User',
        email: 'auditor@ecosphere.com',
        password_hash: hashedPassword,
        department_id: 4,
        role: 'Auditor',
        status: 'Active'
      }
    ];

    for (const user of demoUsers) {
      await db.Employee.findOrCreate({
        where: { email: user.email },
        defaults: user
      });
    }

    console.log('✅ Demo users seeded successfully!');
    console.log('\n📋 Demo Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: admin@ecosphere.com');
    console.log('Password: demo123');
    console.log('Role: Super Admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: manager@ecosphere.com');
    console.log('Password: demo123');
    console.log('Role: Department Head');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: employee@ecosphere.com');
    console.log('Password: demo123');
    console.log('Role: Employee');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: auditor@ecosphere.com');
    console.log('Password: demo123');
    console.log('Role: Auditor');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
