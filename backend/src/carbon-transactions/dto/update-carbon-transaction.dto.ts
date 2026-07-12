import { PartialType } from '@nestjs/mapped-types';
import { CreateCarbonTransactionDto } from './create-carbon-transaction.dto';

export class UpdateCarbonTransactionDto extends PartialType(CreateCarbonTransactionDto) {}
