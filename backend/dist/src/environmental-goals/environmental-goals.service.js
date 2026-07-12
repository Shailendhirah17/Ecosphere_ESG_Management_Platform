"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentalGoalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EnvironmentalGoalsService = class EnvironmentalGoalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createEnvironmentalGoalDto) {
        return this.prisma.environmentalGoal.create({
            data: createEnvironmentalGoalDto,
        });
    }
    async findAll() {
        const goals = await this.prisma.environmentalGoal.findMany({
            include: {
                department: true,
            },
            orderBy: { target_date: 'asc' }
        });
        const goalsWithProgress = await Promise.all(goals.map(async (goal) => {
            let current_value = 0;
            if (goal.department_id && (goal.metric_type === 'Carbon Reduction' || goal.unit === 'tCO2e')) {
                const aggregations = await this.prisma.carbonTransaction.aggregate({
                    where: {
                        department_id: goal.department_id,
                    },
                    _sum: {
                        calculated_co2e: true
                    }
                });
                current_value = aggregations._sum?.calculated_co2e || 0;
            }
            return {
                ...goal,
                current_value
            };
        }));
        return goalsWithProgress;
    }
    findOne(id) {
        return this.prisma.environmentalGoal.findUnique({
            where: { id },
            include: { department: true }
        });
    }
    update(id, updateEnvironmentalGoalDto) {
        return this.prisma.environmentalGoal.update({
            where: { id },
            data: updateEnvironmentalGoalDto,
        });
    }
    remove(id) {
        return this.prisma.environmentalGoal.delete({
            where: { id },
        });
    }
};
exports.EnvironmentalGoalsService = EnvironmentalGoalsService;
exports.EnvironmentalGoalsService = EnvironmentalGoalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnvironmentalGoalsService);
//# sourceMappingURL=environmental-goals.service.js.map