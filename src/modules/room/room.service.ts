import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Room } from 'src/entities/room.entity';
import { CreateRoomDto } from 'src/dtos/room/create-room.dto';
import { UpdateRoomDto } from 'src/dtos/room/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>
  ) {}

create(data: Partial<CreateRoomDto>): Promise<Room> {
  const room = this.roomRepository.create(data as DeepPartial<Room>);
  return this.roomRepository.save(room);
}


  findAll(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['mainUser', 'guestUser', 'leavedUser'] });
  }

  findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id },
      relations: ['mainUser', 'guestUser', 'leavedUser']
    });
  }

  async update(id: number, data: UpdateRoomDto): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) throw new NotFoundException(`Room with id ${id} not found`);
    Object.assign(room, data);
    return this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
