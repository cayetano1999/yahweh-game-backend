import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Level } from "./level.entity";
import { Question } from "./question.entity";
import { UserEntity } from './user.entity';

@Entity('UserEvaluation')
export class UserEvaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    calification: number;

    @ManyToOne(() => UserEntity, (user) => user.evaluations)
    user: UserEntity;

    @ManyToOne(() => Level, (level) => level.evaluations)
    level: Level;

    @Column({nullable: false})
    evaluationDate: Date;


}