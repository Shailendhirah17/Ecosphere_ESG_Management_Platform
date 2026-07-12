import { EmployeeParticipationsService } from './employee-participations.service';
import { CreateEmployeeParticipationDto } from './dto/create-employee-participation.dto';
import { UpdateEmployeeParticipationDto } from './dto/update-employee-participation.dto';
export declare class EmployeeParticipationsController {
    private readonly employeeParticipationsService;
    constructor(employeeParticipationsService: EmployeeParticipationsService);
    create(createEmployeeParticipationDto: CreateEmployeeParticipationDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        employee_id: string;
        activity_id: string;
        proof_url: string | null;
        approval_status: string;
        points_earned: number;
        completion_date: Date | null;
        approved_by: string | null;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateEmployeeParticipationDto: UpdateEmployeeParticipationDto): string;
    remove(id: string): string;
}
