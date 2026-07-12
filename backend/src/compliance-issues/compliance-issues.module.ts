import { Module } from '@nestjs/common';
import { ComplianceIssuesService } from './compliance-issues.service';
import { ComplianceIssuesController } from './compliance-issues.controller';

@Module({
  controllers: [ComplianceIssuesController],
  providers: [ComplianceIssuesService],
})
export class ComplianceIssuesModule {}
