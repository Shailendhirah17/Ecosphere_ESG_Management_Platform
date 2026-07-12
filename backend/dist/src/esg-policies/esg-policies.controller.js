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
exports.EsgPoliciesController = void 0;
const common_1 = require("@nestjs/common");
const esg_policies_service_1 = require("./esg-policies.service");
const create_esg_policy_dto_1 = require("./dto/create-esg-policy.dto");
const update_esg_policy_dto_1 = require("./dto/update-esg-policy.dto");
let EsgPoliciesController = class EsgPoliciesController {
    esgPoliciesService;
    constructor(esgPoliciesService) {
        this.esgPoliciesService = esgPoliciesService;
    }
    create(createEsgPolicyDto) {
        return this.esgPoliciesService.create(createEsgPolicyDto);
    }
    findAll() {
        return this.esgPoliciesService.findAll();
    }
    findOne(id) {
        return this.esgPoliciesService.findOne(+id);
    }
    update(id, updateEsgPolicyDto) {
        return this.esgPoliciesService.update(+id, updateEsgPolicyDto);
    }
    remove(id) {
        return this.esgPoliciesService.remove(+id);
    }
};
exports.EsgPoliciesController = EsgPoliciesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_esg_policy_dto_1.CreateEsgPolicyDto]),
    __metadata("design:returntype", void 0)
], EsgPoliciesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EsgPoliciesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EsgPoliciesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_esg_policy_dto_1.UpdateEsgPolicyDto]),
    __metadata("design:returntype", void 0)
], EsgPoliciesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EsgPoliciesController.prototype, "remove", null);
exports.EsgPoliciesController = EsgPoliciesController = __decorate([
    (0, common_1.Controller)('esg-policies'),
    __metadata("design:paramtypes", [esg_policies_service_1.EsgPoliciesService])
], EsgPoliciesController);
//# sourceMappingURL=esg-policies.controller.js.map