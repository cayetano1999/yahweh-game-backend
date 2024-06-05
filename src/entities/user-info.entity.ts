import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from './user.entity';

@Entity('UserInfo')
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable: false})
    deviceName: string;
  
    @Column({nullable: false})
    deviceId: string;

    @Column({nullable: false})
    creationDate: Date;

    @Column({nullable: false})
    signUpMethod: string;

    @Column({nullable: false})
    onboardingAccepted: boolean;

    // Relaciones
    @OneToOne(() => UserEntity, user => user.userInfo)
    @JoinColumn()
    user: UserEntity;
}
