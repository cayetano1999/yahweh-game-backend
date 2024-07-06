import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from 'src/entities/game.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('Game')
@ApiTags('Game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.gameService.remove(+id);
  }

  @Post()
  create(@Body() game: Game): Promise<Game> {
    return this.gameService.create(game);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() game: Game): Promise<Game> {
    return this.gameService.update(+id, game);
  }
}
