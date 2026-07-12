import { Module } from '@nestjs/common';
import { CarbonOffsetsService } from './carbon-offsets.service';
import { CarbonOffsetsController } from './carbon-offsets.controller';

@Module({
  controllers: [CarbonOffsetsController],
  providers: [CarbonOffsetsService],
})
export class CarbonOffsetsModule {}
