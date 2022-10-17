import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { Pet } from "./Pet";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @OneToMany(() => Pet, (pet) => pet.user)
    pets: Pet[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}