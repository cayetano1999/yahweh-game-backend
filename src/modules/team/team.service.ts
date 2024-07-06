import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['players', 'church', 'gamesAsTeamA', 'gamesAsTeamB', 'innings', 'players.shifts'] });
  }

  findOne(id: number): Promise<Team> {
    return this.teamRepository.findOne({ where: { id }, relations: ['players', 'church', 'gamesAsTeamA', 'gamesAsTeamB', 'innings']});
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id);
  }

  create(team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }

  update(id: number, team: Team): Promise<Team> {
    return this.teamRepository.save({ ...team, id });
  }
}
