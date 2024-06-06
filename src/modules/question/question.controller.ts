import { Controller, Get, Param, Delete, Post, Body, Query, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { Question } from 'src/entities/question.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserInfoDto } from '../../dtos/user/user-info.dto';
import { UserInfo } from '../../entities/user-info.entity';
import { LevelService } from '../level/level.service';
import { QuestionService } from './question.service';

@Controller('Question')
@ApiTags('Question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('getAll')
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get('byUser/:id')
  getLevelsByUser(@Param('id') id: number): Promise<any> {
    return null //this.questionService.getLevelByUser(id)
  }

  @Get('byLevelCode/:levelCode')
  findByLevelCode(@Param('levelCode') levelCode: number): Promise<any> {
    return this.questionService.getQuestionsByLevelCode(levelCode)
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
