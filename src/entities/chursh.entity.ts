import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from './player.entity';
import { Team } from './team.entity';

@Entity('Church')
export class Church {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => Player, player => player.church)
  players: Player[];

  @OneToMany(() => Team, team => team.church)
  teams: Team[];
}
