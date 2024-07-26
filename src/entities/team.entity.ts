import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Player } from './player.entity';
import { Church } from './chursh.entity';
import { Game } from './game.entity';
import { Inning } from './inning.entity';


@Entity('Team')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  slogan: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToOne(() => Church, church => church.teams)
  church: Church;

  @Column({ nullable: true })
  colorBase: string;

  @OneToMany(() => Player, player => player.team)
  players: Player[];

  @OneToMany(() => Game, game => game.teamA)
  gamesAsTeamA: Game[];

  @OneToMany(() => Game, game => game.teamB)
  gamesAsTeamB: Game[];

  // @OneToMany(() => Inning, inning => inning.teamA)
  // innings: Inning[];
  
}
