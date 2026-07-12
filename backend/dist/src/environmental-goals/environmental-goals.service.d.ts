import { CreateEnvironmentalGoalDto } from './dto/create-environmental-goal.dto';
import { UpdateEnvironmentalGoalDto } from './dto/update-environmental-goal.dto';
import { PrismaService } from '../prisma.service';
export declare class EnvironmentalGoalsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEnvironmentalGoalDto: CreateEnvironmentalGoalDto): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<{
        id: string;
        status: string;
        unit: string;
        metric_type: string;
        target_value: number;
        target_date: Date;
        baseline_value: number;
        department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): Promise<{
        current_value: number;
        department: {
            id: string;
            code: string;
            name: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
            status: string;
        } | null;
        id: string;
        status: string;
        unit: string;
        metric_type: string;
        target_value: number;
        target_date: Date;
        baseline_value: number;
        department_id: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<({
        department: {
            id: string;
            code: string;
            name: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
            status: string;
        } | null;
    } & {
        id: string;
        status: string;
        unit: string;
        metric_type: string;
        target_value: number;
        target_date: Date;
        baseline_value: number;
        department_id: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateEnvironmentalGoalDto: UpdateEnvironmentalGoalDto): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<{
        id: string;
        status: string;
        unit: string;
        metric_type: string;
        target_value: number;
        target_date: Date;
        baseline_value: number;
        department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<{
        id: string;
        status: string;
        unit: string;
        metric_type: string;
        target_value: number;
        target_date: Date;
        baseline_value: number;
        department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
