import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { FeedBack } from './feedback.entity';
import { Level } from './level.entity';
import { UserEvaluation } from './user-evaluation.entity';
import { UserInfo } from './user-info.entity';
import { Utilities } from './utilities.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  religion: boolean;

  @Column({ nullable: false })
  biblicalKnowledge: string;

  @Column({ nullable: false })
  questionType: string;

  @Column({ nullable: false })
  profilePhoto: string;

  @Column({ nullable: false })
  country: string;

  /*────────── Relaciones ──────────*/

  /** 1-a-1 → FK vive en esta tabla (userInfoId) */
  @OneToOne(() => UserInfo, ui => ui.user)
  @JoinColumn({ name: 'userInfoId' }) // ← FK aquí
  userInfo: UserInfo;

  /** Muchos usuarios pueden pertenecer a un mismo Level */
  @ManyToOne(() => Level, level => level.users)
  @JoinColumn({ name: 'levelId' })
  levels: Level;

  /** 1-a-1 con Utilities */
  @OneToOne(() => Utilities, utilities => utilities.user)
  utilities: Utilities;

  /** 1-a-muchos con UserEvaluation (lado inverso no lleva @JoinColumn) */
  @OneToMany(() => UserEvaluation, evaluation => evaluation.user)
  evaluations: UserEvaluation[];

  /** 1-a-muchos con FeedBack */
  @OneToMany(() => FeedBack, feedback => feedback.user)
  feedbacks: FeedBack[];

  /*────────── Otros campos ──────────*/

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: true })
  pushToken: string;
}
