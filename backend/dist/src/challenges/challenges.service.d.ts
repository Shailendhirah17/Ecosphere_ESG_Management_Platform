import { PrismaService } from '../prisma.service';
export declare class ChallengesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        status: string;
        title: string;
        category_id: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        category: {
            id: string;
            name: string;
            status: string;
            type: string;
        };
    } & {
        id: string;
        status: string;
        title: string;
        category_id: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        status: string;
        title: string;
        category_id: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        status: string;
        title: string;
        category_id: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        status: string;
        title: string;
        category_id: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
