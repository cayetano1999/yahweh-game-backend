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
    return this.teamRepository.find({ relations: ['players', 'church', 'gamesAsTeamA', 'gamesAsTeamB', 'players.shifts'] });
  }

  findOne(id: number): Promise<Team> {
    return this.teamRepository.findOne({ where: { id }, relations: ['players', 'church', 'gamesAsTeamA', 'gamesAsTeamB']});
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id);
  }

  create(team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }

  async update(id: number, team: Team): Promise<Team> {
    // return this.teamRepository.save({ ...team, id });

    await this.teamRepository.update(id, {
    ...team
  });
  // Devuelve el entity actualizado (con la relación si quieres)
  return this.findOne(id);
  }
}
