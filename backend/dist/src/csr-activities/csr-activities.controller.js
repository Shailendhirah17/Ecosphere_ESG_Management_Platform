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
exports.CsrActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const csr_activities_service_1 = require("./csr-activities.service");
const create_csr_activity_dto_1 = require("./dto/create-csr-activity.dto");
const update_csr_activity_dto_1 = require("./dto/update-csr-activity.dto");
let CsrActivitiesController = class CsrActivitiesController {
    csrActivitiesService;
    constructor(csrActivitiesService) {
        this.csrActivitiesService = csrActivitiesService;
    }
    create(createCsrActivityDto) {
        return this.csrActivitiesService.create(createCsrActivityDto);
    }
    findAll() {
        return this.csrActivitiesService.findAll();
    }
    findOne(id) {
        return this.csrActivitiesService.findOne(+id);
    }
    update(id, updateCsrActivityDto) {
        return this.csrActivitiesService.update(+id, updateCsrActivityDto);
    }
    remove(id) {
        return this.csrActivitiesService.remove(+id);
    }
};
exports.CsrActivitiesController = CsrActivitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_csr_activity_dto_1.CreateCsrActivityDto]),
    __metadata("design:returntype", void 0)
], CsrActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CsrActivitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CsrActivitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_csr_activity_dto_1.UpdateCsrActivityDto]),
    __metadata("design:returntype", void 0)
], CsrActivitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CsrActivitiesController.prototype, "remove", null);
exports.CsrActivitiesController = CsrActivitiesController = __decorate([
    (0, common_1.Controller)('csr-activities'),
    __metadata("design:paramtypes", [csr_activities_service_1.CsrActivitiesService])
], CsrActivitiesController);
//# sourceMappingURL=csr-activities.controller.js.map