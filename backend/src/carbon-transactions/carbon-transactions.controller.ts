import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarbonTransactionsService } from './carbon-transactions.service';
import { CreateCarbonTransactionDto } from './dto/create-carbon-transaction.dto';
import { UpdateCarbonTransactionDto } from './dto/update-carbon-transaction.dto';

@Controller('carbon-transactions')
export class CarbonTransactionsController {
  constructor(private readonly carbonTransactionsService: CarbonTransactionsService) {}

  @Post()
  create(@Body() createCarbonTransactionDto: CreateCarbonTransactionDto) {
    return this.carbonTransactionsService.create(createCarbonTransactionDto);
  }

  @Post('auto-calculate')
  autoCalculate(@Body() data: any) {
    return this.carbonTransactionsService.autoCalculate(data);
  }

  @Get()
  findAll() {
    return this.carbonTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carbonTransactionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarbonTransactionDto: UpdateCarbonTransactionDto) {
    return this.carbonTransactionsService.update(id, updateCarbonTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carbonTransactionsService.remove(id);
  }
}
