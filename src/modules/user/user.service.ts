// users.service.ts
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { UserInfo } from '../../entities/user-info.entity';
import { UserInfoDto } from '../../dtos/user/user-info.dto';
import { UpdateLevelEvaluationDto } from 'src/dtos/user/update-level-evaluation.dto';
import { UserEvaluation } from '../../entities/user-evaluation.entity';
import { UserStatusDto } from 'src/dtos/user/user-status.dto';
import { UpdatePushTokenDto } from 'src/dtos/user/update-pushtoken.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,

    @InjectRepository(UserEvaluation)
    private userEvaluationRepository: Repository<UserEvaluation>,

  ) { }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      relations: ['levels', 'userInfo']
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    const result = await this.usersRepository.findOne({ where: { id: Number(id) }, relations: ['levels', 'userInfo', 'utilities'] });
    return result;
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: Number(id) },
      relations: ['userInfo', 'evaluations', 'feedbacks', 'utilities'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user); // Esto elimina en cascada
  }

  async updateUserStatus(userStatus: UserStatusDto): Promise<UserEntity> {

    //buscar usuario
    const user = await this.usersRepository.findOne({ where: { id: userStatus.id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    // Actualizar el estado del usuario
    const updatedUser = this.usersRepository.merge(user, { active: userStatus.status, email: userStatus.email });
   
    // Guardar el usuario actualizado
    return this.usersRepository.save(updatedUser);

    // return this.usersRepository.save({ id, active: status });
  }

  async updateUserPushToken(userStatus: UpdatePushTokenDto): Promise<UserEntity> {

    //buscar usuario
    const user = await this.usersRepository.findOne({ where: { id: userStatus.id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    // Actualizar el estado del usuario
    const updatedUser = this.usersRepository.merge(user, { pushToken: userStatus.pushToken});
    
    // Guardar el usuario actualizado
    return this.usersRepository.save(updatedUser);

    // return this.usersRepository.save({ id, active: status });
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
      relations: ['levels', 'userInfo', 'utilities']
    });

    return userExist || { error: true, message: 'Usuario no encontrado' };
  }


  async updateUserInfo(userInfo: UserInfoDto) {
    const userInfoResult = await this.userInfoRepository.findOneBy({ id: userInfo.id });
    if (userInfoResult) {
      this.userInfoRepository.merge(userInfoResult, userInfo);
      return await this.userInfoRepository.save(userInfo);
    }
  }

  async updateLevelAndEvaluation(levelEvaluation: UpdateLevelEvaluationDto) {

    //buscar usuario
    const user = await this.usersRepository.findOne({ where: { id: levelEvaluation.userId }, relations: ['levels'] });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const userLevel = user.levels as any;
    user.levels = userLevel.nextLevel as any;
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
