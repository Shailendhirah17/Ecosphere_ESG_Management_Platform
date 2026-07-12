import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateComplianceIssueDto } from './dto/create-compliance-issue.dto';
import { UpdateComplianceIssueDto } from './dto/update-compliance-issue.dto';

@Injectable()
export class ComplianceIssuesService { 
  constructor(private prisma: PrismaService) {}
  create(createComplianceIssueDto: CreateComplianceIssueDto) {
    return 'This action adds a new complianceIssue';
  }

  findAll() {
    return this.prisma.complianceIssue.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} complianceIssue`;
  }

  update(id: number, updateComplianceIssueDto: UpdateComplianceIssueDto) {
    return `This action updates a #${id} complianceIssue`;
  }

  remove(id: number) {
    return `This action removes a #${id} complianceIssue`;
  }
}
