import { Module } from '@nestjs/common';
import { PolicyAcknowledgementsService } from './policy-acknowledgements.service';
import { PolicyAcknowledgementsController } from './policy-acknowledgements.controller';

@Module({
  controllers: [PolicyAcknowledgementsController],
  providers: [PolicyAcknowledgementsService],
})
export class PolicyAcknowledgementsModule {}
