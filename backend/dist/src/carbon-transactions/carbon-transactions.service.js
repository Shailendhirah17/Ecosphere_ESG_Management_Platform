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
exports.CarbonTransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CarbonTransactionsService = class CarbonTransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createCarbonTransactionDto) {
        return this.prisma.carbonTransaction.create({
            data: createCarbonTransactionDto,
        });
    }
    async autoCalculate(data) {
        const { department_id, source_type, source_record_id, activity_type, quantity, transaction_date, created_by } = data;
        const factor = await this.prisma.emissionFactor.findFirst({
            where: {
                activity_type,
                status: 'ACTIVE',
                effective_from: { lte: new Date(transaction_date) },
            },
            orderBy: { effective_from: 'desc' }
        });
        if (!factor) {
            throw new common_1.NotFoundException(`No active emission factor found for activity type: ${activity_type}`);
        }
        const calculated_co2e = quantity * factor.co2e_per_unit;
        return this.prisma.carbonTransaction.create({
            data: {
                department_id,
                source_type,
                source_record_id,
                emission_factor_id: factor.id,
                quantity,
                calculated_co2e,
                calculation_mode: 'Auto',
                transaction_date: new Date(transaction_date),
                created_by
            }
        });
    }
    findAll() {
        return this.prisma.carbonTransaction.findMany({
            include: {
                department: true,
                emission_factor: true
            },
            orderBy: { transaction_date: 'desc' }
        });
    }
    findOne(id) {
        return this.prisma.carbonTransaction.findUnique({
            where: { id },
            include: {
                department: true,
                emission_factor: true
            }
        });
    }
    update(id, updateCarbonTransactionDto) {
        return this.prisma.carbonTransaction.update({
            where: { id },
            data: updateCarbonTransactionDto,
        });
    }
    remove(id) {
        return this.prisma.carbonTransaction.delete({
            where: { id },
        });
    }
};
exports.CarbonTransactionsService = CarbonTransactionsService;
exports.CarbonTransactionsService = CarbonTransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarbonTransactionsService);
//# sourceMappingURL=carbon-transactions.service.js.map