import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

@Entity('Inning')
export class Inning {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, team => team.innings)
  team: Team;

  @Column({ default: 0 })
  runs: number;
}
