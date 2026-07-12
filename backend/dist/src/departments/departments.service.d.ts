import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma.service';
export declare class DepartmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDepartmentDto: CreateDepartmentDto): import("@prisma/client").Prisma.Prisma__DepartmentClient<{
        id: string;
        name: string;
        code: string;
        head_employee_id: string | null;
        employee_count: number;
        status: string;
        parent_department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            carbon_transactions: number;
            csr_activities: number;
        };
    } & {
        id: string;
        name: string;
        code: string;
        head_employee_id: string | null;
        employee_count: number;
        status: string;
        parent_department_id: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__DepartmentClient<{
        id: string;
        name: string;
        code: string;
        head_employee_id: string | null;
        employee_count: number;
        status: string;
        parent_department_id: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): import("@prisma/client").Prisma.Prisma__DepartmentClient<{
        id: string;
        name: string;
        code: string;
        head_employee_id: string | null;
        employee_count: number;
        status: string;
        parent_department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__DepartmentClient<{
        id: string;
        name: string;
        code: string;
        head_employee_id: string | null;
        employee_count: number;
        status: string;
        parent_department_id: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
