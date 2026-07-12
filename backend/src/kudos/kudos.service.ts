import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

const MAX_KUDOS_PER_MONTH = 5;

@Injectable()
export class KudosService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // Check monthly limit
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const count = await this.prisma.kudos.count({
      where: {
        sender_id: data.sender_id,
        sent_date: { gte: startOfMonth }
      }
    });

    if (count >= MAX_KUDOS_PER_MONTH) {
      throw new BadRequestException(`Monthly limit of ${MAX_KUDOS_PER_MONTH} kudos reached.`);
    }

    return this.prisma.kudos.create({ data });
  }

  findAll() {
    return this.prisma.kudos.findMany({ orderBy: { sent_date: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.kudos.findUnique({ where: { id } });
  }

  update(id: number, updateKudosDto: any) {
    return `This action updates a #${id} kudos`;
  }

  remove(id: number) {
    return `This action removes a #${id} kudos`;
  }
}
