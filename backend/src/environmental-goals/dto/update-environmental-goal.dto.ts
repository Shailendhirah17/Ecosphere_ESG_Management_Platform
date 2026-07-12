import { PartialType } from '@nestjs/mapped-types';
import { CreateEnvironmentalGoalDto } from './create-environmental-goal.dto';

export class UpdateEnvironmentalGoalDto extends PartialType(CreateEnvironmentalGoalDto) {}
