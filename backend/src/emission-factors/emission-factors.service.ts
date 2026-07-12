import { Injectable } from '@nestjs/common';
import { CreateEmissionFactorDto } from './dto/create-emission-factor.dto';
import { UpdateEmissionFactorDto } from './dto/update-emission-factor.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmissionFactorsService {
  constructor(private prisma: PrismaService) {}

  create(createEmissionFactorDto: CreateEmissionFactorDto) {
    return this.prisma.emissionFactor.create({
      data: createEmissionFactorDto as any,
    });
  }

  findAll(activity_type?: string) {
    return this.prisma.emissionFactor.findMany({
      where: activity_type ? { activity_type } : undefined,
      orderBy: { effective_from: 'desc' }
    });
  }

  findOne(id: string) {
    return this.prisma.emissionFactor.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEmissionFactorDto: UpdateEmissionFactorDto) {
    return this.prisma.emissionFactor.update({
      where: { id },
      data: updateEmissionFactorDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.emissionFactor.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
  }
}
