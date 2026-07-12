import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengeParticipationsService } from './challenge-participations.service';
import { CreateChallengeParticipationDto } from './dto/create-challenge-participation.dto';
import { UpdateChallengeParticipationDto } from './dto/update-challenge-participation.dto';

@Controller('challenge-participations')
export class ChallengeParticipationsController {
  constructor(private readonly challengeParticipationsService: ChallengeParticipationsService) {}

  @Post()
  create(@Body() createChallengeParticipationDto: CreateChallengeParticipationDto) {
    return this.challengeParticipationsService.create(createChallengeParticipationDto);
  }

  @Get()
  findAll() {
    return this.challengeParticipationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeParticipationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeParticipationDto: UpdateChallengeParticipationDto) {
    return this.challengeParticipationsService.update(+id, updateChallengeParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeParticipationsService.remove(+id);
  }
}
