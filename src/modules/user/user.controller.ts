import { Controller, Get, Param, Delete, Post, Body, Query, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './user.service';
import { UserInfoDto } from '../../dtos/user/user-info.dto';
import { UserInfo } from '../../entities/user-info.entity';
import { UpdateLevelEvaluationDto } from 'src/dtos/user/update-level-evaluation.dto';

@Controller('User')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAll')
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Get()
  findByEmail(@Query('email') email: string): Promise<any> {
    console.log('yes', 'email')
    return this.usersService.getUserByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post()
  add(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(user);
  }

  @Put('updateUserInfo')
  put(@Body() userInfo: UserInfoDto): Promise<UserInfo> {
    return this.usersService.updateUserInfo(userInfo);
  }

  @Put('updateUserLevelEvaluation')
  updateUserLevelEvaluation(@Body() userLevelEvaluation: UpdateLevelEvaluationDto): Promise<any> {
    return this.usersService.updateLevelAndEvaluation(userLevelEvaluation);
  }
}
