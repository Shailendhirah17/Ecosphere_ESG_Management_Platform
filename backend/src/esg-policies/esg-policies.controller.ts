import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EsgPoliciesService } from './esg-policies.service';
import { CreateEsgPolicyDto } from './dto/create-esg-policy.dto';
import { UpdateEsgPolicyDto } from './dto/update-esg-policy.dto';

@Controller('esg-policies')
export class EsgPoliciesController {
  constructor(private readonly esgPoliciesService: EsgPoliciesService) {}

  @Post()
  create(@Body() createEsgPolicyDto: CreateEsgPolicyDto) {
    return this.esgPoliciesService.create(createEsgPolicyDto);
  }

  @Get()
  findAll() {
    return this.esgPoliciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.esgPoliciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEsgPolicyDto: UpdateEsgPolicyDto) {
    return this.esgPoliciesService.update(+id, updateEsgPolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.esgPoliciesService.remove(+id);
  }
}
