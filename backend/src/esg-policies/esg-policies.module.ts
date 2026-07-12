import { Module } from '@nestjs/common';
import { EsgPoliciesService } from './esg-policies.service';
import { EsgPoliciesController } from './esg-policies.controller';

@Module({
  controllers: [EsgPoliciesController],
  providers: [EsgPoliciesService],
})
export class EsgPoliciesModule {}
