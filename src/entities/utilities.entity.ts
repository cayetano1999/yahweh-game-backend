import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from './user.entity';

@Entity('Utilities')
export class Utilities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    currencies: number;

    @Column({ nullable: false })
    lives: number;

    @Column({ nullable: false })
    gems: number;

    @OneToOne(()=> UserEntity, {cascade: true})
    @JoinColumn()
    user: UserEntity

}