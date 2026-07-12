import { EsgPoliciesService } from './esg-policies.service';
import { CreateEsgPolicyDto } from './dto/create-esg-policy.dto';
import { UpdateEsgPolicyDto } from './dto/update-esg-policy.dto';
export declare class EsgPoliciesController {
    private readonly esgPoliciesService;
    constructor(esgPoliciesService: EsgPoliciesService);
    create(createEsgPolicyDto: CreateEsgPolicyDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        category: string;
        title: string;
        version: string;
        document_url: string;
        effective_date: Date;
        mandatory_flag: boolean;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateEsgPolicyDto: UpdateEsgPolicyDto): string;
    remove(id: string): string;
}
