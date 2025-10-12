import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gameRepository.find({ where: { isDeleted: false }, relations: ['teamA', 'teamB',  'teamB.church', 'teamA.church'] });
  }

  findOne(id: number): Promise<Game> {
    return this.gameRepository.findOne({ where: { id, isDeleted: false }, relations: ['teamA', 'teamB', 'homeClubTeam', 'shifts', 'homeClubTeam.church', 'teamB.church', 'homeClubTeam.players', 'teamB.players', 'homeClubTeam.players.shifts', 'teamB.players.shifts']});
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.update(id, { isDeleted: true });
  }

  create(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  update(id: number, game: Game): Promise<Game> {
    return this.gameRepository.save({ ...game, id });
  }
}
