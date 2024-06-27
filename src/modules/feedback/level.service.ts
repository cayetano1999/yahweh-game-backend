import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { FeedBack } from 'src/entities/feedback.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class FeedBackService {
  constructor(
    @InjectRepository(FeedBack)
    private feedbackRepository: Repository<FeedBack>,

  ) {}

  findAll(): Promise<FeedBack[]> {
    return this.feedbackRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<FeedBack> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return feedback;
  }

  async createFeedback(feedbackData: Partial<FeedBack>): Promise<FeedBack> {
    const newFeedback = this.feedbackRepository.create(feedbackData);
    const errors = await validate(newFeedback);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    return this.feedbackRepository.save(newFeedback);
  }

  async updateFeedback(id: number, updateData: Partial<FeedBack>): Promise<FeedBack> {
    const feedback = await this.findOne(id);

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    const updatedFeedback = this.feedbackRepository.merge(feedback, updateData);
    const errors = await validate(updatedFeedback);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    return this.feedbackRepository.save(updatedFeedback);
  }

  async remove(id: number): Promise<void> {
    const feedback = await this.findOne(id);

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    await this.feedbackRepository.delete(id);
  }
}
