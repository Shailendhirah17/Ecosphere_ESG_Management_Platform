import { DepartmentScoresService } from './department-scores.service';
export declare class DepartmentScoresController {
    private readonly departmentScoresService;
    constructor(departmentScoresService: DepartmentScoresService);
    create(createDepartmentScoreDto: any): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
        department_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
        department_id: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
        department_id: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateDepartmentScoreDto: any): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
        department_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__DepartmentScoreClient<{
        id: string;
        period: string;
        environmental_score: number;
        social_score: number;
        governance_score: number;
        total_score: number;
        calculated_at: Date;
        department_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
