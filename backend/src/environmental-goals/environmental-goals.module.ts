import { Module } from '@nestjs/common';
import { EnvironmentalGoalsService } from './environmental-goals.service';
import { EnvironmentalGoalsController } from './environmental-goals.controller';

@Module({
  controllers: [EnvironmentalGoalsController],
  providers: [EnvironmentalGoalsService],
})
export class EnvironmentalGoalsModule {}
