import { IsInt, IsNotEmpty } from 'class-validator';

export class UtilitiesDto {
  id: number;
  currencies: number;
  lives: number;
  gems: number;
  user: number; // User ID
}
