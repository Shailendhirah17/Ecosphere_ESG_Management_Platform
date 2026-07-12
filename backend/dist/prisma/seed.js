"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const dept1 = await prisma.department.upsert({
        where: { code: 'SUSTAIN-01' },
        update: {},
        create: {
            name: 'Sustainability Department',
            code: 'SUSTAIN-01',
            employee_count: 12,
        }
    });
    const dept2 = await prisma.department.upsert({
        where: { code: 'HR-01' },
        update: {},
        create: {
            name: 'Human Resources',
            code: 'HR-01',
            employee_count: 24,
        }
    });
    const ef1 = await prisma.emissionFactor.upsert({
        where: { id: 'ef1-mock-id' },
        update: {},
        create: {
            id: 'ef1-mock-id',
            name: 'Grid Electricity (US Average)',
            activity_type: 'Facility',
            unit: 'kWh',
            co2e_per_unit: 0.385,
            source: 'EPA 2023',
            effective_from: new Date('2023-01-01'),
        }
    });
    const ef2 = await prisma.emissionFactor.upsert({
        where: { id: 'ef2-mock-id' },
        update: {},
        create: {
            id: 'ef2-mock-id',
            name: 'Fleet Diesel',
            activity_type: 'Fleet',
            unit: 'Gallons',
            co2e_per_unit: 10.21,
            source: 'EPA 2023',
            effective_from: new Date('2023-01-01'),
        }
    });
    await prisma.environmentalGoal.deleteMany({});
    await prisma.environmentalGoal.create({
        data: {
            department_id: dept1.id,
            metric_type: 'Carbon Reduction',
            target_value: 5000,
            unit: 'tCO2e',
            target_date: new Date('2026-12-31'),
            baseline_value: 8500
        }
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map