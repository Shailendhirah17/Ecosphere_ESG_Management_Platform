import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeWalletDto } from './create-employee-wallet.dto';

export class UpdateEmployeeWalletDto extends PartialType(CreateEmployeeWalletDto) {}
