import { PrismaService } from '../prisma.service';
import { CreateComplianceIssueDto } from './dto/create-compliance-issue.dto';
import { UpdateComplianceIssueDto } from './dto/update-compliance-issue.dto';
export declare class ComplianceIssuesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createComplianceIssueDto: CreateComplianceIssueDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        description: string;
        audit_id: string | null;
        severity: string;
        owner_employee_id: string;
        due_date: Date;
        raised_date: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateComplianceIssueDto: UpdateComplianceIssueDto): string;
    remove(id: number): string;
}
