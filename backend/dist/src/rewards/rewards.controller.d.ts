import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
export declare class RewardsController {
    private readonly rewardsService;
    constructor(rewardsService: RewardsService);
    create(createRewardDto: CreateRewardDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        status: string;
        description: string;
        points_required: number;
        stock: number;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateRewardDto: UpdateRewardDto): string;
    remove(id: string): string;
}
