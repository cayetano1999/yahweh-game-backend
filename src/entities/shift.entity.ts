import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Player } from "./player.entity";
import { Game } from "./game.entity";

@Entity('Shift')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, player => player.shifts)
  player: Player;

  @Column({ nullable: false })
  shiftType: string; // H1, H2, H3, BB, H4

  @Column({ nullable: false })
  result: string; // success or no success

  @ManyToOne(() => Game, game => game.shifts)
  game: Game;

  @Column({ default: 0 })
  rbis: number; // carreras impulsadas en el turno
}
