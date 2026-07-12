import { PartialType } from '@nestjs/mapped-types';
import { CreateEsgPolicyDto } from './create-esg-policy.dto';

export class UpdateEsgPolicyDto extends PartialType(CreateEsgPolicyDto) {}
