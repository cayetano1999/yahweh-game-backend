import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Level } from "./level.entity";
import { UserEvaluation } from "./user-evaluation.entity";
import { UserInfo } from "./user-info.entity";
import { Utilities } from "./utilities.entity";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable: false})
    name: string;
  
    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    age: number;

    @Column({nullable: false})
    religion: boolean;

    @Column({nullable: false})
    biblicalKnowledge: string;

    @Column({nullable: false})
    questionType: string;

    @Column({nullable: false})
    profilePhoto: string;

    @Column({nullable: false})
    country: string;

    // Relaciones
    @OneToOne(() => UserInfo, userInfo => userInfo.user)
    @JoinColumn()
    userInfo: UserInfo;

    @ManyToOne(() => Level, level => level.users)
    @JoinColumn({ name: 'levelId' })
    levels: Level[]; // Cambiado a @OneToMany

    @OneToOne(() => Utilities, utilities => utilities.user)
    @JoinColumn()
    utilities: Utilities;

    @OneToMany(() => UserEvaluation, evaluation => evaluation.user)
    @JoinColumn()
    evaluations: UserEvaluation[];
}
