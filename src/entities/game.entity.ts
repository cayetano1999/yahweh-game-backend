import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { Shift } from './shift.entity';

@Entity('Game')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, team => team.gamesAsTeamA)
  teamA: Team;

  @ManyToOne(() => Team, team => team.gamesAsTeamB)
  teamB: Team;

  @Column({ type: 'timestamp', nullable: false })
  initialDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;


  @Column({ default: 0 })
  gameDuration: number;

  @Column({ default: 0 })
  innings: number;

  @Column({ default: 0 })
  errorsTeamA: number;

  @Column({ default: 0 })
  errorsTeamB: number;

  @Column({ default: 0 })
  hitsTeamA: number;

  @Column({ default: 0 })
  hitsTeamB: number;

  @Column({ default: 0 })
  runsTeamA: number;

  @Column({ default: 0 })
  runsTeamB: number;

  @ManyToOne(() => Team, team => team)
  homeClubTeam: Team;

  @OneToMany(() => Shift, shift => shift.game)
  shifts: Shift[];
}
