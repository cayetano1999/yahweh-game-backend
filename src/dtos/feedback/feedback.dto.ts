import { UserEntity } from "src/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class FeedBackDto {

    id: number;
    type: string;
    creationDate: Date;
    message: string;
    user: number | UserEntity;

}