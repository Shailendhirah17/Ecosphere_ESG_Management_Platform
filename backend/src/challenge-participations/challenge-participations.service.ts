import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChallengeParticipationDto } from './dto/create-challenge-participation.dto';
import { UpdateChallengeParticipationDto } from './dto/update-challenge-participation.dto';

@Injectable()
export class ChallengeParticipationsService { 
  constructor(private prisma: PrismaService) {}
  create(createChallengeParticipationDto: CreateChallengeParticipationDto) {
    return 'This action adds a new challengeParticipation';
  }

  findAll() {
    return this.prisma.challengeParticipation.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} challengeParticipation`;
  }

  update(id: number, updateChallengeParticipationDto: UpdateChallengeParticipationDto) {
    return `This action updates a #${id} challengeParticipation`;
  }

  remove(id: number) {
    return `This action removes a #${id} challengeParticipation`;
  }
}
