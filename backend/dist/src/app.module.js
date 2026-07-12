"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const departments_module_1 = require("./departments/departments.module");
const emission_factors_module_1 = require("./emission-factors/emission-factors.module");
const carbon_transactions_module_1 = require("./carbon-transactions/carbon-transactions.module");
const prisma_module_1 = require("./prisma.module");
const environmental_goals_module_1 = require("./environmental-goals/environmental-goals.module");
const categories_module_1 = require("./categories/categories.module");
const csr_activities_module_1 = require("./csr-activities/csr-activities.module");
const employee_participations_module_1 = require("./employee-participations/employee-participations.module");
const esg_policies_module_1 = require("./esg-policies/esg-policies.module");
const policy_acknowledgements_module_1 = require("./policy-acknowledgements/policy-acknowledgements.module");
const audits_module_1 = require("./audits/audits.module");
const compliance_issues_module_1 = require("./compliance-issues/compliance-issues.module");
const challenges_module_1 = require("./challenges/challenges.module");
const challenge_participations_module_1 = require("./challenge-participations/challenge-participations.module");
const badges_module_1 = require("./badges/badges.module");
const rewards_module_1 = require("./rewards/rewards.module");
const employee_wallets_module_1 = require("./employee-wallets/employee-wallets.module");
const department_scores_module_1 = require("./department-scores/department-scores.module");
const kudos_module_1 = require("./kudos/kudos.module");
const carbon_offsets_module_1 = require("./carbon-offsets/carbon-offsets.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [departments_module_1.DepartmentsModule, emission_factors_module_1.EmissionFactorsModule, carbon_transactions_module_1.CarbonTransactionsModule, environmental_goals_module_1.EnvironmentalGoalsModule, prisma_module_1.PrismaModule, categories_module_1.CategoriesModule, csr_activities_module_1.CsrActivitiesModule, employee_participations_module_1.EmployeeParticipationsModule, esg_policies_module_1.EsgPoliciesModule, policy_acknowledgements_module_1.PolicyAcknowledgementsModule, audits_module_1.AuditsModule, compliance_issues_module_1.ComplianceIssuesModule, challenges_module_1.ChallengesModule, challenge_participations_module_1.ChallengeParticipationsModule, badges_module_1.BadgesModule, rewards_module_1.RewardsModule, employee_wallets_module_1.EmployeeWalletsModule, department_scores_module_1.DepartmentScoresModule, kudos_module_1.KudosModule, carbon_offsets_module_1.CarbonOffsetsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map