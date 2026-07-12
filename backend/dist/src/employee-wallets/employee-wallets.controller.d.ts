import { EmployeeWalletsService } from './employee-wallets.service';
import { CreateEmployeeWalletDto } from './dto/create-employee-wallet.dto';
import { UpdateEmployeeWalletDto } from './dto/update-employee-wallet.dto';
export declare class EmployeeWalletsController {
    private readonly employeeWalletsService;
    constructor(employeeWalletsService: EmployeeWalletsService);
    create(createEmployeeWalletDto: CreateEmployeeWalletDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        employee_id: string;
        balance: number;
        lifetime_earned: number;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateEmployeeWalletDto: UpdateEmployeeWalletDto): string;
    remove(id: string): string;
}
