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
exports.CarbonOffsetsController = void 0;
const common_1 = require("@nestjs/common");
const carbon_offsets_service_1 = require("./carbon-offsets.service");
let CarbonOffsetsController = class CarbonOffsetsController {
    carbonOffsetsService;
    constructor(carbonOffsetsService) {
        this.carbonOffsetsService = carbonOffsetsService;
    }
    create(createCarbonOffsetDto) {
        return this.carbonOffsetsService.create(createCarbonOffsetDto);
    }
    findAll() {
        return this.carbonOffsetsService.findAll();
    }
    findOne(id) {
        return this.carbonOffsetsService.findOne(id);
    }
    update(id, updateCarbonOffsetDto) {
        return this.carbonOffsetsService.update(id, updateCarbonOffsetDto);
    }
    remove(id) {
        return this.carbonOffsetsService.remove(id);
    }
};
exports.CarbonOffsetsController = CarbonOffsetsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarbonOffsetsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarbonOffsetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarbonOffsetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CarbonOffsetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarbonOffsetsController.prototype, "remove", null);
exports.CarbonOffsetsController = CarbonOffsetsController = __decorate([
    (0, common_1.Controller)('carbon-offsets'),
    __metadata("design:paramtypes", [carbon_offsets_service_1.CarbonOffsetsService])
], CarbonOffsetsController);
//# sourceMappingURL=carbon-offsets.controller.js.map