import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";


@Entity()
export class AvaliableDates {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    avaliableDate: Date

    @ManyToMany(() => Doctor)
    @JoinTable()
    doctors: Doctor[];

    @DeleteDateColumn()
    deletedAt: Date;
}