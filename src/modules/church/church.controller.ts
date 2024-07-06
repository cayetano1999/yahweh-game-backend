import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { ChurchService } from './church.service';
import { ApiTags } from '@nestjs/swagger';
import { Church } from 'src/entities/chursh.entity';

@Controller('Church')
@ApiTags('Church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Get()
  findAll(): Promise<Church[]> {
    return this.churchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Church> {
    return this.churchService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.churchService.remove(+id);
  }

  @Post()
  create(@Body() church: Church): Promise<Church> {
    return this.churchService.create(church);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() church: Church): Promise<Church> {
    return this.churchService.update(+id, church);
  }
}
