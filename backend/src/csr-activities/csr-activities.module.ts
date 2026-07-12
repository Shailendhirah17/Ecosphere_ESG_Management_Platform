import { Module } from '@nestjs/common';
import { CsrActivitiesService } from './csr-activities.service';
import { CsrActivitiesController } from './csr-activities.controller';

@Module({
  controllers: [CsrActivitiesController],
  providers: [CsrActivitiesService],
})
export class CsrActivitiesModule {}
