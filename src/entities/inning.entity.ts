import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.entity';
import { Game } from './game.entity';

@Entity('Inning')
export class Inning {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, team => team.innings)
  game: Game;

  @Column({ nullable: true })
  inning: number;

  @Column({ nullable: true })
  runsTeamA: number;

  @Column({ nullable: true })
  runsTeamB: number;

}
