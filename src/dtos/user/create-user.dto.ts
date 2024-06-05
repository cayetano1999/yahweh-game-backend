import { UserInfoDto } from "./user-info.dto";

export class CreateUserDto {
    name: string = '';
    email: string = '';
    age: number = 0;
    religion: boolean = false;
    biblicalKnowledge: string = '';
    questionType: string = '';
    profilePhoto: string = '';
    country: string = '';
    levelsId: number = 0;

    userInfo: UserInfoDto;
}

