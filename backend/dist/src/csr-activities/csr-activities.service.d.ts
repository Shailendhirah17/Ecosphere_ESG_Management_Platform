import { PrismaService } from '../prisma.service';
import { CreateCsrActivityDto } from './dto/create-csr-activity.dto';
import { UpdateCsrActivityDto } from './dto/update-csr-activity.dto';
export declare class CsrActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateCsrActivityDto: UpdateCsrActivityDto): string;
    remove(id: number): string;
}
