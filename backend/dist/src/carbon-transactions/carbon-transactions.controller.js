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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonTransactionsController = void 0;
const common_1 = require("@nestjs/common");
const carbon_transactions_service_1 = require("./carbon-transactions.service");
const create_carbon_transaction_dto_1 = require("./dto/create-carbon-transaction.dto");
const update_carbon_transaction_dto_1 = require("./dto/update-carbon-transaction.dto");
let CarbonTransactionsController = class CarbonTransactionsController {
    carbonTransactionsService;
    constructor(carbonTransactionsService) {
        this.carbonTransactionsService = carbonTransactionsService;
    }
    create(createCarbonTransactionDto) {
        return this.carbonTransactionsService.create(createCarbonTransactionDto);
    }
    autoCalculate(data) {
        return this.carbonTransactionsService.autoCalculate(data);
    }
    findAll() {
        return this.carbonTransactionsService.findAll();
    }
    findOne(id) {
        return this.carbonTransactionsService.findOne(id);
    }
    update(id, updateCarbonTransactionDto) {
        return this.carbonTransactionsService.update(id, updateCarbonTransactionDto);
    }
    remove(id) {
        return this.carbonTransactionsService.remove(id);
    }
};
exports.CarbonTransactionsController = CarbonTransactionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_carbon_transaction_dto_1.CreateCarbonTransactionDto]),
    __metadata("design:returntype", void 0)
], CarbonTransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('auto-calculate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarbonTransactionsController.prototype, "autoCalculate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarbonTransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarbonTransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_carbon_transaction_dto_1.UpdateCarbonTransactionDto]),
    __metadata("design:returntype", void 0)
], CarbonTransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarbonTransactionsController.prototype, "remove", null);
exports.CarbonTransactionsController = CarbonTransactionsController = __decorate([
    (0, common_1.Controller)('carbon-transactions'),
    __metadata("design:paramtypes", [carbon_transactions_service_1.CarbonTransactionsService])
], CarbonTransactionsController);
//# sourceMappingURL=carbon-transactions.controller.js.map