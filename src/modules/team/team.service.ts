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

 async findAll(): Promise<Team[]> {
  const teams = await this.teamRepository
    .createQueryBuilder('team')
    .leftJoinAndSelect('team.church', 'church')
    .leftJoinAndSelect('team.players', 'player', 'player.isDeleted = false')
    .where('team.isDeleted = false')
    .getMany();

  return teams;
}

  findOne(id: number): Promise<Team> {
    return this.teamRepository.findOne({ where: { id, isDeleted: false }, relations: ['players', 'church'] });
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.update(id, { isDeleted: true });
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
