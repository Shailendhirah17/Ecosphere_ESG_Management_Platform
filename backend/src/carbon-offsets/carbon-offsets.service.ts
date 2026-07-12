import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarbonOffsetsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.carbonOffset.create({ data });
  }

  findAll() {
    return this.prisma.carbonOffset.findMany({ orderBy: { date_purchased: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.carbonOffset.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.carbonOffset.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.carbonOffset.delete({ where: { id } });
  }
}
