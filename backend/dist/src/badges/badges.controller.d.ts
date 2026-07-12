import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
export declare class BadgesController {
    private readonly badgesService;
    constructor(badgesService: BadgesService);
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
    findOne(id: string): string;
    update(id: string, updateBadgeDto: UpdateBadgeDto): string;
    remove(id: string): string;
}
