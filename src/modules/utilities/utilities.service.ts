import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { Utilities } from 'src/entities/utilities.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UtilitiesDto } from 'src/dtos/utilities/utilities.dto';

@Injectable()
export class UtilitiesService {
  constructor(
    @InjectRepository(Utilities)
    private readonly utilitiesRepository: Repository<Utilities>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAll(): Promise<UtilitiesDto[]> {
    const utilities = await this.utilitiesRepository.find({ relations: ['user'] });
    return utilities.map(this.toDto);
  }

  async findOne(id: number): Promise<UtilitiesDto> {
    const utilities = await this.utilitiesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!utilities) throw new NotFoundException(`Utilities with ID ${id} not found`);
    return this.toDto(utilities);
  }

  async createUtilities(dto: UtilitiesDto): Promise<UtilitiesDto> {
    const user = await this.userRepository.findOne({ where: { id: dto.user } });
    if (!user) throw new BadRequestException('User not found');

    const entity = this.utilitiesRepository.create({
      currencies: dto.currencies,
      lives: dto.lives,
      gems: dto.gems,
      user,
    });
    const saved = await this.utilitiesRepository.save(entity);
    return this.toDto(saved);
  }

  async updateUtilities(data: UtilitiesDto): Promise<UtilitiesDto> {
    const utilities = await this.utilitiesRepository.findOne({ where: { id: data.id }, relations: ['user'] });
    if (!utilities) throw new NotFoundException(`Utilities with ID ${data.id} not found`);

    // Si incluye 'user', actualiza la relación
    if (data.user) {
      const user = await this.userRepository.findOne({ where: { id: data.user } });
      if (!user) throw new BadRequestException('User not found');
      utilities.user = user;
    }
    Object.assign(utilities, data);

    // const errors = await validate(utilities);
    // if (errors.length > 0) throw new BadRequestException('Validation failed!');

    const updated = await this.utilitiesRepository.save(utilities);
    return this.toDto(updated);
  }

  async remove(id: number): Promise<void> {
    const utilities = await this.utilitiesRepository.findOne({ where: { id } });
    if (!utilities) throw new NotFoundException(`Utilities with ID ${id} not found`);
    await this.utilitiesRepository.delete(id);
  }

  private toDto(entity: Utilities): UtilitiesDto {
    return {
      id: entity.id,
      currencies: entity.currencies,
      lives: entity.lives,
      gems: entity.gems,
      user: entity.user?.id,
    };
  }

  async updateCurrenciesAfterGameSP(dto: {
  winner: { id: number; currencies: number };
  loser: { id: number; currencies: number };
}): Promise<any[]> {
  const query = `
    SELECT * FROM update_utilities_after_game($1, $2, $3, $4)
  `;
  const params = [
    dto.winner.id,
    dto.winner.currencies,
    dto.loser.id,
    dto.loser.currencies,
  ];

  const result = await this.utilitiesRepository.query(query, params);
  return result;
}
}
