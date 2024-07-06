import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Church } from 'src/entities/chursh.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChurchService {
  constructor(
    @InjectRepository(Church)
    private churchRepository: Repository<Church>,
  ) {}

  findAll(): Promise<Church[]> {
    return this.churchRepository.find({ relations: ['players', 'teams'] });
  }

  findOne(id: number): Promise<Church> {
    return this.churchRepository.findOne({ where: { id }, relations: ['players', 'teams'] });
  }

  async remove(id: number): Promise<void> {
    await this.churchRepository.delete(id);
  }

  create(church: Church): Promise<Church> {
    return this.churchRepository.save(church);
  }

  update(id: number, church: Church): Promise<Church> {
    return this.churchRepository.save({ ...church, id });
  }
}
