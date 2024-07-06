import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from 'src/entities/shift.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
  ) {}

  findAll(): Promise<Shift[]> {
    return this.shiftRepository.find({ relations: ['player', 'game'] });
  }

  findOne(id: number): Promise<Shift> {
    return this.shiftRepository.findOne({ where: { id }, relations: ['player', 'game']})
  }

  async remove(id: number): Promise<void> {
    await this.shiftRepository.delete(id);
  }

  create(shift: Shift): Promise<Shift> {
    return this.shiftRepository.save(shift);
  }

  update(id: number, shift: Shift): Promise<Shift> {
    return this.shiftRepository.save({ ...shift, id });
  }
}
