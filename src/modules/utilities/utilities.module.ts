import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilities } from 'src/entities/utilities.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Utilities, UserEntity])],
  providers: [UtilitiesService],
  exports: [UtilitiesService],
  controllers: [UtilitiesController],
})
export class UtilitiesModule {}
