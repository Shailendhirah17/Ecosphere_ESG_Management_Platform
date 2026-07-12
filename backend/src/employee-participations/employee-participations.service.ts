import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeParticipationDto } from './dto/create-employee-participation.dto';
import { UpdateEmployeeParticipationDto } from './dto/update-employee-participation.dto';

@Injectable()
export class EmployeeParticipationsService { 
  constructor(private prisma: PrismaService) {}
  create(createEmployeeParticipationDto: CreateEmployeeParticipationDto) {
    return 'This action adds a new employeeParticipation';
  }

  findAll() {
    return this.prisma.employeeParticipation.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeParticipation`;
  }

  update(id: number, updateEmployeeParticipationDto: UpdateEmployeeParticipationDto) {
    return `This action updates a #${id} employeeParticipation`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeParticipation`;
  }
}
