import { Injectable } from '@nestjs/common';
import { CreateEnvironmentalGoalDto } from './dto/create-environmental-goal.dto';
import { UpdateEnvironmentalGoalDto } from './dto/update-environmental-goal.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EnvironmentalGoalsService {
  constructor(private prisma: PrismaService) {}

  create(createEnvironmentalGoalDto: CreateEnvironmentalGoalDto) {
    return this.prisma.environmentalGoal.create({
      data: createEnvironmentalGoalDto as any,
    });
  }

  async findAll() {
    const goals = await this.prisma.environmentalGoal.findMany({
      include: {
        department: true,
      },
      orderBy: { target_date: 'asc' }
    });

    // Compute progress for each goal
    const goalsWithProgress = await Promise.all(goals.map(async (goal) => {
      // In a real app, you'd match by metric_type. We assume 'tCO2e' maps to CarbonTransactions for this demo.
      let current_value = 0;
      if (goal.department_id && (goal.metric_type === 'Carbon Reduction' || goal.unit === 'tCO2e')) {
        const aggregations = await this.prisma.carbonTransaction.aggregate({
          where: {
            department_id: goal.department_id,
            // Assuming baseline is the start of tracking for this goal
          },
          _sum: {
            calculated_co2e: true
          }
        });
        current_value = aggregations._sum?.calculated_co2e || 0;
      }
      
      return {
        ...goal,
        current_value
      };
    }));

    return goalsWithProgress;
  }

  findOne(id: string) {
    return this.prisma.environmentalGoal.findUnique({
      where: { id },
      include: { department: true }
    });
  }

  update(id: string, updateEnvironmentalGoalDto: UpdateEnvironmentalGoalDto) {
    return this.prisma.environmentalGoal.update({
      where: { id },
      data: updateEnvironmentalGoalDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.environmentalGoal.delete({
      where: { id },
    });
  }
}
