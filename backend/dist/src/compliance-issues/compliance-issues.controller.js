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
exports.ComplianceIssuesController = void 0;
const common_1 = require("@nestjs/common");
const compliance_issues_service_1 = require("./compliance-issues.service");
const create_compliance_issue_dto_1 = require("./dto/create-compliance-issue.dto");
const update_compliance_issue_dto_1 = require("./dto/update-compliance-issue.dto");
let ComplianceIssuesController = class ComplianceIssuesController {
    complianceIssuesService;
    constructor(complianceIssuesService) {
        this.complianceIssuesService = complianceIssuesService;
    }
    create(createComplianceIssueDto) {
        return this.complianceIssuesService.create(createComplianceIssueDto);
    }
    findAll() {
        return this.complianceIssuesService.findAll();
    }
    findOne(id) {
        return this.complianceIssuesService.findOne(+id);
    }
    update(id, updateComplianceIssueDto) {
        return this.complianceIssuesService.update(+id, updateComplianceIssueDto);
    }
    remove(id) {
        return this.complianceIssuesService.remove(+id);
    }
};
exports.ComplianceIssuesController = ComplianceIssuesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_compliance_issue_dto_1.CreateComplianceIssueDto]),
    __metadata("design:returntype", void 0)
], ComplianceIssuesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComplianceIssuesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceIssuesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_compliance_issue_dto_1.UpdateComplianceIssueDto]),
    __metadata("design:returntype", void 0)
], ComplianceIssuesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceIssuesController.prototype, "remove", null);
exports.ComplianceIssuesController = ComplianceIssuesController = __decorate([
    (0, common_1.Controller)('compliance-issues'),
    __metadata("design:paramtypes", [compliance_issues_service_1.ComplianceIssuesService])
], ComplianceIssuesController);
//# sourceMappingURL=compliance-issues.controller.js.map