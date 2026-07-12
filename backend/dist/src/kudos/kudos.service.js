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
exports.KudosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const MAX_KUDOS_PER_MONTH = 5;
let KudosService = class KudosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const count = await this.prisma.kudos.count({
            where: {
                sender_id: data.sender_id,
                sent_date: { gte: startOfMonth }
            }
        });
        if (count >= MAX_KUDOS_PER_MONTH) {
            throw new common_1.BadRequestException(`Monthly limit of ${MAX_KUDOS_PER_MONTH} kudos reached.`);
        }
        return this.prisma.kudos.create({ data });
    }
    findAll() {
        return this.prisma.kudos.findMany({ orderBy: { sent_date: 'desc' } });
    }
    findOne(id) {
        return this.prisma.kudos.findUnique({ where: { id } });
    }
    update(id, updateKudosDto) {
        return `This action updates a #${id} kudos`;
    }
    remove(id) {
        return `This action removes a #${id} kudos`;
    }
};
exports.KudosService = KudosService;
exports.KudosService = KudosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KudosService);
//# sourceMappingURL=kudos.service.js.map