import { Controller, Get, Param, Post, Body, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { Room } from 'src/entities/room.entity';
import { CreateRoomDto } from 'src/dtos/room/create-room.dto';
import { UpdateRoomDto } from 'src/dtos/room/update-room.dto';

@Controller('Room')
@ApiTags('Room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() dto: CreateRoomDto): Promise<Room> {
    return this.roomService.create(dto);
  }

  @Get('getAll')
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Room> {
    if (isNaN(id)) {
      throw new BadRequestException('El ID debe ser un número válido.');
    }
    return this.roomService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRoomDto): Promise<Room> {
    if (isNaN(id)) {
      throw new BadRequestException('El ID debe ser un número válido.');
    }
    return this.roomService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    if (isNaN(id)) {
      throw new BadRequestException('El ID debe ser un número válido.');
    }
    return this.roomService.remove(+id);
  }
}
