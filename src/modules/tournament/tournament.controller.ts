import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TournamentService } from './tournament.service';
  // Ajusta la ruta según tu estructura
import { Tournament } from 'src/entities/tournament.entity';
import { CreateTournamentDto, UpdateTournamentDto } from 'src/dtos/tournament/create-tournament.dto';

@Controller('Tournament')
@ApiTags('Tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los torneos del beisbol' })
  @ApiResponse({ status: 200, type: [Tournament] })
  findAll(): Promise<Tournament[]> {
    return this.tournamentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un torneo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Tournament })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tournament> {
    return this.tournamentService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un torneo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Eliminado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tournamentService.remove(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un torneo' })
  @ApiBody({ type: CreateTournamentDto })
  @ApiResponse({ status: 201, type: Tournament })
  create(@Body() dto: CreateTournamentDto): Promise<Tournament> {
    return this.tournamentService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un torneo' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTournamentDto })
  @ApiResponse({ status: 200, type: Tournament })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTournamentDto,
  ): Promise<Tournament> {
    return this.tournamentService.update(id, dto);
  }
}
