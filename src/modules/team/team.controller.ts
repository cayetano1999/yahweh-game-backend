import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from 'src/entities/team.entity';

@Controller('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamService.remove(+id);
  }

  @Post()
  create(@Body() team: Team): Promise<Team> {
    return this.teamService.create(team);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() team: Team): Promise<Team> {
    return this.teamService.update(+id, team);
  }
}
