// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedBack } from 'src/entities/feedback.entity';
import { FeedBackController } from './feedback.controller';
import { FeedBackService } from './level.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBack])],
  providers: [FeedBackService],
  exports: [FeedBackService],
  controllers: [FeedBackController]
})
export class FeedBackModule {}

