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
exports.PolicyAcknowledgementsController = void 0;
const common_1 = require("@nestjs/common");
const policy_acknowledgements_service_1 = require("./policy-acknowledgements.service");
const create_policy_acknowledgement_dto_1 = require("./dto/create-policy-acknowledgement.dto");
const update_policy_acknowledgement_dto_1 = require("./dto/update-policy-acknowledgement.dto");
let PolicyAcknowledgementsController = class PolicyAcknowledgementsController {
    policyAcknowledgementsService;
    constructor(policyAcknowledgementsService) {
        this.policyAcknowledgementsService = policyAcknowledgementsService;
    }
    create(createPolicyAcknowledgementDto) {
        return this.policyAcknowledgementsService.create(createPolicyAcknowledgementDto);
    }
    findAll() {
        return this.policyAcknowledgementsService.findAll();
    }
    findOne(id) {
        return this.policyAcknowledgementsService.findOne(+id);
    }
    update(id, updatePolicyAcknowledgementDto) {
        return this.policyAcknowledgementsService.update(+id, updatePolicyAcknowledgementDto);
    }
    remove(id) {
        return this.policyAcknowledgementsService.remove(+id);
    }
};
exports.PolicyAcknowledgementsController = PolicyAcknowledgementsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_policy_acknowledgement_dto_1.CreatePolicyAcknowledgementDto]),
    __metadata("design:returntype", void 0)
], PolicyAcknowledgementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PolicyAcknowledgementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PolicyAcknowledgementsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_policy_acknowledgement_dto_1.UpdatePolicyAcknowledgementDto]),
    __metadata("design:returntype", void 0)
], PolicyAcknowledgementsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PolicyAcknowledgementsController.prototype, "remove", null);
exports.PolicyAcknowledgementsController = PolicyAcknowledgementsController = __decorate([
    (0, common_1.Controller)('policy-acknowledgements'),
    __metadata("design:paramtypes", [policy_acknowledgements_service_1.PolicyAcknowledgementsService])
], PolicyAcknowledgementsController);
//# sourceMappingURL=policy-acknowledgements.controller.js.map