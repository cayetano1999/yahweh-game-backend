import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inning } from 'src/entities/inning.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InningService {
  constructor(
    @InjectRepository(Inning)
    private inningRepository: Repository<Inning>,
  ) {}

  findAll(): Promise<Inning[]> {
    return this.inningRepository.find({ relations: ['team'] });
  }

  findOne(id: number): Promise<Inning> {
    return this.inningRepository.findOne({ where: { id }, relations: ['team']});
  }

  async remove(id: number): Promise<void> {
    await this.inningRepository.delete(id);
  }

  create(inning: Inning): Promise<Inning> {
    return this.inningRepository.save(inning);
  }

  update(id: number, inning: Inning): Promise<Inning> {
    return this.inningRepository.save({ ...inning, id });
  }
}
