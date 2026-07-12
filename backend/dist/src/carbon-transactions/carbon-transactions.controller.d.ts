import { CarbonTransactionsService } from './carbon-transactions.service';
import { CreateCarbonTransactionDto } from './dto/create-carbon-transaction.dto';
import { UpdateCarbonTransactionDto } from './dto/update-carbon-transaction.dto';
export declare class CarbonTransactionsController {
    private readonly carbonTransactionsService;
    constructor(carbonTransactionsService: CarbonTransactionsService);
    create(createCarbonTransactionDto: CreateCarbonTransactionDto): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<{
        id: string;
        department_id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        emission_factor_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    autoCalculate(data: any): Promise<{
        id: string;
        department_id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        emission_factor_id: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        department: {
            id: string;
            code: string;
            name: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
            status: string;
        };
        emission_factor: {
            id: string;
            name: string;
            status: string;
            activity_type: string;
            unit: string;
            co2e_per_unit: number;
            source: string;
            effective_from: Date;
            effective_to: Date | null;
        };
    } & {
        id: string;
        department_id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        emission_factor_id: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<({
        department: {
            id: string;
            code: string;
            name: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
            status: string;
        };
        emission_factor: {
            id: string;
            name: string;
            status: string;
            activity_type: string;
            unit: string;
            co2e_per_unit: number;
            source: string;
            effective_from: Date;
            effective_to: Date | null;
        };
    } & {
        id: string;
        department_id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        emission_factor_id: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCarbonTransactionDto: UpdateCarbonTransactionDto): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<{
        id: string;
        department_id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        emission_factor_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CarbonTransactionClient<{
        id: string;
        department_id: string;
        source_type: string;
        source_record_id: string;
        quantity: number;
        calculated_co2e: number;
        calculation_mode: string;
        transaction_date: Date;
        created_by: string;
        emission_factor_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
