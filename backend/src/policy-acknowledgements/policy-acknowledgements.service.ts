import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePolicyAcknowledgementDto } from './dto/create-policy-acknowledgement.dto';
import { UpdatePolicyAcknowledgementDto } from './dto/update-policy-acknowledgement.dto';

@Injectable()
export class PolicyAcknowledgementsService { 
  constructor(private prisma: PrismaService) {}
  create(createPolicyAcknowledgementDto: CreatePolicyAcknowledgementDto) {
    return 'This action adds a new policyAcknowledgement';
  }

  findAll() {
    return this.prisma.policyAcknowledgement.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} policyAcknowledgement`;
  }

  update(id: number, updatePolicyAcknowledgementDto: UpdatePolicyAcknowledgementDto) {
    return `This action updates a #${id} policyAcknowledgement`;
  }

  remove(id: number) {
    return `This action removes a #${id} policyAcknowledgement`;
  }
}
