import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentsModule } from './departments/departments.module';
import { EmissionFactorsModule } from './emission-factors/emission-factors.module';
import { CarbonTransactionsModule } from './carbon-transactions/carbon-transactions.module';
import { PrismaModule } from './prisma.module';
import { EnvironmentalGoalsModule } from './environmental-goals/environmental-goals.module';
import { CategoriesModule } from './categories/categories.module';
import { CsrActivitiesModule } from './csr-activities/csr-activities.module';
import { EmployeeParticipationsModule } from './employee-participations/employee-participations.module';
import { EsgPoliciesModule } from './esg-policies/esg-policies.module';
import { PolicyAcknowledgementsModule } from './policy-acknowledgements/policy-acknowledgements.module';
import { AuditsModule } from './audits/audits.module';
import { ComplianceIssuesModule } from './compliance-issues/compliance-issues.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ChallengeParticipationsModule } from './challenge-participations/challenge-participations.module';
import { BadgesModule } from './badges/badges.module';
import { RewardsModule } from './rewards/rewards.module';
import { EmployeeWalletsModule } from './employee-wallets/employee-wallets.module';
import { DepartmentScoresModule } from './department-scores/department-scores.module';
import { KudosModule } from './kudos/kudos.module';

@Module({
  imports: [DepartmentsModule, EmissionFactorsModule, CarbonTransactionsModule, EnvironmentalGoalsModule, PrismaModule, CategoriesModule, CsrActivitiesModule, EmployeeParticipationsModule, EsgPoliciesModule, PolicyAcknowledgementsModule, AuditsModule, ComplianceIssuesModule, ChallengesModule, ChallengeParticipationsModule, BadgesModule, RewardsModule, EmployeeWalletsModule, DepartmentScoresModule, KudosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
