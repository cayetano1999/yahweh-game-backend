import { IsBoolean, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateRoomDto {
  allQuestions: string;
  chat: boolean;
  code: string;
  name: string;
  private: boolean;
  questions: number;
  currencies: number;
  levelType: string;
  roomMessages: string;
  questionTypes: string;
  roomStatus: string;
  completeDate?: Date;
   mainUserCorrectAnswers: number;
   mainUserIncorrectAnswers: number;
   guestUserCorrectAnswers: number;
   guestUserIncorrectAnswers: number;
   mainUser: number;
   guestUser: number;
   leavedUser?: number;
}
