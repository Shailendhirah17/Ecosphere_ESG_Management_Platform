import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeParticipationsService } from './employee-participations.service';
import { CreateEmployeeParticipationDto } from './dto/create-employee-participation.dto';
import { UpdateEmployeeParticipationDto } from './dto/update-employee-participation.dto';

@Controller('employee-participations')
export class EmployeeParticipationsController {
  constructor(private readonly employeeParticipationsService: EmployeeParticipationsService) {}

  @Post()
  create(@Body() createEmployeeParticipationDto: CreateEmployeeParticipationDto) {
    return this.employeeParticipationsService.create(createEmployeeParticipationDto);
  }

  @Get()
  findAll() {
    return this.employeeParticipationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeParticipationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeParticipationDto: UpdateEmployeeParticipationDto) {
    return this.employeeParticipationsService.update(+id, updateEmployeeParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeParticipationsService.remove(+id);
  }
}
