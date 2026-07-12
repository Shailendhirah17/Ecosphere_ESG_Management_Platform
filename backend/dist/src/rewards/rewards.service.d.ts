import { PrismaService } from '../prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
export declare class RewardsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRewardDto: CreateRewardDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        status: string;
        description: string;
        points_required: number;
        stock: number;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateRewardDto: UpdateRewardDto): string;
    remove(id: number): string;
}
