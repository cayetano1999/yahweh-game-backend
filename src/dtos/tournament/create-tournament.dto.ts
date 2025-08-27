import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateTournamentDto {
 
  name: string;

 
  winnerTeamId?: number | null;
}



export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {}


