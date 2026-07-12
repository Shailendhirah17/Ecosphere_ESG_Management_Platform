import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarbonTransactionDto } from './dto/create-carbon-transaction.dto';
import { UpdateCarbonTransactionDto } from './dto/update-carbon-transaction.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarbonTransactionsService {
  constructor(private prisma: PrismaService) {}

  create(createCarbonTransactionDto: CreateCarbonTransactionDto) {
    return this.prisma.carbonTransaction.create({
      data: createCarbonTransactionDto as any,
    });
  }

  async autoCalculate(data: any) {
    // Expected data: department_id, source_type, source_record_id, activity_type, quantity, transaction_date, created_by
    const { department_id, source_type, source_record_id, activity_type, quantity, transaction_date, created_by } = data;
    
    // Find active emission factor for this activity type
    const factor = await this.prisma.emissionFactor.findFirst({
      where: {
        activity_type,
        status: 'ACTIVE',
        effective_from: { lte: new Date(transaction_date) },
      },
      orderBy: { effective_from: 'desc' }
    });

    if (!factor) {
      throw new NotFoundException(`No active emission factor found for activity type: ${activity_type}`);
    }

    const calculated_co2e = quantity * factor.co2e_per_unit;

    return this.prisma.carbonTransaction.create({
      data: {
        department_id,
        source_type,
        source_record_id,
        emission_factor_id: factor.id,
        quantity,
        calculated_co2e,
        calculation_mode: 'Auto',
        transaction_date: new Date(transaction_date),
        created_by
      }
    });
  }

  findAll() {
    return this.prisma.carbonTransaction.findMany({
      include: {
        department: true,
        emission_factor: true
      },
      orderBy: { transaction_date: 'desc' }
    });
  }

  findOne(id: string) {
    return this.prisma.carbonTransaction.findUnique({
      where: { id },
      include: {
        department: true,
        emission_factor: true
      }
    });
  }

  update(id: string, updateCarbonTransactionDto: UpdateCarbonTransactionDto) {
    return this.prisma.carbonTransaction.update({
      where: { id },
      data: updateCarbonTransactionDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.carbonTransaction.delete({
      where: { id },
    });
  }
}
