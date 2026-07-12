import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChallengesService { 
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.challenge.create({ data });
  }

  findAll() {
    return this.prisma.challenge.findMany({
      include: { category: true }
    });
  }

  findOne(id: string) {
    return this.prisma.challenge.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.challenge.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.challenge.delete({ where: { id } });
  }
}
