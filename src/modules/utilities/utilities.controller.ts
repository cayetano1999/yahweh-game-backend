import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UtilitiesService } from './utilities.service';
import { UtilitiesDto } from 'src/dtos/utilities/utilities.dto';
import { validate } from 'class-validator';

@Controller('utilities')
@ApiTags('Utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) { }

  @Get()
  findAll(): Promise<UtilitiesDto[]> {
    return this.utilitiesService.findAll();
  }

  @Post('update-currencies-after-game')
  async updateCurrenciesAfterGame(
    @Body()
    dto: {
      winner: { id: number; currencies: number };
      loser: { id: number; currencies: number };
    }
  ): Promise<any[]> {
    return this.utilitiesService.updateCurrenciesAfterGameSP(dto);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UtilitiesDto> {
    return this.utilitiesService.findOne(id);
  }

  // @Post()
  // create(@Body() data: UtilitiesDto): Promise<UtilitiesDto> {
  //   return this.utilitiesService.createUtilities(data);
  // }
  @Post()
  async create(@Body() dto: UtilitiesDto): Promise<UtilitiesDto> {
    // Valida el DTO (que tiene decoradores de validación)
    return this.utilitiesService.createUtilities(dto);
  }

  @Put()
  update(
    @Body() updateData: UtilitiesDto
  ): Promise<UtilitiesDto> {
    return this.utilitiesService.updateUtilities(updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.utilitiesService.remove(id);
  }



}
