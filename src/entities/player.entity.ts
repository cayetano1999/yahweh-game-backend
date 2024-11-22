import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';
import { Church } from './chursh.entity';
import { Shift } from './shift.entity';
import { Team } from './team.entity';


@Entity('Player')
export class  Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  number: number;

  @ManyToOne(() => Team, team => team.players)
  team: Team;

  @ManyToOne(() => Chapter, chapter => chapter.players)
  chapter: Chapter;

  @ManyToOne(() => Church, church => church.players)
  church: Church;

  @Column({ nullable: true })
  picture: string;

  @OneToMany(() => Shift, shift => shift.player)
  shifts: Shift[];
}
