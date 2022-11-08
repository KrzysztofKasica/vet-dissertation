import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client";
import { Doctor } from "./Doctor";
import { Pet } from "./Pet";
import { Prescription } from "./Prescription";

export enum Status {
    ToBeAccepted = "TO BE ACCEPTED",
    Pending = "PENDING",
    Completed = "COMPLETED",
    Cancelled = "CANCELLED"
}

@Entity()
export class Visit {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Pet, (pet) => pet.visits)
    pet!: Pet;

    @ManyToOne(() => Client, (client) => client.visits)
    client!: Client;

    @ManyToOne(() => Doctor, (doctor) => doctor.visits)
    doctor!: Doctor;

    @OneToMany(() => Prescription, (prescriptions) => prescriptions.visit)
    prescriptions: Prescription[];

    @Column()
    notes: string;

    @Column()
    status!: Status;

    @Column()
    startDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}