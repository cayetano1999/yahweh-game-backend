// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { UserInfo } from '../../entities/user-info.entity';
import { UserEvaluation } from '../../entities/user-evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([UserInfo]), TypeOrmModule.forFeature([UserEvaluation])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

