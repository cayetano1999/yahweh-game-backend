import { Controller, Get, Param, Delete, Post, Body, Query, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { Level } from 'src/entities/level.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserInfoDto } from '../../dtos/user/user-info.dto';
import { UserInfo } from '../../entities/user-info.entity';
import { LevelService } from './level.service';

@Controller('Level')
@ApiTags('Level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get('getAll')
  findAll(): Promise<Level[]> {
    return this.levelService.findAll();
  }

  @Get('byUser/:id')
  getLevelsByUser(@Param('id') id: number): Promise<any> {
    return this.levelService.getLevelByUser(id)
  }

  @Get()
  findByEmail(@Query('email') email: string): Promise<any> {
    console.log('yes', 'email')
    return null; //this.usersService.getUserByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return null; //this.usersService.remove(id);
  }

  @Post()
  add(@Body() user: CreateUserDto): Promise<UserEntity> {
    return null; //this.usersService.createUser(user);
  }

  @Put('updateUserInfo')
  put(@Body() userInfo: UserInfoDto): Promise<UserInfo> {
    return null; //this.usersService.updateUserInfo(userInfo);
  }
}
