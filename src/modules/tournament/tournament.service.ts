import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from 'src/entities/tournament.entity';
import { CreateTournamentDto, UpdateTournamentDto } from 'src/dtos/tournament/create-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepo: Repository<Tournament>,
  ) {}

  findAll(): Promise<Tournament[]> {
    return this.tournamentRepo.find({ where: { isDeleted: false }, relations: ['winnerTeam'] });
  }

  async findOne(id: number): Promise<Tournament> {
    const item = await this.tournamentRepo.findOne({
      where: { id, isDeleted: false },
      relations: ['winnerTeam'],
    });
    if (!item) throw new NotFoundException(`Tournament ${id} no encontrado`);
    return item;
  }

  async create(dto: CreateTournamentDto): Promise<Tournament> {
    const entity = this.tournamentRepo.create({
      name: dto.name,
      winnerTeamId: dto.winnerTeamId ?? null,
    });
    return this.tournamentRepo.save(entity);
  }

 async update(id: number, dto: UpdateTournamentDto): Promise<Tournament> {
  await this.tournamentRepo.update(id, {
    name: dto.name,
    winnerTeamId: dto.winnerTeamId ?? null,
  });
  // Devuelve el entity actualizado (con la relación si quieres)
  return this.findOne(id);
}

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.tournamentRepo.update(entity.id, { isDeleted: true });
  }
}
