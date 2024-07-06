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
    return this.gameRepository.find({ relations: ['teamA', 'teamB', 'homeClubTeam', 'shifts'] });
  }

  findOne(id: number): Promise<Game> {
    return this.gameRepository.findOne({ where: { id }, relations: ['teamA', 'teamB', 'homeClubTeam', 'shifts']});
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  create(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  update(id: number, game: Game): Promise<Game> {
    return this.gameRepository.save({ ...game, id });
  }
}
