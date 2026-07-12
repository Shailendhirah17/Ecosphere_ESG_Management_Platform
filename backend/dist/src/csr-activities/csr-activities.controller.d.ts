import { CsrActivitiesService } from './csr-activities.service';
import { CreateCsrActivityDto } from './dto/create-csr-activity.dto';
import { UpdateCsrActivityDto } from './dto/update-csr-activity.dto';
export declare class CsrActivitiesController {
    private readonly csrActivitiesService;
    constructor(csrActivitiesService: CsrActivitiesService);
    create(createCsrActivityDto: CreateCsrActivityDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        title: string;
        category_id: string;
        description: string;
        department_id: string;
        location: string;
        start_date: Date;
        end_date: Date;
        capacity: number;
        evidence_required_override: boolean | null;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateCsrActivityDto: UpdateCsrActivityDto): string;
    remove(id: string): string;
}
