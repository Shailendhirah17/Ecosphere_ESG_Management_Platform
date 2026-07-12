import { PrismaService } from '../prisma.service';
import { CreateChallengeParticipationDto } from './dto/create-challenge-participation.dto';
import { UpdateChallengeParticipationDto } from './dto/update-challenge-participation.dto';
export declare class ChallengeParticipationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChallengeParticipationDto: CreateChallengeParticipationDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        employee_id: string;
        proof_url: string | null;
        approval_status: string;
        challenge_id: string;
        progress_pct: number;
        xp_awarded: number;
        submitted_date: Date | null;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateChallengeParticipationDto: UpdateChallengeParticipationDto): string;
    remove(id: number): string;
}
