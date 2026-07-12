import { Module } from '@nestjs/common';
import { EmployeeParticipationsService } from './employee-participations.service';
import { EmployeeParticipationsController } from './employee-participations.controller';

@Module({
  controllers: [EmployeeParticipationsController],
  providers: [EmployeeParticipationsService],
})
export class EmployeeParticipationsModule {}
