import { Module } from '@nestjs/common';
import { DepartmentScoresService } from './department-scores.service';
import { DepartmentScoresController } from './department-scores.controller';

@Module({
  controllers: [DepartmentScoresController],
  providers: [DepartmentScoresService],
})
export class DepartmentScoresModule {}
