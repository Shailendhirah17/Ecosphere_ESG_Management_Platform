import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KudosService } from './kudos.service';

@Controller('kudos')
export class KudosController {
  constructor(private readonly kudosService: KudosService) {}

  @Post()
  create(@Body() createKudoDto: any) {
    return this.kudosService.create(createKudoDto);
  }

  @Get()
  findAll() {
    return this.kudosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kudosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKudoDto: any) {
    return this.kudosService.update(+id, updateKudoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kudosService.remove(+id);
  }
}
