import { PartialType } from '@nestjs/mapped-types';
import { CreateChallengeParticipationDto } from './create-challenge-participation.dto';

export class UpdateChallengeParticipationDto extends PartialType(CreateChallengeParticipationDto) {}
