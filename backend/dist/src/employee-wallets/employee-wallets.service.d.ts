import { PrismaService } from '../prisma.service';
import { CreateEmployeeWalletDto } from './dto/create-employee-wallet.dto';
import { UpdateEmployeeWalletDto } from './dto/update-employee-wallet.dto';
export declare class EmployeeWalletsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEmployeeWalletDto: CreateEmployeeWalletDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        employee_id: string;
        balance: number;
        lifetime_earned: number;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateEmployeeWalletDto: UpdateEmployeeWalletDto): string;
    remove(id: number): string;
}
