import { PolicyAcknowledgementsService } from './policy-acknowledgements.service';
import { CreatePolicyAcknowledgementDto } from './dto/create-policy-acknowledgement.dto';
import { UpdatePolicyAcknowledgementDto } from './dto/update-policy-acknowledgement.dto';
export declare class PolicyAcknowledgementsController {
    private readonly policyAcknowledgementsService;
    constructor(policyAcknowledgementsService: PolicyAcknowledgementsService);
    create(createPolicyAcknowledgementDto: CreatePolicyAcknowledgementDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        employee_id: string;
        policy_id: string;
        acknowledged_date: Date | null;
        reminder_count: number;
    }[]>;
    findOne(id: string): string;
    update(id: string, updatePolicyAcknowledgementDto: UpdatePolicyAcknowledgementDto): string;
    remove(id: string): string;
}
