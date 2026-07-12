import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeParticipationDto } from './create-employee-participation.dto';

export class UpdateEmployeeParticipationDto extends PartialType(CreateEmployeeParticipationDto) {}
