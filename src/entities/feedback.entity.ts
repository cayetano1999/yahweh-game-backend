import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('FeedBack')
export class FeedBack {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    creationDate: Date;

    @Column({ nullable: false })
    message: string;

    // Relaciones:
    @ManyToOne(() => UserEntity, user => user.feedbacks, { nullable: false })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

}