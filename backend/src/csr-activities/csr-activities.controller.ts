import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CsrActivitiesService } from './csr-activities.service';
import { CreateCsrActivityDto } from './dto/create-csr-activity.dto';
import { UpdateCsrActivityDto } from './dto/update-csr-activity.dto';

@Controller('csr-activities')
export class CsrActivitiesController {
  constructor(private readonly csrActivitiesService: CsrActivitiesService) {}

  @Post()
  create(@Body() createCsrActivityDto: CreateCsrActivityDto) {
    return this.csrActivitiesService.create(createCsrActivityDto);
  }

  @Get()
  findAll() {
    return this.csrActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.csrActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCsrActivityDto: UpdateCsrActivityDto) {
    return this.csrActivitiesService.update(+id, updateCsrActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.csrActivitiesService.remove(+id);
  }
}
