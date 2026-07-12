import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentScoreDto } from './create-department-score.dto';

export class UpdateDepartmentScoreDto extends PartialType(CreateDepartmentScoreDto) {}
