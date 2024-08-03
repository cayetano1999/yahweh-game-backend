import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiTags } from '@nestjs/swagger';
import { Player } from 'src/entities/player.entity';

@Controller('Player')
@ApiTags('Player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.playerService.remove(+id);
  }

  @Post()
  create(@Body() player: Player): Promise<Player> {
    return this.playerService.create(player);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() player: Player): Promise<Player> {
    return this.playerService.update(+id, player);
  }
}
