import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { Shift } from 'src/entities/shift.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('Shift')
@ApiTags('Shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get()
  findAll(): Promise<Shift[]> {
    return this.shiftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Shift> {
    return this.shiftService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shiftService.remove(+id);
  }

  @Post()
  create(@Body() shift: Shift): Promise<Shift> {
    return this.shiftService.create(shift);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() shift: Shift): Promise<Shift> {
    return this.shiftService.update(+id, shift);
  }
}
