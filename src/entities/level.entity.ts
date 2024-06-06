import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { UserEvaluation } from "./user-evaluation.entity";
import { UserEntity } from './user.entity';

@Entity('Level')
export class Level {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable: false})
    code: number;

    @Column({nullable: false})
    levelName: string;

    @Column({nullable: false})
    levelDescription: string;

    @Column({nullable: false})
    levelTitle: string;

    @Column({nullable: false})
    timer: number; // Cantidad de timer disponible en el nivel

    @Column({nullable: false})
    bulb: number;

    @Column({nullable: false})
    blocker: number;

    @Column({nullable: false})
    ads: number;

    @Column({nullable: false})
    gems: number;

    @Column({nullable: false})
    valueTarget: number; // Cantidad de preguntas del nivel

    @Column({nullable: true})
    reward: number; // Cantidad de preguntas del nivel

      @Column({nullable: true})
    nextLevel: number; // Cantidad de preguntas del nivel

    // Relaciones:
    @OneToMany(() => UserEntity, userEntity => userEntity.levels)
    @JoinColumn()
    users: UserEntity[];

    @OneToMany(() => Question, questionEntity => questionEntity.level)
    @JoinColumn()
    questions: Question[];

    @OneToMany(() => UserEvaluation, evaluation => evaluation.level)
    @JoinColumn()
    evaluations: UserEvaluation[];
}
