import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ApiTags } from '@nestjs/swagger';
import { Chapter } from 'src/entities/chapter.entity';

@Controller('Chapter')
@ApiTags('Chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get()
  findAll(): Promise<Chapter[]> {
    return this.chapterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Chapter> {
    return this.chapterService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.chapterService.remove(+id);
  }

  @Post()
  create(@Body() chapter: Chapter): Promise<Chapter> {
    return this.chapterService.create(chapter);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() chapter: Chapter): Promise<Chapter> {
    return this.chapterService.update(+id, chapter);
  }
}
