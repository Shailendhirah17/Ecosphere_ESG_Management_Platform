import { PartialType } from '@nestjs/mapped-types';
import { CreateEmissionFactorDto } from './create-emission-factor.dto';

export class UpdateEmissionFactorDto extends PartialType(CreateEmissionFactorDto) {}
