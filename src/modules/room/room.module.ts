import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { UserEntity } from 'src/entities/user.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, UserEntity])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
