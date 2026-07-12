"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceIssuesModule = void 0;
const common_1 = require("@nestjs/common");
const compliance_issues_service_1 = require("./compliance-issues.service");
const compliance_issues_controller_1 = require("./compliance-issues.controller");
let ComplianceIssuesModule = class ComplianceIssuesModule {
};
exports.ComplianceIssuesModule = ComplianceIssuesModule;
exports.ComplianceIssuesModule = ComplianceIssuesModule = __decorate([
    (0, common_1.Module)({
        controllers: [compliance_issues_controller_1.ComplianceIssuesController],
        providers: [compliance_issues_service_1.ComplianceIssuesService],
    })
], ComplianceIssuesModule);
//# sourceMappingURL=compliance-issues.module.js.map