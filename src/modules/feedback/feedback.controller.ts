import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedBack } from 'src/entities/feedback.entity';
import { FeedBackService } from './level.service';

@Controller('FeedBack')
@ApiTags('FeedBack')

export class FeedBackController {
  constructor(private readonly feedbackService: FeedBackService) {}

  @Get()
  findAll(): Promise<FeedBack[]> {
    return this.feedbackService.findAll();
  }
    
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FeedBack> {
    return this.feedbackService.findOne(id);
  }

  @Post()
  create(@Body() feedbackData: Partial<FeedBack>): Promise<FeedBack> {
    return this.feedbackService.createFeedback(feedbackData);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<FeedBack>): Promise<FeedBack> {
    return this.feedbackService.updateFeedback(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.feedbackService.remove(id);
  }
}
