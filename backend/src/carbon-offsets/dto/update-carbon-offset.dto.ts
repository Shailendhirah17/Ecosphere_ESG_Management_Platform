import { PartialType } from '@nestjs/mapped-types';
import { CreateCarbonOffsetDto } from './create-carbon-offset.dto';

export class UpdateCarbonOffsetDto extends PartialType(CreateCarbonOffsetDto) {}
