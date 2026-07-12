import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCsrActivityDto } from './dto/create-csr-activity.dto';
import { UpdateCsrActivityDto } from './dto/update-csr-activity.dto';

@Injectable()
export class CsrActivitiesService { 
  constructor(private prisma: PrismaService) {}
  create(createCsrActivityDto: CreateCsrActivityDto) {
    return 'This action adds a new csrActivity';
  }

  findAll() {
    return this.prisma.cSRActivity.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} csrActivity`;
  }

  update(id: number, updateCsrActivityDto: UpdateCsrActivityDto) {
    return `This action updates a #${id} csrActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} csrActivity`;
  }
}
