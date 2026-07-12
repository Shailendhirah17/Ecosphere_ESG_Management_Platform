import { PrismaService } from '../prisma.service';
import { CreatePolicyAcknowledgementDto } from './dto/create-policy-acknowledgement.dto';
import { UpdatePolicyAcknowledgementDto } from './dto/update-policy-acknowledgement.dto';
export declare class PolicyAcknowledgementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPolicyAcknowledgementDto: CreatePolicyAcknowledgementDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        employee_id: string;
        policy_id: string;
        acknowledged_date: Date | null;
        reminder_count: number;
    }[]>;
    findOne(id: number): string;
    update(id: number, updatePolicyAcknowledgementDto: UpdatePolicyAcknowledgementDto): string;
    remove(id: number): string;
}
