import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Team } from './team.entity'; // <-- ajusta la ruta si es diferente
import { Game } from './game.entity';

@Entity({ name: 'Tournament' })
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @CreateDateColumn({ name: 'creationDate', type: 'timestamp with time zone' })
  creationDate: Date;

  // Clave foránea explícita
  @Column({ name: 'winnerTeamId', type: 'int', nullable: true })
  winnerTeamId?: number | null;

  // Relación con Team
  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: 'winnerTeamId', referencedColumnName: 'id' })
  winnerTeam?: Team | null;

  // 👇 Relación inversa: un torneo tiene muchos juegos
  @OneToMany(() => Game, (game) => game.tournament)
  games: Game[];
}
