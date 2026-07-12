import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardsService { 
  constructor(private prisma: PrismaService) {}
  create(createRewardDto: CreateRewardDto) {
    return 'This action adds a new reward';
  }

  findAll() {
    return this.prisma.reward.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} reward`;
  }

  update(id: number, updateRewardDto: UpdateRewardDto) {
    return `This action updates a #${id} reward`;
  }

  remove(id: number) {
    return `This action removes a #${id} reward`;
  }
}
