import { PrismaService } from '../prisma.service';
import { CreateEsgPolicyDto } from './dto/create-esg-policy.dto';
import { UpdateEsgPolicyDto } from './dto/update-esg-policy.dto';
export declare class EsgPoliciesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEsgPolicyDto: CreateEsgPolicyDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        category: string;
        id: string;
        status: string;
        title: string;
        version: string;
        document_url: string;
        effective_date: Date;
        mandatory_flag: boolean;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateEsgPolicyDto: UpdateEsgPolicyDto): string;
    remove(id: number): string;
}
