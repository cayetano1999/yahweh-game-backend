// users.service.ts
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { UserInfo } from '../../entities/user-info.entity';
import { userInfo } from 'os';
import { UserInfoDto } from '../../dtos/user/user-info.dto';
import { Level } from 'src/entities/level.entity';
import { UpdateLevelEvaluationDto } from 'src/dtos/user/update-level-evaluation.dto';
import { UserEvaluation } from '../../entities/user-evaluation.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,

    @InjectRepository(UserEvaluation)
    private userEvaluationRepository: Repository<UserEvaluation>

  ) { }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      relations: ['levels', 'userInfo']
    });
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne({where: { id: Number(id)}, relations:['levels', 'userInfo'] });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(userData: Partial<CreateUserDto>): Promise<UserEntity> {

    const userExist = await this.usersRepository.findOne({ where: { email: userData.email } });

    if (userExist) {
      throw new ConflictException('Usuario ya existe')
    }

    const newUser = this.usersRepository.create(userData);
    console.log(newUser);
    newUser.levels = 1 as any;
    newUser.userInfo = null;
    newUser.utilities = null;
    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    const user = await this.usersRepository.save(newUser as UserEntity);
    console.log(user)
    userData.userInfo['user'] = user.id
    console.log(userData.userInfo)
    const userInfo = await this.userInfoRepository.save(userData.userInfo);
    user.userInfo = userInfo.id as any;

    const userUpdated = await this.updateUser(user.id, userData)
    return userUpdated;
  }


  async updateUser(id: number, updateData: Partial<CreateUserDto>): Promise<UserEntity> {
    const user = await this.findOne(String(id));
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = this.usersRepository.merge(user, updateData);
    const errors = await validate(updatedUser);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }

    if (updateData.userInfo) {
      const userInfo = await this.userInfoRepository.findOneBy({ id: user.userInfo.id });
      if (userInfo) {
        this.userInfoRepository.merge(userInfo, updateData.userInfo);
        await this.userInfoRepository.save(userInfo);
      } else {
        updateData.userInfo['user'] = user.id;
        await this.userInfoRepository.save(updateData.userInfo);
      }
    }

    return this.usersRepository.save(updatedUser);
  }

  async getUserByEmail(email: string) {
    if (!email) {
      throw new BadRequestException("Email requerido");
    }
  
    const userExist = await this.usersRepository.findOne({
      where: { email },
      relations: ['levels', 'userInfo']
    });
  
    return userExist || null;
  }


  async updateUserInfo(userInfo: UserInfoDto) {
    const userInfoResult = await this.userInfoRepository.findOneBy({ id: userInfo.id});
    if (userInfoResult) {
      this.userInfoRepository.merge(userInfoResult, userInfo);
      return await this.userInfoRepository.save(userInfo);
    }
  }

 async updateLevelAndEvaluation(levelEvaluation: UpdateLevelEvaluationDto) {

    //buscar usuario
    const user = await this.usersRepository.findOneBy({ id: levelEvaluation.userId});

    if(!user){
      throw new NotFoundException('Usuario no encontrado')
    }

    user.levels = levelEvaluation.levelId + 1 as any;
    await this.usersRepository.save(user);

    const userEv: UserEvaluation = {
      evaluationDate: new Date(),
      user: levelEvaluation.userId as any,
      level: levelEvaluation.levelId as any,
      calification: levelEvaluation.calification,
      id: 0
    }
    await this.userEvaluationRepository.save(userEv)

  }

  


}
