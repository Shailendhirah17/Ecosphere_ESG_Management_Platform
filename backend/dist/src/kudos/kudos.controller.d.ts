import { KudosService } from './kudos.service';
export declare class KudosController {
    private readonly kudosService;
    constructor(kudosService: KudosService);
    create(createKudoDto: any): Promise<{
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
    update(id: string, updateKudoDto: any): string;
    remove(id: string): string;
}
