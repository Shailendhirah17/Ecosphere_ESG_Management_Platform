import { PrismaService } from '../prisma.service';
export declare class KudosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        sender_id: string;
        receiver_id: string;
        message: string;
        points: number;
        sent_date: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        sender_id: string;
        receiver_id: string;
        message: string;
        points: number;
        sent_date: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__KudosClient<{
        id: string;
        sender_id: string;
        receiver_id: string;
        message: string;
        points: number;
        sent_date: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateKudosDto: any): string;
    remove(id: number): string;
}
