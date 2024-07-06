import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { InningService } from './inning.service';
import { Inning } from 'src/entities/inning.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('Inning')
@ApiTags('Inning')
export class InningController {
  constructor(private readonly inningService: InningService) {}

  @Get()
  findAll(): Promise<Inning[]> {
    return this.inningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inning> {
    return this.inningService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.inningService.remove(+id);
  }

  @Post()
  create(@Body() inning: Inning): Promise<Inning> {
    return this.inningService.create(inning);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() inning: Inning): Promise<Inning> {
    return this.inningService.update(+id, inning);
  }
}
