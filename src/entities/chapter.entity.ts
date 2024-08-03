import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from './player.entity';

@Entity('Chapter')
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  chapterNumber: number;

  @Column({ default: 0 })
  hitsCount: number;

  @Column({ default: 0 })
  doublesCount: number;

  @Column({ default: 0 })
  triplesCount: number;

  @Column({ default: 0 })
  homeRunsCount: number;

  @Column({ default: 0 })
  basesOnBallsCount: number;

  @Column({nullable: true})   
  bookName: string;

  @Column({nullable: true})   
  verses: number;

  @OneToMany(() => Player, player => player.chapter)
  players: Player[];
}
