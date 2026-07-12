import { PrismaService } from '../prisma.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
export declare class AuditsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAuditDto: CreateAuditDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        department_id: string;
        audit_type: string;
        scheduled_date: Date;
        completed_date: Date | null;
        auditor: string;
        findings_summary: string | null;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateAuditDto: UpdateAuditDto): string;
    remove(id: number): string;
}
