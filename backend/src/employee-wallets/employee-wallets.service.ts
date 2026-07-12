import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeWalletDto } from './dto/create-employee-wallet.dto';
import { UpdateEmployeeWalletDto } from './dto/update-employee-wallet.dto';

@Injectable()
export class EmployeeWalletsService { 
  constructor(private prisma: PrismaService) {}
  create(createEmployeeWalletDto: CreateEmployeeWalletDto) {
    return 'This action adds a new employeeWallet';
  }

  findAll() {
    return this.prisma.employeeWallet.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeWallet`;
  }

  update(id: number, updateEmployeeWalletDto: UpdateEmployeeWalletDto) {
    return `This action updates a #${id} employeeWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeWallet`;
  }
}
