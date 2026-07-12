import { PrismaService } from '../prisma.service';
export declare class DepartmentScoresService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        department_id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        department_id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        department_id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        department_id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        department_id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
