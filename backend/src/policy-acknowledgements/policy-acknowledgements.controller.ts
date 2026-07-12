import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolicyAcknowledgementsService } from './policy-acknowledgements.service';
import { CreatePolicyAcknowledgementDto } from './dto/create-policy-acknowledgement.dto';
import { UpdatePolicyAcknowledgementDto } from './dto/update-policy-acknowledgement.dto';

@Controller('policy-acknowledgements')
export class PolicyAcknowledgementsController {
  constructor(private readonly policyAcknowledgementsService: PolicyAcknowledgementsService) {}

  @Post()
  create(@Body() createPolicyAcknowledgementDto: CreatePolicyAcknowledgementDto) {
    return this.policyAcknowledgementsService.create(createPolicyAcknowledgementDto);
  }

  @Get()
  findAll() {
    return this.policyAcknowledgementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyAcknowledgementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyAcknowledgementDto: UpdatePolicyAcknowledgementDto) {
    return this.policyAcknowledgementsService.update(+id, updatePolicyAcknowledgementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policyAcknowledgementsService.remove(+id);
  }
}
