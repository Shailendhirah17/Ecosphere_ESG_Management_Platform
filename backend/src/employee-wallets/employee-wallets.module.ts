import { Module } from '@nestjs/common';
import { EmployeeWalletsService } from './employee-wallets.service';
import { EmployeeWalletsController } from './employee-wallets.controller';

@Module({
  controllers: [EmployeeWalletsController],
  providers: [EmployeeWalletsService],
})
export class EmployeeWalletsModule {}
