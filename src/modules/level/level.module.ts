// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from 'src/entities/level.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserInfo } from '../../entities/user-info.entity';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { UserEvaluation } from '../../entities/user-evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), TypeOrmModule.forFeature([UserEvaluation])],
  providers: [LevelService],
  exports: [LevelService],
  controllers: [LevelController]
})
export class LevelModule {}

