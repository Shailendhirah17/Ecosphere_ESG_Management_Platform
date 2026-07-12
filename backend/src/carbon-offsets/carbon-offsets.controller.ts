import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarbonOffsetsService } from './carbon-offsets.service';

@Controller('carbon-offsets')
export class CarbonOffsetsController {
  constructor(private readonly carbonOffsetsService: CarbonOffsetsService) {}

  @Post()
  create(@Body() createCarbonOffsetDto: any) {
    return this.carbonOffsetsService.create(createCarbonOffsetDto);
  }

  @Get()
  findAll() {
    return this.carbonOffsetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carbonOffsetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarbonOffsetDto: any) {
    return this.carbonOffsetsService.update(id, updateCarbonOffsetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carbonOffsetsService.remove(id);
  }
}
