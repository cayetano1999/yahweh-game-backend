import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { UserEvaluation } from '../../entities/user-evaluation.entity';
import { Question } from 'src/entities/question.entity';
import { Level } from 'src/entities/level.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionRepository.find({
      relations: ['level'],
    });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['level'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async createQuestion(questionData: Partial<Question>): Promise<Question> {
    const questionExist = await this.questionRepository.findOne({
      where: { title: questionData.title },
    });

    if (questionExist) {
      throw new ConflictException('Question already exists');
    }

    const newQuestion = this.questionRepository.create(questionData);
    const errors = await validate(newQuestion);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    return this.questionRepository.save(newQuestion);
  }

  async updateQuestion(id: number, updateData: Partial<Question>): Promise<Question> {
    const question = await this.findOne(id);

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    const updatedQuestion = this.questionRepository.merge(question, updateData);
    const errors = await validate(updatedQuestion);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    return this.questionRepository.save(updatedQuestion);
  }

  async getQuestionsByQuantity(quantity: number): Promise<Question[]> {
    const allQuestions = await this.findAll();
    return this.getRandomItems(allQuestions, quantity);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    await this.questionRepository.delete(id);
  }



  async getQuestionsByLevelCode(levelCode: number): Promise<Question[]> {
    const level = await this.levelRepository.findOne({ where: { code: levelCode } });

    if (!level) {
      throw new NotFoundException(`Level with code ${levelCode} not found`);
    }

    const questions = await this.questionRepository.find({
      where: { level: { id: level.id } },
      // relations: ['level'],
    });

    return this.getRandomItems(questions, level.valueTarget);
  }


  private getRandomItems<T>(array: T[], itemCount: number): T[] {
    if (itemCount >= array.length) {
      return array;
    }
  
    const result: T[] = [];
    const arrayCopy = [...array];
  
    for (let i = 0; i < itemCount; i++) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      result.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1); // Remove the selected item from the copy
    }
  
    return result;
  }

  async getQuestionsByLevelAndType(
  difficulty: 'bajo' | 'medio' | 'alto',
  types: ('multiple' | 'boolean' | 'written')[],
  amount: number
): Promise<Question[]> {
  if (!difficulty || !types?.length || !amount) {
    throw new BadRequestException('Parámetros incompletos');
  }

  

  const result = await this.questionRepository.query(
    `SELECT * FROM get_questions_by_level_and_type($1, $2, $3);`,
    [difficulty, types, amount]
  );

  return result;
}
  
}
