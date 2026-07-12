import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentScoresService } from './department-scores.service';

@Controller('department-scores')
export class DepartmentScoresController {
  constructor(private readonly departmentScoresService: DepartmentScoresService) {}

  @Post()
  create(@Body() createDepartmentScoreDto: any) {
    return this.departmentScoresService.create(createDepartmentScoreDto);
  }

  @Get()
  findAll() {
    return this.departmentScoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentScoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentScoreDto: any) {
    return this.departmentScoresService.update(id, updateDepartmentScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentScoresService.remove(id);
  }
}
