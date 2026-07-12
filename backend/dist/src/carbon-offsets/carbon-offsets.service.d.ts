import { PrismaService } from '../prisma.service';
export declare class CarbonOffsetsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__CarbonOffsetClient<{
        id: string;
        status: string;
        project_name: string;
        credits_tonnes: number;
        date_purchased: Date;
        certificate_url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        project_name: string;
        credits_tonnes: number;
        date_purchased: Date;
        certificate_url: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CarbonOffsetClient<{
        id: string;
        status: string;
        project_name: string;
        credits_tonnes: number;
        date_purchased: Date;
        certificate_url: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__CarbonOffsetClient<{
        id: string;
        status: string;
        project_name: string;
        credits_tonnes: number;
        date_purchased: Date;
        certificate_url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CarbonOffsetClient<{
        id: string;
        status: string;
        project_name: string;
        credits_tonnes: number;
        date_purchased: Date;
        certificate_url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
