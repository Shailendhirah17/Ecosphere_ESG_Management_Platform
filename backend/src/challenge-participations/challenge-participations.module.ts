import { Module } from '@nestjs/common';
import { ChallengeParticipationsService } from './challenge-participations.service';
import { ChallengeParticipationsController } from './challenge-participations.controller';

@Module({
  controllers: [ChallengeParticipationsController],
  providers: [ChallengeParticipationsService],
})
export class ChallengeParticipationsModule {}
