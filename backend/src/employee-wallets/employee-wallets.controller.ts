import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeWalletsService } from './employee-wallets.service';
import { CreateEmployeeWalletDto } from './dto/create-employee-wallet.dto';
import { UpdateEmployeeWalletDto } from './dto/update-employee-wallet.dto';

@Controller('employee-wallets')
export class EmployeeWalletsController {
  constructor(private readonly employeeWalletsService: EmployeeWalletsService) {}

  @Post()
  create(@Body() createEmployeeWalletDto: CreateEmployeeWalletDto) {
    return this.employeeWalletsService.create(createEmployeeWalletDto);
  }

  @Get()
  findAll() {
    return this.employeeWalletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeWalletsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeWalletDto: UpdateEmployeeWalletDto) {
    return this.employeeWalletsService.update(+id, updateEmployeeWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeWalletsService.remove(+id);
  }
}
