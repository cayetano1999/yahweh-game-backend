import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from 'src/entities/chapter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
  ) {}

  findAll(): Promise<Chapter[]> {
    return this.chapterRepository.find({ relations: ['players'] });
  }

  findOne(id: number): Promise<Chapter> {
    return this.chapterRepository.findOne({ where: { id }, relations: ['players'] });
  }

  async remove(id: number): Promise<void> {
    await this.chapterRepository.delete(id);
  }

  create(chapter: Chapter): Promise<Chapter> {
    return this.chapterRepository.save(chapter);
  }

  update(id: number, chapter: Chapter): Promise<Chapter> {
    return this.chapterRepository.save({ ...chapter, id });
  }
}
