import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEsgPolicyDto } from './dto/create-esg-policy.dto';
import { UpdateEsgPolicyDto } from './dto/update-esg-policy.dto';

@Injectable()
export class EsgPoliciesService { 
  constructor(private prisma: PrismaService) {}
  create(createEsgPolicyDto: CreateEsgPolicyDto) {
    return 'This action adds a new esgPolicy';
  }

  findAll() {
    return this.prisma.eSGPolicy.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} esgPolicy`;
  }

  update(id: number, updateEsgPolicyDto: UpdateEsgPolicyDto) {
    return `This action updates a #${id} esgPolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} esgPolicy`;
  }
}
