import { PartialType } from '@nestjs/mapped-types';
import { CreateCsrActivityDto } from './create-csr-activity.dto';

export class UpdateCsrActivityDto extends PartialType(CreateCsrActivityDto) {}
