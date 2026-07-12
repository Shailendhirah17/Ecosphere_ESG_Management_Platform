import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService { 
  constructor(private prisma: PrismaService) {}
  create(createChallengeDto: CreateChallengeDto) {
    return 'This action adds a new challenge';
  }

  findAll() {
    return this.prisma.challenge.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
