import { PartialType } from '@nestjs/mapped-types';
import { CreatePolicyAcknowledgementDto } from './create-policy-acknowledgement.dto';

export class UpdatePolicyAcknowledgementDto extends PartialType(CreatePolicyAcknowledgementDto) {}
