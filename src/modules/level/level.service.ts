import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from 'src/entities/level.entity';
// import { CreateLevelDto } from 'src/dtos/level/create-level.dto';
// import { UpdateLevelDto } from 'src/dtos/level/update-level.dto';
import { validate } from 'class-validator';
import { UserEvaluation } from '../../entities/user-evaluation.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,

    @InjectRepository(UserEvaluation)
    private userEvaluationRepository: Repository<UserEvaluation>,
  ) {}

  findAll(): Promise<Level[]> {
    return this.levelRepository.find({
      relations: ['users', 'questions', 'evaluations'],
    });
  }

  async findOne(code: number): Promise<any> {
    const level = await this.levelRepository.findOne({
      where: { code: code },
      relations: ['users', 'questions'],
    });

    const newLevel = {
      ...level,
      levelUsersCount: level.users.length,
      questionCount: level.questions.length
    }

    delete newLevel.users;
    delete newLevel.questions;
    return newLevel;
  }

  async createLevel(levelData: Partial<any>): Promise<Level> {
    const levelExist = await this.levelRepository.findOne({
      where: { code: levelData.code },
    });

    if (levelExist) {
      throw new ConflictException('Level already exists');
    }

    const newLevel = this.levelRepository.create(levelData);
    const errors = await validate(newLevel);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    return this.levelRepository.save(newLevel);
  }

  async updateLevel(id: number, updateData: Partial<any>): Promise<Level> {
    const level = await this.findOne(id);

    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }

    const updatedLevel = this.levelRepository.merge(level, updateData);
    const errors = await validate(updatedLevel);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    return this.levelRepository.save(updatedLevel);
  }

  async remove(id: number): Promise<void> {
    const level = await this.findOne(id);

    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }

    await this.levelRepository.delete(id);
  }


  async getLevelByUser(userId: number) {

    let levels = await this.levelRepository.find()
    const evaluations = await this.userEvaluationRepository.find({where: {user: {id: userId}}, relations:['user', 'level']})
    let newLevels = levels.map((item)=> {
      let ev = evaluations.find((ev)=> ev?.user?.id == userId && ev?.level?.id == item.id);
      return {
        ...item,
        calification: ev?.calification || null,
      }
    })
    return newLevels;

  }
}
