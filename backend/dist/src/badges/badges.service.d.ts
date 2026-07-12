import { PrismaService } from '../prisma.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
export declare class BadgesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBadgeDto: CreateBadgeDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        status: string;
        description: string;
        icon: string;
        unlock_rule_type: string;
        unlock_rule_value: number;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateBadgeDto: UpdateBadgeDto): string;
    remove(id: number): string;
}
