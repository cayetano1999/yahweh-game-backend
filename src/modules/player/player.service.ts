import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playerRepository.find({ relations: ['team', 'chapter', 'church', 'shifts'] });
  }

  findOne(id: number): Promise<Player> {
    return this.playerRepository.findOne({ where: { id }, relations: ['team', 'chapter', 'church', 'shifts']})
  }

  async remove(id: number): Promise<void> {
    await this.playerRepository.delete(id);
  }

  create(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  update(id: number, player: Player): Promise<Player> {
    return this.playerRepository.save({ ...player, id });
  }
}
