import { Module } from '@nestjs/common';
import { CarbonTransactionsService } from './carbon-transactions.service';
import { CarbonTransactionsController } from './carbon-transactions.controller';

@Module({
  controllers: [CarbonTransactionsController],
  providers: [CarbonTransactionsService],
})
export class CarbonTransactionsModule {}
