import { CreateEmissionFactorDto } from './dto/create-emission-factor.dto';
import { UpdateEmissionFactorDto } from './dto/update-emission-factor.dto';
import { PrismaService } from '../prisma.service';
export declare class EmissionFactorsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEmissionFactorDto: CreateEmissionFactorDto): import("@prisma/client").Prisma.Prisma__EmissionFactorClient<{
        id: string;
        name: string;
        status: string;
        activity_type: string;
        unit: string;
        co2e_per_unit: number;
        source: string;
        effective_from: Date;
        effective_to: Date | null;
        scope: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(activity_type?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        status: string;
        activity_type: string;
        unit: string;
        co2e_per_unit: number;
        source: string;
        effective_from: Date;
        effective_to: Date | null;
        scope: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__EmissionFactorClient<{
        id: string;
        name: string;
        status: string;
        activity_type: string;
        unit: string;
        co2e_per_unit: number;
        source: string;
        effective_from: Date;
        effective_to: Date | null;
        scope: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateEmissionFactorDto: UpdateEmissionFactorDto): import("@prisma/client").Prisma.Prisma__EmissionFactorClient<{
        id: string;
        name: string;
        status: string;
        activity_type: string;
        unit: string;
        co2e_per_unit: number;
        source: string;
        effective_from: Date;
        effective_to: Date | null;
        scope: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__EmissionFactorClient<{
        id: string;
        name: string;
        status: string;
        activity_type: string;
        unit: string;
        co2e_per_unit: number;
        source: string;
        effective_from: Date;
        effective_to: Date | null;
        scope: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
