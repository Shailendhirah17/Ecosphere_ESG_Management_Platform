import { PrismaService } from '../prisma.service';
export declare class ChallengesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        title: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        status: string;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
        category_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        category: {
            id: string;
            status: string;
            name: string;
            type: string;
        };
    } & {
        id: string;
        title: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        status: string;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
        category_id: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        title: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        status: string;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
        category_id: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        title: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        status: string;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
        category_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ChallengeClient<{
        id: string;
        title: string;
        description: string;
        xp_value: number;
        difficulty: string;
        evidence_required: boolean;
        deadline: Date;
        status: string;
        team_based: boolean;
        seasonal: boolean;
        event_start_date: Date | null;
        event_end_date: Date | null;
        category_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
