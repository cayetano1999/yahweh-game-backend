import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('UserInfo')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  deviceName: string;

  @Column({ nullable: false })
  deviceId: string;

  @Column({ nullable: false })
  creationDate: Date;

  @Column({ nullable: false })
  signUpMethod: string;

  @Column({ nullable: false })
  onboardingAccepted: boolean;

  /*────────── Relaciones ──────────*/

  /** Lado inverso: NO lleva JoinColumn porque la FK vive en User */
  @OneToOne(() => UserEntity, user => user.userInfo)
  user: UserEntity;
}
