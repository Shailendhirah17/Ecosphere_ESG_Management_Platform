import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnvironmentalGoalsService } from './environmental-goals.service';
import { CreateEnvironmentalGoalDto } from './dto/create-environmental-goal.dto';
import { UpdateEnvironmentalGoalDto } from './dto/update-environmental-goal.dto';

@Controller('environmental-goals')
export class EnvironmentalGoalsController {
  constructor(private readonly environmentalGoalsService: EnvironmentalGoalsService) {}

  @Post()
  create(@Body() createEnvironmentalGoalDto: CreateEnvironmentalGoalDto) {
    return this.environmentalGoalsService.create(createEnvironmentalGoalDto);
  }

  @Get()
  findAll() {
    return this.environmentalGoalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentalGoalsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnvironmentalGoalDto: UpdateEnvironmentalGoalDto) {
    return this.environmentalGoalsService.update(id, updateEnvironmentalGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.environmentalGoalsService.remove(id);
  }
}
