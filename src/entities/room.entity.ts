import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'jsonb' })
  allQuestions: string;

  @Column({ type: 'int' })
  questions: number;

  @Column({ type: 'jsonb' })
  questionTypes: string;

    @Column({ type: 'jsonb', nullable: true })
  roomMessages: string;

  @Column({ type: 'int' })
  currencies: number;

  @Column({ type: 'varchar' })
  levelType: string;

  @Column({ default: false })
  chat: boolean;

  @Column({ default: false })
  private: boolean;

  @Column({ type: 'int', default: 0 })
  mainUserCorrectAnswers: number;

  @Column({ type: 'int', default: 0 })
  mainUserIncorrectAnswers: number;

  @Column({ type: 'int', default: 0 })
  guestUserCorrectAnswers: number;

  @Column({ type: 'int', default: 0 })
  guestUserIncorrectAnswers: number;

  @Column({ type: 'varchar', default: 'active' })
  roomStatus: string; // ejemplos: 'active', 'completed', 'abandoned'

  @CreateDateColumn()
  creationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completeDate: Date;

  /*────── Relaciones con usuarios ──────*/

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'mainUserId' })
  mainUser: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'guestUserId' })
  guestUser: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'leavedUserId' })
  leavedUser: UserEntity;
}
