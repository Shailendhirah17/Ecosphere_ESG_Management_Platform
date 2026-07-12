import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DepartmentScoresService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.departmentScore.create({ data });
  }

  findAll() {
    return this.prisma.departmentScore.findMany();
  }

  findOne(id: string) {
    return this.prisma.departmentScore.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.departmentScore.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.departmentScore.delete({ where: { id } });
  }
}
