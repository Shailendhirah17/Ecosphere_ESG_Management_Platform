import { EnvironmentalGoalsService } from './environmental-goals.service';
import { CreateEnvironmentalGoalDto } from './dto/create-environmental-goal.dto';
import { UpdateEnvironmentalGoalDto } from './dto/update-environmental-goal.dto';
export declare class EnvironmentalGoalsController {
    private readonly environmentalGoalsService;
    constructor(environmentalGoalsService: EnvironmentalGoalsService);
    create(createEnvironmentalGoalDto: CreateEnvironmentalGoalDto): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<{
        id: string;
        metric_type: string;
        target_value: number;
        unit: string;
        target_date: Date;
        baseline_value: number;
        status: string;
        department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): Promise<{
        current_value: number;
        department: {
            id: string;
            status: string;
            name: string;
            code: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
        } | null;
        id: string;
        metric_type: string;
        target_value: number;
        unit: string;
        target_date: Date;
        baseline_value: number;
        status: string;
        department_id: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<({
        department: {
            id: string;
            status: string;
            name: string;
            code: string;
            head_employee_id: string | null;
            parent_department_id: string | null;
            employee_count: number;
        } | null;
    } & {
        id: string;
        metric_type: string;
        target_value: number;
        unit: string;
        target_date: Date;
        baseline_value: number;
        status: string;
        department_id: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateEnvironmentalGoalDto: UpdateEnvironmentalGoalDto): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<{
        id: string;
        metric_type: string;
        target_value: number;
        unit: string;
        target_date: Date;
        baseline_value: number;
        status: string;
        department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__EnvironmentalGoalClient<{
        id: string;
        metric_type: string;
        target_value: number;
        unit: string;
        target_date: Date;
        baseline_value: number;
        status: string;
        department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
