import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmissionFactorsService } from './emission-factors.service';
import { CreateEmissionFactorDto } from './dto/create-emission-factor.dto';
import { UpdateEmissionFactorDto } from './dto/update-emission-factor.dto';

@Controller('emission-factors')
export class EmissionFactorsController {
  constructor(private readonly emissionFactorsService: EmissionFactorsService) {}

  @Post()
  create(@Body() createEmissionFactorDto: CreateEmissionFactorDto) {
    return this.emissionFactorsService.create(createEmissionFactorDto);
  }

  @Get()
  findAll(@Query('activity_type') activity_type?: string) {
    return this.emissionFactorsService.findAll(activity_type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emissionFactorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmissionFactorDto: UpdateEmissionFactorDto) {
    return this.emissionFactorsService.update(id, updateEmissionFactorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emissionFactorsService.remove(id);
  }
}
