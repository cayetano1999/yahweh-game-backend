// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from 'src/entities/level.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserInfo } from '../../entities/user-info.entity';
import { UserEvaluation } from '../../entities/user-evaluation.entity';
import { Question } from 'src/entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), TypeOrmModule.forFeature([Question])],
  providers: [QuestionService],
  exports: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}

