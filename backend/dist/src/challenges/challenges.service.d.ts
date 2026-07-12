import { PrismaService } from '../prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
export declare class ChallengesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChallengeDto: CreateChallengeDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        title: string;
        category_id: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateChallengeDto: UpdateChallengeDto): string;
    remove(id: number): string;
}
