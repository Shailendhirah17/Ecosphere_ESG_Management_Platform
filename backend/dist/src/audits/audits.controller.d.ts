import { AuditsService } from './audits.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
export declare class AuditsController {
    private readonly auditsService;
    constructor(auditsService: AuditsService);
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
    findOne(id: string): string;
    update(id: string, updateAuditDto: UpdateAuditDto): string;
    remove(id: string): string;
}
