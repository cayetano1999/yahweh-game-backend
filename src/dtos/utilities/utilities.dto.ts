import { IsInt, IsNotEmpty } from 'class-validator';

export class UtilitiesDto {
  id: number;

  @IsInt()
  currencies: number;

  @IsInt()
  lives: number;

  @IsInt()
  gems: number;

  @IsInt()
  user: number; // User ID
}
