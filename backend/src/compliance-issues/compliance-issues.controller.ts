import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComplianceIssuesService } from './compliance-issues.service';
import { CreateComplianceIssueDto } from './dto/create-compliance-issue.dto';
import { UpdateComplianceIssueDto } from './dto/update-compliance-issue.dto';

@Controller('compliance-issues')
export class ComplianceIssuesController {
  constructor(private readonly complianceIssuesService: ComplianceIssuesService) {}

  @Post()
  create(@Body() createComplianceIssueDto: CreateComplianceIssueDto) {
    return this.complianceIssuesService.create(createComplianceIssueDto);
  }

  @Get()
  findAll() {
    return this.complianceIssuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complianceIssuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplianceIssueDto: UpdateComplianceIssueDto) {
    return this.complianceIssuesService.update(+id, updateComplianceIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complianceIssuesService.remove(+id);
  }
}
