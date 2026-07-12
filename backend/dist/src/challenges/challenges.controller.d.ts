import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
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
    findOne(id: string): string;
    update(id: string, updateChallengeDto: UpdateChallengeDto): string;
    remove(id: string): string;
}
