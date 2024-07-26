import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Inning } from 'src/entities/inning.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InningService {
  constructor(
    @InjectRepository(Inning)
    private inningRepository: Repository<Inning>,
  ) {}

  findAll(): Promise<Inning[]> {
    return this.inningRepository.find({ relations: ['game'] });
  }

  findOne(id: number): Promise<Inning> {
    return this.inningRepository.findOne({ where: { id }, relations: ['game']});
  }

  async remove(id: number): Promise<void> {
    await this.inningRepository.delete(id);
  }

  create(inning: Inning): Promise<Inning> {
    return this.inningRepository.save(inning);
  }

  async update(id: number, inning: Inning): Promise<Inning> {

    const inningBase = await this.findOne(id);

    const updateInning = this.inningRepository.merge(inningBase, inning);
    const errors = await validate(updateInning);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    // return this.questionRepository.save(updatedQuestion);
    return this.inningRepository.save(inning);
  }
}
