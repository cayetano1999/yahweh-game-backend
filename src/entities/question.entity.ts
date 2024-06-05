import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Level } from "./level.entity";
import { UserEntity } from './user.entity';

@Entity('Question')
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    options: string;

    @Column({ nullable: false })
    revealGemCost: number;

    @Column({ nullable: false })
    questionType: string;

    @Column({ nullable: false })
    time: number;

    @Column({ nullable: false })
    graceTime: number;

    @Column({ nullable: false })
    answer: number

    @Column({ nullable: false })
    correctMessage: string;

    @Column({ nullable: false })
    incorrectMessage: string;

    @Column({ nullable: false })
    hint: string;

    @ManyToOne(() => Level, (level) => level.questions)
    @JoinColumn()
    level: Level;


}