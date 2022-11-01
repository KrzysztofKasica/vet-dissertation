import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { Pet } from "./Pet";
import { Prescription } from "./Prescription";

enum Status {
    Pending = "PENDING",
    Completed = "COMPLETED",
    Cancelled = "CANCELLED"
}

@Entity()
export class Visit {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Pet, (pet) => pet.visits)
    pet: Pet;

    @ManyToOne(() => Doctor, (doctor) => doctor.visits)
    doctor: Doctor;

    @OneToMany(() => Prescription, (prescriptions) => prescriptions.visit)
    prescriptions: Prescription[];

    @Column()
    notes: string;

    @Column()
    status: Status;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}