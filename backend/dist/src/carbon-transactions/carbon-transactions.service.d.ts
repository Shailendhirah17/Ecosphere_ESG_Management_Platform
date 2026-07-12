import { CreateCarbonTransactionDto } from './dto/create-carbon-transaction.dto';
import { UpdateCarbonTransactionDto } from './dto/update-carbon-transaction.dto';
import { PrismaService } from '../prisma.service';
export declare class CarbonTransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCarbonTransactionDto: CreateCarbonTransactionDto): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<{
        id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        department_id: string;
        emission_factor_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    autoCalculate(data: any): Promise<{
        id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        department_id: string;
        emission_factor_id: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        department: {
            id: string;
            name: string;
            status: string;
            code: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
        };
        emission_factor: {
            id: string;
            name: string;
            activity_type: string;
            unit: string;
            co2e_per_unit: number;
            source: string;
            effective_from: Date;
            effective_to: Date | null;
            status: string;
        };
    } & {
        id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        department_id: string;
        emission_factor_id: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<({
        department: {
            id: string;
            name: string;
            status: string;
            code: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
        };
        emission_factor: {
            id: string;
            name: string;
            activity_type: string;
            unit: string;
            co2e_per_unit: number;
            source: string;
            effective_from: Date;
            effective_to: Date | null;
            status: string;
        };
    } & {
        id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        department_id: string;
        emission_factor_id: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCarbonTransactionDto: UpdateCarbonTransactionDto): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<{
        id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        department_id: string;
        emission_factor_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<{
        id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        department_id: string;
        emission_factor_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
